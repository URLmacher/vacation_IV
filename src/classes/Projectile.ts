import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';

export class Projectile implements IDrawable {
  public x: number;
  public y: number;
  public height: number = 3;
  public width: number = 10;

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
    this.image = document.getElementById('projectile');
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
