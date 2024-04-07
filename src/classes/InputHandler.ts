import { EKey } from '@/enums';
import type { Game } from './Game';

const CONTROL_KEYS = [EKey.ARROW_UP, EKey.ARROW_DOWN];

export class InputHandler {
  constructor(private game: Game) {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
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
    if (this.game.keys.includes(key)) {
      this.game.keys = this.game.keys.filter((gameKey) => gameKey !== key);
    }
  }
}
