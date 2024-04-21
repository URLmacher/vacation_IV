import { DATES, FONT_FAMILY, TEXTS } from '@/constants';
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
    const datesToConfirm = DATES.length - this.game.dateTargetsConfirmed.length;
    context.fillText(`${TEXTS.toConfirm} ${datesToConfirm}`, 20, 40);

    // ammo
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
    context.restore();
  }
}
