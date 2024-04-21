import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { IMAGES } from '@/constants';
import { EAsset } from '@/enums';

export class Layer implements IDrawable {
  public width: number = 0;
  public height: number = 0;
  public x: number = 0;
  public y: number = 0;
  public type: EAsset = EAsset.LAYER1;

  constructor(
    private game: Game,
    private image: HTMLImageElement,
    private speedModifier: number,
    type: EAsset
  ) {
    this.type = type;
    this.updateSize();
  }

  public update(): void {
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x -= this.game.speed * this.speedModifier;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width - 1, this.y);
  }

  protected updateSize(): void {
    const asset = IMAGES.find((i) => i.key === this.type);
    this.width = asset?.width ?? 0;
    this.height = asset?.height ?? 0;
  }
}
