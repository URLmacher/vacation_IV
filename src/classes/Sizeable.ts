import { IMAGES, MAX_HEIGHT, MAX_WIDTH } from '@/constants';
import type { Game } from './Game';

export class Sizeable {
  public image: HTMLElement | null = null;
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public originalWidth: number = 0;
  public originalHeight: number = 0;

  constructor(protected game: Game) {}

  protected drawImage(
    context: CanvasRenderingContext2D,
    overrides?: { x: number; y: number }
  ): void {
    context.drawImage(
      this.image as CanvasImageSource,
      overrides?.x ?? 0,
      overrides?.y ?? 0,
      this.originalWidth,
      this.originalHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  protected updateSize(imageKey: string): void {
    const asset = IMAGES.find((i) => i.key === imageKey);
    const scaleX = this.game.width / MAX_WIDTH;
    const scaleY = this.game.height / MAX_HEIGHT;
    this.originalWidth = asset?.width ?? 0;
    this.originalHeight = asset?.height ?? 0;
    this.width = this.originalWidth * scaleX;
    this.height = this.originalHeight * scaleY;
  }
}
