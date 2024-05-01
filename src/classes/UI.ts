import { DATES, FONT_FAMILY, MAX_WIDTH, TEXTS, COLOR } from '@/constants';
import type { Game } from './Game';

export class UI {
  private fontSize: number = 25;
  private color: string = COLOR;

  constructor(private game: Game) {
    const scale = this.game.width / MAX_WIDTH;
    this.fontSize = this.fontSize * scale;
  }

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
    const textX = this.game.width / 30
    const textY = this.game.height / 19;
    context.fillText(`${TEXTS.toConfirm} ${datesToConfirm}`, textX, textY);

    // ammo
    for (let i = 0; i < this.game.ammo; i++) {
      const offsetX = this.game.width / 30 + this.game.width * 0.005 * i;
      const offsetY = this.game.height / 15;
      const height = this.game.height / 35;
      const width = this.game.width * 0.002;
      context.fillRect(offsetX, offsetY, width, height);
    }
    context.restore();
  }
}
