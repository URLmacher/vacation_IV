import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';

export class Layer implements IDrawable {
  public width: number = 1768;
  public height: number = 500;
  public x: number = 0;
  public y: number = 0;

  constructor(
    private game: Game,
    private image: HTMLImageElement,
    private speedModifier: number
  ) {}

  public update(): void {
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x -= this.game.speed * this.speedModifier;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}
