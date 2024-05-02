import type { IDrawable } from '@/interfaces';
import type { Game } from './Game';
import { EAsset, EExplosionType } from '@/enums';
import { Sizeable } from './Sizeable';

export class Explosion extends Sizeable implements IDrawable {
  public fps: number = 30;
  public frameX: number = 0;
  public interval: number;
  public markedForDeletion: boolean = false;
  public maxFrame: number = 16;
  public timer: number = 0;
  public type: EExplosionType = EExplosionType.BASE;
  public audio = document.getElementById(EAsset.FX_EXPLOSION) as HTMLAudioElement;

  constructor(
    protected game: Game,
    x: number,
    y: number
  ) {
    super(game);
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.interval = 1000 / this.fps;

    // To handle overlapping explosions, reset audio first
    this.audio.pause();
    this.audio.currentTime = 0;
    void this.audio.play();
  }

  public update(deltaTime: number): void {
    this.x -= this.game.speed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.frameX > this.maxFrame) {
      this.frameX = 0;
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    const frameWidth = this.originalWidth;
    const frameHeight = this.originalHeight;
    const frameX = (this.frameX % 4) * frameWidth;
    const frameY = Math.floor(this.frameX / 4) * frameHeight;

    this.drawImage(context, {
      x: frameX,
      y: frameY,
      width: this.width * 2,
      height: this.height * 2
    });
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
