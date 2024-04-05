import type { Game } from './Game';

export class Particle {
  public markedForDeletion = false;

  constructor(
    private game: Game,
    x: number,
    y: number
  ) {}

  public update(): void {}

  public draw(context: CanvasRenderingContext2D): void {}
}
