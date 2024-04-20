import { DATES } from '@/constants';
import { EEnemyType, type EKey } from '@/enums';
import type { IDrawable } from '@/interfaces';
import { Background } from './Background';
import {
  EnemyOne,
  EnemyTwo,
  HiveEnemy,
  PowerUpEnemy,
  type Enemy
} from './Enemy';
import { FireExplosion, SmokeExplosion, type Explosion } from './Explosion';
import { InputHandler } from './InputHandler';
import { Particle } from './Particle';
import { Player } from './Player';
import { UI } from './UI';
import type { Projectile } from './Projectile';

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
  public dateTargetsToConfirm: string[] = DATES;
  public targetsLeft: number = DATES.length
  public debug: boolean = false;
  public speed: number = 1;

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

    this.enemies.forEach((enemy) => this.handleEnemyAnimation(enemy));
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval) {
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
    this.particles.forEach((particle) => particle.draw(context));
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });
    this.background.layer4.draw(context);
  }

  private addEnemy() {
    const randomize = Math.random();
    const dateTargetToConfirm = this.dateTargetsToConfirm.pop()
    if(dateTargetToConfirm == null) return;
    if (randomize < 0.3) this.enemies.push(new EnemyOne(this, dateTargetToConfirm));
    else if (randomize < 0.6) this.enemies.push(new EnemyTwo(this, dateTargetToConfirm));
    else if (randomize < 0.7) this.enemies.push(new HiveEnemy(this, dateTargetToConfirm));
    else this.enemies.push(new PowerUpEnemy(this, dateTargetToConfirm));
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

  private handleEnemyAnimation = (enemy: Enemy): void => {
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
      if (enemy.type == EEnemyType.POWER_UP) {
        this.player.enterPowerUp();
      }
    }
    this.player.projectiles.forEach((projectile) =>
      this.handleProjectileAnimation(enemy, projectile)
    );
  };

  private handleProjectileAnimation = (
    enemy: Enemy,
    projectile: Projectile
  ): void => {
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
        this.targetsLeft--;

        this.addExplosion(enemy);
      }
    }
  };
}
