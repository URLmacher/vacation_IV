import type { Game } from './Game';

export class Enemy {
  public score: number = 0;
  public lives: number = 3;
  public markedForDeletion: boolean = false;
  public width: number = 10;
  public height: number = 3;
  private speedX: number = 3;
  public x: number;
  public y: number = 0;

  constructor(
    protected game: Game,
    x: number,
    y: number
  ) {
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
  }

  public update(): void {
    this.x += this.speedX;
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class EnemyOne extends Enemy {
  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.5 - this.height);
  }
}
