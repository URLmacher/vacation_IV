import type { Game } from './Game';

export class Projectile {
  public markedForDeletion = false;
  private width = 10;
  private height = 3;
  private speed = 3;
  private x;
  private y;

  constructor(
    private game: Game,
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
  }

  public update(): void {
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
