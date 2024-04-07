import { EKey } from '@/enums';
import type { Game } from './Game';
import { Projectile } from './Projectile';
import type { IDrawable } from '@/interfaces';

const MAX_SPEED = 2;

export class Player implements IDrawable {
  public x: number = 20;
  public y: number = 100;
  public width: number = 120;
  public height: number = 190;

  public frameX: number = 0;
  public frameY: number = 0;
  public maxFrame: number = 37;
  public speedY: number = 0;
  public maxSpeed: number = 3;
  public projectiles: Projectile[] = [];
  public powerUp = false;
  public powerUpTimer = 0;
  public powerUpLimit = 10000;
  public image: HTMLElement | null = null;

  constructor(private game: Game) {
    this.image = document.getElementById('player');
  }

  public update(deltaTime: number): void {
    if (this.game.keys.includes(EKey.ARROW_UP)) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes(EKey.ARROW_DOWN)) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
      this.y += this.speedY;
    }

    // vertical boundaries
    if (this.y > this.game.height - this.height * 0.5) {
      this.y = this.game.height - this.height * 0.5;
    } else if (this.y < -this.height * 0.5) {
      this.y = -this.height * 0.5;
    }

    // sprite animation
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    // power up
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.game.ammo += 0.1;
      }
    }

    // handle projectiles
    this.projectiles.forEach((p) => p.update());
    this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion);
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (!this.image) return;
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
    context.drawImage(
      this.image as CanvasImageSource,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  public shootTop(): void {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30)
      );
      this.game.ammo--;
    }
    if (this.powerUp) this.shootBottom();
  }

  public shootBottom(): void {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 175)
      );
    }
  }

  public enterPowerUp(): void {
    this.powerUpTimer = 0;
    this.powerUp = true;
    if (this.game.ammo < this.game.maxAmmo) {
      this.game.ammo = this.game.maxAmmo;
    }
  }
}
