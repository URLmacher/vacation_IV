import { FONT_FAMILY } from '@/constants';
import type { Game } from './Game';

export class UI {
  private fontSize: number = 25;
  private color: string = 'white';

  constructor(private game: Game) {}

  public update(): void {}

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.font = `${this.fontSize}px ${FONT_FAMILY}`;
    // score
    context.fillText('Score: ' + this.game.targetsLeft, 20, 40);
    // game over messages
    if (this.game.targetsLeft === 0) {
      context.textAlign = 'center';
      const message1 = 'Most Wondrous!';
      const message2 = 'Well done explorer!';
      context.font = `${this.fontSize}px ${FONT_FAMILY}`;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = `${this.fontSize}px ${FONT_FAMILY}`;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
    }
    // ammo
    if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
    context.restore();
  }
}
