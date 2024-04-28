import { EAsset } from '@/enums';
import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { Sizeable } from './Sizeable';
import { MAX_WIDTH } from '@/constants';

export class Projectile extends Sizeable implements IDrawable {
  public markedForDeletion = false;
  public speed = 4;

  constructor(
    protected game: Game,
    x: number,
    y: number
  ) {
    super(game);
    this.x = x;
    this.y = y;
    this.image = document.getElementById(EAsset.PROJECTILE);
    this.updateSize(EAsset.PROJECTILE);
    const scale = this.game.width / MAX_WIDTH;
    this.speed = this.speed * scale;
  }

  public update(): void {
    this.x += this.speed;
    if (this.x + this.width > this.game.width) {
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.drawImage(context);
  }
}
