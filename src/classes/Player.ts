import { EAsset, EKey } from '@/enums';
import type { Game } from './Game';
import { Projectile } from './Projectile';
import type { IDrawable } from '@/interfaces';
import { IMAGES } from '@/constants';

export class Player implements IDrawable {
  public x: number = 20;
  public y: number = 100;
  public width: number = 0;
  public height: number = 0;

  public speedY: number = 0;
  public maxSpeed: number = 6;
  public projectiles: Projectile[] = [];
  public lastTurretShot: 'left' | 'right' = 'right';
  public image: HTMLElement | null = null;

  constructor(private game: Game) {
    this.image = document.getElementById(EAsset.PLAYER);
    this.updateSize();
  }

  public update(): void {
    if (this.game.keys.includes(EKey.ARROW_UP)) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes(EKey.ARROW_DOWN)) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;

    // vertical boundaries
    if (this.y > this.game.height - this.height * 0.75) {
      this.y = this.game.height - this.height * 0.75;
    } else if (this.y < -this.height * 0.15) {
      this.y = -this.height * 0.15;
    }

    // handle projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

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
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  public shootTop(): void {
    const turretX = this.x + this.width * 0.7;
    const leftTurretY = this.y + this.height * 0.15;
    const rightTurretY = this.y + this.height * 0.75;

    if (this.game.ammo > 0) {
      const projectile =
        this.lastTurretShot === 'right'
          ? new Projectile(this.game, turretX, leftTurretY)
          : new Projectile(this.game, turretX, rightTurretY);
      this.projectiles.push(projectile);
      this.game.ammo--;
      this.lastTurretShot = this.lastTurretShot === 'right' ? 'left' : 'right';
    }
  }

  protected updateSize(): void {
    const asset = IMAGES.find((i) => i.key === EAsset.PLAYER);
    this.width = asset?.width ?? 0;
    this.height = asset?.height ?? 0;
  }
}
