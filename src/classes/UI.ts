import type { Game } from './Game';

export class UI {
  private fontSize: number = 25;
  private fontFamily: string = 'Bangers';
  private color: string = 'white';

  constructor(private game: Game) {}

  public update(): void {}

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.font = this.fontSize + 'px' + this.fontFamily;
    // score
    context.font = '20px Bangers';
    context.fillText('Score: ' + this.game.score, 20, 40);
    // timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText('Timer: ' + formattedTime, 20, 100);
    // game over messages
    if (this.game.gameOver) {
      context.textAlign = 'center';
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        message1 = 'Most Wondrous!';
        message2 = 'Well done explorer!';
      } else {
        message1 = 'Blazes!';
        message2 = 'Get my repair kit and try again!';
      }
      context.font = '70px ' + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = '25px ' + this.fontFamily;
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
