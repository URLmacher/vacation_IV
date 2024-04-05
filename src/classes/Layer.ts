import type { Game } from './Game';

export class Layer {
  constructor(private game: Game) {}

  public update(): void {}

  public draw(context: CanvasRenderingContext2D): void {}
}
