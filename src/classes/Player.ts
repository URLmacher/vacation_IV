import { EKey } from '@/enums';
import type { Game } from './Game';
import { Projectile } from './Projectile';

const MAX_SPEED = 2;

export class Player {
  private width = 120;
  private height = 90;
  private x = 20;
  private y = 100;
  private speedY = 0;
  private projectiles: Projectile[] = [];

  constructor(private game: Game) {}

  public update(deltaTime: number): void {
    if (this.game.keys.includes(EKey.ArrowUp)) {
      this.speedY = -MAX_SPEED;
    } else if (this.game.keys.includes(EKey.ArrowDown)) {
      this.speedY = +MAX_SPEED;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;

    this.projectiles.forEach((p) => p.update());
    this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion);
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, this.width, this.height);

    this.projectiles.forEach((p) => {
      p.draw(context);
    });
  }

  public shootTop(): void {
    if (this.game.ammo) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30)
      );
      this.game.ammo--;
    }
  }

  public enterPowerUp(): void {}
}
