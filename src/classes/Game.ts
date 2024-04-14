import { EEnemyType, type EKey } from '@/enums';
import { InputHandler } from './InputHandler';
import { Player } from './Player';
import { UI } from './UI';
import {
  EnemyOne,
  type Enemy,
  PowerUpEnemy,
  EnemyTwo,
  HiveEnemy,
  DroneEnemy
} from './Enemy';
import { Background } from './Background';
import { Particle } from './Particle';
import { SmokeExplosion, type Explosion, FireExplosion } from './Explosion';
import type { IDrawable } from '@/interfaces';

export class Game {
  public height: number;
  public width: number;

  public ammo: number = 20;
  public ammoInterval: number = 350;
  public ammoTimer: number = 0;
  public maxAmmo: number = 50;
  public maxInterval: number = 50;

  public enemyTimer: number = 0;
  public enemyInterval: number = 2000;

  public debug: boolean = false;
  public gameOver: boolean = false;
  public gameTime: number = 0;
  public score: number = 0;
  public speed: number = 1;
  public timeLimit: number = 30000;
  public winningScore: number = 100;

  public background: Background;
  public enemies: Enemy[] = [];
  public explosions: Explosion[] = [];
  public inputHandler: InputHandler;
  public keys: EKey[] = [];
  public particles: Particle[] = [];
  public player: Player;
  public ui: UI;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.background = new Background(this);
    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.ui = new UI(this);
  }

  public update(deltaTime: number): void {
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;

    this.background.update();
    this.background.layer4.update();
    this.player.update(deltaTime);

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );

    this.explosions.forEach((explosion) => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion
    );

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;

        this.addExplosion(enemy);
        for (let i = 0; i < enemy.score; i++) {
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
        }
        if (enemy.type == EEnemyType.POWER_UP) this.player.enterPowerUp();
        else if (!this.gameOver) this.score--;
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
          if (enemy.lives <= 0) {
            for (let i = 0; i < enemy.score; i++) {
              this.particles.push(
                new Particle(
                  this,
                  enemy.x + enemy.width * 0.5,
                  enemy.y + enemy.height * 0.5
                )
              );
            }
            enemy.markedForDeletion = true;
            this.addExplosion(enemy);
            if (enemy.type === EEnemyType.DRONE) {
              for (let i = 0; i < 5; i++) {
                this.enemies.push(
                  new DroneEnemy(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5
                  )
                );
              }
            }
            if (!this.gameOver) this.score += enemy.score;
            // if (this.score > this.winningScore) this.gameOver = true;
          }
        }
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.background.draw(context);
    this.ui.draw(context);
    this.player.draw(context);
    this.particles.forEach(particle => particle.draw(context));
    this.enemies.forEach(enemy => {
      enemy.draw(context);
    });
    this.explosions.forEach(explosion => {
      explosion.draw(context);
    });
    this.background.layer4.draw(context);
  }

  private addEnemy() {
    const randomize = Math.random();
    if (randomize < 0.3) this.enemies.push(new EnemyOne(this));
    else if (randomize < 0.6) this.enemies.push(new EnemyTwo(this));
    else if (randomize < 0.7) this.enemies.push(new HiveEnemy(this));
    else this.enemies.push(new PowerUpEnemy(this));
  }

  private checkCollision(drawable1: IDrawable, drawable2: IDrawable): boolean {
    return (
      drawable1.x < drawable2.x + drawable2.width &&
      drawable1.x + drawable1.width > drawable2.x &&
      drawable1.y < drawable2.y + drawable2.height &&
      drawable1.height + drawable1.y > drawable2.y
    );
  }

  private addExplosion(enemy: Enemy): void {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    } else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
  }
}
