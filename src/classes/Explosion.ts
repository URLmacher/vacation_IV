import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { EExplosionType } from '@/enums';
import { Sizeable } from './Sizeable';

export class Explosion extends Sizeable implements IDrawable {
  public fps: number = 30;
  public frameX: number = 0;
  public interval: number;
  public markedForDeletion: boolean = false;
  public maxFrame: number = 8;
  public timer: number = 0;
  public type: EExplosionType = EExplosionType.BASE;

  constructor(
    protected game: Game,
    x: number,
    y: number
  ) {
    super(game);
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
    this.drawImage(context, { x: this.frameX * this.originalWidth, y: 0 });
  }
}

export class SmokeExplosion extends Explosion {
  public type: EExplosionType = EExplosionType.SMOKE;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }
}

export class FireExplosion extends Explosion {
  public type: EExplosionType = EExplosionType.FIRE;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }
}
