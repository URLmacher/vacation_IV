import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { EExplosionType } from '@/enums';

export class Explosion implements IDrawable {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  public fps: number = 30;
  public frameX: number = 0;
  public image: HTMLElement | null = null;
  public interval: number;
  public markedForDeletion: boolean = false;
  public maxFrame: number = 8;
  public spriteHeight: number = 200;
  public spriteWidth: number = 200;
  public timer: number = 0;
  public type: EExplosionType = EExplosionType.BASE;

  constructor(
    private game: Game,
    x: number,
    y: number
  ) {
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
    if (!this.image) return;
    context.drawImage(
      this.image as CanvasImageSource,
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

export class SmokeExplosion extends Explosion {
  public type: EExplosionType = EExplosionType.BASE;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById(this.type);
  }
}

export class FireExplosion extends Explosion {
  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById(this.type);
  }
}
