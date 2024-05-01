import { EKey } from '@/enums';
import type { Game } from './Game';

const CONTROL_KEYS = [EKey.ARROW_UP, EKey.ARROW_DOWN];

export class InputHandler {
  public touchStartY: number | null = null;

  constructor(private game: Game) {
    window.addEventListener('keydown', (e) => this.handleKeydown(e));
    window.addEventListener('keyup', (e) => this.handleKeyup(e));
    window.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    window.addEventListener('touchend', (e) => this.handleTouchEnd(e));
  }

  private handleKeydown(e: KeyboardEvent): void {
    const key = e.key as EKey;
    if (CONTROL_KEYS.includes(key) && !this.game.keys.includes(key)) {
      this.game.keys.push(key);
    }
    if (key === EKey.SPACE) {
      this.game.player.shootTop();
    }
    if (key === EKey.DEBUG) {
      this.game.debug = !this.game.debug;
    }
  }

  private handleKeyup(e: KeyboardEvent): void {
    const key = e.key as EKey;
    this.removeKey(key);
  }

  private removeKey(key: EKey): void {
    if (this.game.keys.includes(key)) {
      this.game.keys = this.game.keys.filter((gameKey) => gameKey !== key);
    }
  }

  private handleTouchStart(e: TouchEvent): void {
    this.game.keys = [];
    this.touchStartY = e.touches[0].clientY;
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (this.touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - this.touchStartY;
      if (Math.abs(deltaY) < 10) {
        this.game.player.shootTop();
      } else if (deltaY < 0) {
        this.removeKey(EKey.ARROW_DOWN);
        this.game.keys.push(EKey.ARROW_UP);
      } else {
        this.removeKey(EKey.ARROW_UP);
        this.game.keys.push(EKey.ARROW_DOWN);
      }
      this.touchStartY = null;
    }
    console.log(this.game.keys);
  }
}
