import { EEnemyType } from '@/enums';
import type { Game } from './Game';
import type { IDrawable } from '@/interfaces';
import { formatDate, formatMonth } from '@/utils';
import { FONT_FAMILY, IMAGES } from '@/constants';

export class Enemy implements IDrawable {
  public x: number;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  public date: string;

  public image: HTMLElement | null = null;
  public lives: number = 3;
  public isFlashing: boolean = false;
  public markedForDeletion: boolean = false;
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
      this.game.dateTargetsToConfirm.push(this.date);
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.game.debug) {
      context.font = `20px ${FONT_FAMILY}`;
      context.fillText(this.lives.toString(), this.x, this.y);
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    if (this.isFlashing) {
      context.globalAlpha = 0.7;
    }

    context.drawImage(
      this.image as CanvasImageSource,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.drawDate(context);
    context.globalAlpha = 1.0;
  }

  public flash(): void {
    this.isFlashing = true;
    setTimeout(() => {
      this.isFlashing = false;
    }, 100);
  }

  protected drawDate(context: CanvasRenderingContext2D): void {
    const monthShort = formatMonth(this.date).substring(0, 3);
    const dateText = formatDate(this.date);
    const text = `${monthShort} ${dateText}`;

    context.fillStyle = '#e3c44a';
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    const textFontSize = Math.ceil(this.height / 4);
    context.font = `${textFontSize}px ${FONT_FAMILY}`;

    const textWidth = context.measureText(text).width;
    const textX = Math.round(
      this.x + (this.width / 2.2 - textWidth / 2)
    );
    const textY = this.y + this.height * 0.44 + textFontSize / 2;
    context.fillText(text, textX, textY, this.width);
  }

  protected updateSize(): void {
    const asset = IMAGES.find((i) => i.key === this.type);
    this.width = asset?.width ?? 0;
    this.height = asset?.height ?? 0;
  }
}

export class EnemyOne extends Enemy {
  public width: number = 0;
  public height: number = 0;

  public lives: number = 5;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.ONE;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize();
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
}

export class EnemyTwo extends Enemy {
  public width: number = 0;
  public height: number = 0;

  public lives: number = 6;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.TWO;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize();
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}

export class EnemyThree extends Enemy {
  public width: number = 0;
  public height: number = 0;

  public lives: number = 4;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.THREE;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize();
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}

export class PowerUpEnemy extends Enemy {
  public width: number = 0;
  public height: number = 0;

  public lives: number = 5;
  public score: number = 15;
  public type: EEnemyType = EEnemyType.POWER_UP;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize();
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}

export class HiveEnemy extends Enemy {
  public width: number = 0;
  public height: number = 0;

  public frameY = 0;
  public lives: number = 20;
  public score: number = this.lives;
  public type: EEnemyType = EEnemyType.HIVE;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize();
    this.speedX = Math.random() * -1.2 - 0.2;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}
