import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { IMAGES } from '@/constants';
import { EAsset } from '@/enums';

export class Projectile implements IDrawable {
  public x: number;
  public y: number;
  public height: number = 0;
  public width: number = 0;

  public markedForDeletion = false;
  public speed = 3;
  public image: HTMLElement | null = null;

  constructor(
    private game: Game,
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
    this.image = document.getElementById(EAsset.PROJECTILE);
    this.updateSize();
  }

  public update(): void {
    this.x += this.speed;
    if (this.x + this.width > this.game.width) {
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
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

  protected updateSize(): void {
    const asset = IMAGES.find((i) => i.key === EAsset.PROJECTILE);
    this.width = asset?.width ?? 0;
    this.height = asset?.height ?? 0;
  }
}
