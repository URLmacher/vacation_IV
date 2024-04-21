import { DATES } from '@/constants';
import { type EKey } from '@/enums';
import type { IDrawable } from '@/interfaces';
import { Background } from './Background';
import {
  EnemyOne,
  EnemyTwo,
  HiveEnemy,
  PowerUpEnemy,
  type Enemy,
  EnemyThree
} from './Enemy';
import { FireExplosion, SmokeExplosion, type Explosion } from './Explosion';
import { InputHandler } from './InputHandler';
import { Player } from './Player';
import type { Projectile } from './Projectile';
import { UI } from './UI';

export const GAME_OVER = 'game-over';

export class Game {
  public height: number;
  public width: number;

  public ammo: number = 20;
  public ammoInterval: number = 250;
  public ammoTimer: number = 0;
  public maxAmmo: number = 50;
  public maxInterval: number = 50;

  public enemyTimer: number = 0;
  public enemyInterval: number = 2000;
  public dateTargetsToConfirm: string[] = [...DATES];
  public dateTargetsConfirmed: string[] = [];
  public debug: boolean = false;
  public speed: number = 1;
  public started: boolean = false;

  public background: Background;
  public enemies: Enemy[] = [];
  public explosions: Explosion[] = [];
  public inputHandler: InputHandler;
  public keys: EKey[] = [];
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
    this.player.update();
    if (!this.started) return;

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

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
    if (!this.started) return;

    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });
    this.background.layer4.draw(context);
  }

  public start(): void {
    this.dateTargetsToConfirm = [...DATES];
    this.dateTargetsConfirmed = [];
    this.started = true;
  }

  private handleKill(enemy: Enemy): void {
    if (!this.dateTargetsConfirmed.includes(enemy.date)) {
      this.dateTargetsConfirmed.push(enemy.date);
    }

    if (this.dateTargetsConfirmed.length === DATES.length) {
      const event = new Event(GAME_OVER);
      window.dispatchEvent(event);
      this.started = false;
    }
  }

  private addEnemy() {
    const randomize = Math.random();
    const dateTargetToConfirm = this.dateTargetsToConfirm.pop();
    if (dateTargetToConfirm == null) return;

    if (randomize < 0.3)
      this.enemies.push(new EnemyOne(this, dateTargetToConfirm));
    else if (randomize < 0.4)
      this.enemies.push(new EnemyTwo(this, dateTargetToConfirm));
    else if (randomize < 0.6)
      this.enemies.push(new EnemyThree(this, dateTargetToConfirm));
    else if (randomize < 0.7)
      this.enemies.push(new HiveEnemy(this, dateTargetToConfirm));
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

  private handleEnemyAnimation = (enemy: Enemy): void => {
    enemy.update();
    if (this.checkCollision(this.player, enemy)) {
      this.handlePlayerHitByEnemy(enemy);
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
      enemy.flash()

      if (enemy.lives <= 0) {
        // handle kill
        this.handleKill(enemy);
        enemy.markedForDeletion = true;
        this.addExplosion(enemy);
      }
    }
  };

  private handlePlayerHitByEnemy(enemy: Enemy): void {
    enemy.markedForDeletion = true;
    this.addExplosion(enemy);
    this.handleKill(enemy);
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
