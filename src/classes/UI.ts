import type { Game } from './Game';

// TODO: UI
export class UI {
  private fontSize = 25;
  private fontFamily = 'Helvetica';
  private color = 'white';

  constructor(private game: Game) {}

  public update(): void {}

  public draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
  }
}
