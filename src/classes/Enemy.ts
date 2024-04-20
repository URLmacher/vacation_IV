import { EEnemyType } from '@/enums';
import type { Game } from './Game';
import type { IDrawable } from '@/interfaces';
import { formatDate, formatMonth } from '@/utils';
import { FONT_FAMILY } from '@/constants';

export class Enemy implements IDrawable {
  public x: number;
  public y: number = 0;
  public width: number = 10;
  public height: number = 3;

  public date: string;

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
    date: string,
    x?: number,
    y?: number
  ) {
    this.date = date;
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
    this.drawDate(context);
  }

  protected drawDate(context: CanvasRenderingContext2D): void {
    // month
    const monthShort = formatMonth(this.date).substring(0, 3);
    context.fillStyle = '#9b5de5';
    const textFontSize = Math.ceil(this.height / 4);
    context.font = `${textFontSize}px ${FONT_FAMILY}`;
    const monthShortWidth = context.measureText(monthShort).width;
    const monthShortX = Math.round(
      this.x + (this.width / 2.2 - monthShortWidth / 2)
    );
    const monthShortY = this.y + this.height / 2.8 + textFontSize;
    context.fillText(monthShort, monthShortX, monthShortY, this.width);
    // day
    context.fillStyle = '#00bbf9';
    const dateText = formatDate(this.date);
    const dateTextWidth = context.measureText(dateText).width;
    const dateTextX = Math.round(
      this.x + (this.width / 2.2 - dateTextWidth / 2)
    );
    const dateTextY = this.y + this.height / 2.7;
    context.fillText(dateText, dateTextX, dateTextY, this.width);
  }
}

export class EnemyOne extends Enemy {
  public width: number = 228;
  public height: number = 169;

  public frameY = Math.floor(Math.random() * 3);
  public lives: number = 5;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.ONE;

  constructor(game: Game, date: string) {
    super(game, date);
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById(this.type);
  }
}

export class EnemyTwo extends Enemy {
  public width: number = 213;
  public height: number = 165;

  public frameY = Math.floor(Math.random() * 2);
  public lives: number = 6;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.TWO;

  constructor(game: Game, date: string) {
    super(game, date);
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

  constructor(game: Game, date: string) {
    super(game, date);
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

  constructor(game: Game, date: string) {
    super(game, date);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById(this.type);
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}
