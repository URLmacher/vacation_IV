import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';

export class Particle implements IDrawable {
  public x: number;
  public y: number;
  public height: number = 3;
  public width: number = 10;

  public image: HTMLElement | null = null;
  public markedForDeletion: boolean = false;
  public frameX: number = Math.floor(Math.random() * 3);
  public frameY: number = Math.floor(Math.random() * 3);
  public spriteSize: number = 50;
  public sizeModifier: string = (Math.random() * 0.5 + 0.5).toFixed(1);
  public size: number = this.spriteSize * parseInt(this.sizeModifier);
  public speedX: number = Math.random() * 6 - 3;
  public speedY: number = Math.random() * -15;
  public gravity: number = 0.5;
  public angle: number = 0;
  public va: number = Math.random() * 0.2 - 0.1;
  public bounced: number = 0;
  public bottomBounceBoundary: number = Math.random() * 80 + 60;

  constructor(
    private game: Game,
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
    this.image = document.getElementById('gears');
  }

  public update(): void {
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.markedForDeletion = true;
    if (
      this.y > this.game.height - this.bottomBounceBoundary &&
      this.bounced < 2
    ) {
      this.bounced++;
      this.speedY *= -0.7;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if(!this.image) return
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image as CanvasImageSource,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.size * -0.5,
      this.size * -0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
