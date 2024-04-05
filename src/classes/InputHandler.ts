import { EKey } from '@/enums';
import type { Game } from './Game';

const CONTROL_KEYS = [EKey.ArrowUp, EKey.ArrowDown];

export class InputHandler {
  constructor(private game: Game) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const key = e.key as EKey;
      if (CONTROL_KEYS.includes(key) && !this.game.keys.includes(key)) {
        this.game.keys.push(key);
      }
      if (key === EKey.Space) {
        this.game.player.shootTop();
      }
      console.log(this.game.keys);
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const key = e.key as EKey;
      if (this.game.keys.includes(key)) {
        this.game.keys = this.game.keys.filter((gameKey) => gameKey !== key);
      }
      console.log(this.game.keys);
    });
  }
}
