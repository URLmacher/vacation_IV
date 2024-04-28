import { EAsset } from '@/enums';
import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { Sizeable } from './Sizeable';

export class Layer extends Sizeable implements IDrawable {
  public width: number = 0;
  public height: number = 0;
  public x: number = 0;
  public y: number = 0;
  public type: EAsset = EAsset.LAYER1;

  constructor(
    protected game: Game,
    public image: HTMLImageElement,
    private speedModifier: number,
    type: EAsset
  ) {
    super(game);
    this.type = type;
    this.updateSize(this.type);
  }

  public update(): void {
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x -= this.game.speed * this.speedModifier;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    context.drawImage(
      this.image,
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x + this.width - 1,
      this.y,
      this.width,
      this.height
    );
  }
}
