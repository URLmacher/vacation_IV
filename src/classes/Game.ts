import type { EKey } from '@/enums';
import { InputHandler } from './InputHandler';
import { Player } from './Player';
import { UI } from './UI';
import { EnemyOne, type Enemy } from './Enemy';
import { Background } from './Background';
import { Particle } from './Particle';
import type { Explosion } from './Explosion';

export class Game {
  public keys: EKey[] = [];
  public height: number;
  public width: number;
  public speed = 1;

  public ammo = 20;
  private maxAmmo = 20;
  private ammoTimer = 0;
  private ammoInterval = 500;
  private maxInterval = 50;

  private gameOver = false;
  private score = 0;
  private gameTime = 0;
  private timeLimit = 0;

  public player: Player;
  private background: Background;
  private inputHandler: InputHandler;
  private ui: UI;
  private enemies: Enemy[] = [];
  private particles: Particle[] = [];
  private explosions: Explosion[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.ui = new UI(this);
    this.background = new Background(this);
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
        if (enemy.type == 'lucky') this.player.enterPowerUp();
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
            if (enemy.type === 'hive') {
              for (let i = 0; i < 5; i++) {
                this.enemies.push(
                  new EnemyOne(
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
    this.player.draw(context);
    this.ui.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
  }

  private addEnemy() {
    const randomize = Math.random();
    if (randomize < 0.3) this.enemies.push(new EnemyOne(this));
    else if (randomize < 0.6) this.enemies.push(new EnemyOne(this));
    else if (randomize < 0.7) this.enemies.push(new EnemyOne(this));
    else this.enemies.push(new EnemyOne(this));
  }

  private checkCollision(player: Player, enemy: Enemy): boolean {
    return true;
  }

  private addExplosion(enemy: Enemy): void {
  }
}
