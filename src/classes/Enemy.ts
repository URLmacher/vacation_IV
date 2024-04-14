import { EEnemyType } from '@/enums';
import type { Game } from './Game';
import type { IDrawable } from '@/interfaces';

export class Enemy implements IDrawable {
  public x: number;
  public y: number = 0;
  public width: number = 10;
  public height: number = 3;

  public frameX: number = 0;
  public frameY: number = 0;
  public image: HTMLElement | null = null;
  public lives: number = 3;
  public markedForDeletion: boolean = false;
  public maxFrame: number = 37;
  public score: number = 0;
  public speedX: number = Math.random() * -1.5 - 0.5;
  public type: EEnemyType = EEnemyType.BASE;

  constructor(
    protected game: Game,
    x?: number,
    y?: number
  ) {
    this.y = y != null ? y : this.y;
    this.x = x != null ? x : this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
  }

  public update(): void {
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }

    // sprite animation
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.game.debug) {
      context.font = '20px Helvetica';
      context.fillText(this.lives.toString(), this.x, this.y);
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(
      this.image as CanvasImageSource,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class EnemyOne extends Enemy {
  public width: number = 228;
  public height: number = 169;

  public frameY = Math.floor(Math.random() * 3);
  public lives: number = 5;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.ONE;

  constructor(game: Game) {
    super(game);
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById(this.type);
  }
}

export class EnemyTwo extends Enemy {
  public width: number = 213;
  public height: number = 165;

  public frameY =Math.floor(Math.random() * 2)
  public lives: number = 6;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.TWO;

  constructor(game: Game) {
    super(game);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById(this.type);
  }
}

export class PowerUpEnemy extends Enemy {
  public width: number = 99;
  public height: number = 95;

  public frameY = Math.floor(Math.random() * 2);
  public lives: number = 5;
  public score: number = 15;
  public type: EEnemyType = EEnemyType.POWER_UP;

  constructor(game: Game) {
    super(game);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById(this.type);
  }
}

export class HiveEnemy extends Enemy {
  public width: number = 400;
  public height: number = 227;

  public frameY = 0;
  public lives: number = 20;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.HIVE;

  constructor(game: Game) {
    super(game);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById(this.type);
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}

export class DroneEnemy extends Enemy {
  public width: number = 115;
  public height: number = 95;

  public frameY = Math.floor(Math.random() * 2);
  public lives: number = 3;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.DRONE;

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.x = x;
    this.y = y;
    this.image = document.getElementById(this.type);
    this.speedX = Math.random() * -4.2 - 0.5;
  }
}
