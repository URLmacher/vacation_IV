import type { Game } from './Game';

export class Explosion {
  private spriteWidth: number = 200
  private spriteHeight: number = 200
  private width: number
  private height: number
  private x: number
  private y: number

  private fps: number = 30
  private timer: number = 0
  private interval: number
  public markedForDeletion: boolean = false

  private frameX: number = 0
  private maxFrame : number = 8
  private image: HTMLImageElement = new Image()

  constructor(private game: Game, x: number, y: number) {
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.interval = 1000 / this.fps;
  }

  public update(deltaTime: number): void {
    this.x -= this.game.speed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
