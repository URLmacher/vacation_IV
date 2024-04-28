import { EAsset, EKey } from '@/enums';
import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { Projectile } from './Projectile';
import { Sizeable } from './Sizeable';
import { MAX_HEIGHT } from '@/constants';

export class Player extends Sizeable implements IDrawable {
  public speedY: number = 0;
  public maxSpeed: number = 8;
  public projectiles: Projectile[] = [];
  public lastTurretShot: 'left' | 'right' = 'right';

  constructor(protected game: Game) {
    super(game);
    this.image = document.getElementById(EAsset.PLAYER);
    this.updateSize(EAsset.PLAYER);

    const scale = this.game.height / MAX_HEIGHT;
    this.x = 5;
    this.y = (this.game.height - this.height) / 2;
    this.maxSpeed = this.maxSpeed * scale;
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
    this.drawImage(context);
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
}
