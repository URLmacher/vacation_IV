import { FONT_FAMILY, MAX_WIDTH } from '@/constants';
import { EEnemyType } from '@/enums';
import type { IDrawable } from '@/interfaces';
import { formatDate, formatMonth } from '@/utils';
import type { Game } from './Game';
import { Sizeable } from './Sizeable';

export class Enemy extends Sizeable implements IDrawable {
  public date: string;
  public fontOffsetX: number = 2.2;
  public fontOffsetY: number = 0.45;
  public fontScale: number = 1;
  public isFlashing: boolean = false;
  public lives: number = 3;
  public markedForDeletion: boolean = false;
  public speedX: number = Math.random() * -1.5 - 0.5;
  public type: EEnemyType = EEnemyType.BASE;

  constructor(
    protected game: Game,
    date: string,
    x?: number,
    y?: number
  ) {
    super(game);
    this.date = date;
    this.y = y != null ? y : this.y;
    this.x = x != null ? x : this.game.width;
    const scale = this.game.width / MAX_WIDTH;
    this.speedX = this.speedX * scale;
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

    this.drawImage(context);
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

    context.fillStyle = '#172038';
    const textFontSize = Math.ceil(this.height / 4) * this.fontScale;
    context.font = `${textFontSize}px ${FONT_FAMILY}`;

    const textWidth = context.measureText(text).width;
    const textX = Math.round(
      this.x + (this.width / this.fontOffsetX - textWidth / 2)
    );
    const textY = this.y + this.height * this.fontOffsetY + textFontSize / 2;
    context.fillText(text, textX, textY, this.width);
  }
}

export class RedEnemy extends Enemy {
  public fontOffsetX: number = 2.0;
  public fontScale: number = 0.82;
  public lives: number = 5;
  public type: EEnemyType = EEnemyType.RED;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
}

export class PinkEnemy extends Enemy {
  public fontOffsetX: number = 1.8;
  public fontOffsetY: number = 0.48;
  public fontScale: number = 0.52;
  public lives: number = 6;
  public type: EEnemyType = EEnemyType.PINK;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}

export class YellowEnemy extends Enemy {
  public fontOffsetX: number = 1.8;
  public fontOffsetY: number = 0.48;
  public fontScale: number = 0.75;
  public lives: number = 4;
  public type: EEnemyType = EEnemyType.YELLOW;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}

export class WhiteEnemy extends Enemy {
  public fontOffsetX: number = 1.6;
  public fontOffsetY: number = 0.48;
  public fontScale: number = 0.7;
  public lives: number = 5;
  public type: EEnemyType = EEnemyType.WHITE;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}

export class GreenEnemy extends Enemy {
  public fontOffsetX: number = 2.1;
  public lives: number = 11;
  public type: EEnemyType = EEnemyType.GREEN;

  constructor(game: Game, date: string) {
    super(game, date);
    this.image = document.getElementById(this.type);
    this.updateSize(this.type);
    this.speedX = Math.random() * -1.2 - 0.2;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}
