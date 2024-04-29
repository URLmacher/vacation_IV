<template>
  <canvas
    ref="canvasDomElement"
    class="canvas"
    :style="{ 'max-width': MAX_WIDTH + 'px', 'aspect-ratio': aspectRatio }"
  ></canvas>

  <img
    v-for="image of IMAGES"
    class="asset"
    :key="image.key"
    :id="image.key"
    :src="image.path"
  />

  <audio
    v-for="sound of SOUNDS"
    class="asset"
    :key="sound.key"
    :id="sound.key"
    :src="sound.path"
    :loop="!!sound.loop"
  />

  <OverlayDialog
    :newGamePlus="newGamePlus"
    :show="!gameStarted"
    :game-started="gameStarted"
    @start-game="startGame"
  ></OverlayDialog>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { GAME_OVER, Game } from './classes/Game';
  import OverlayDialog from './components/OverlayDialog.vue';
  import { IMAGES, SOUNDS, MAX_WIDTH, MAX_HEIGHT } from './constants';
  import { debounce } from './utils';
  import { EAsset } from '@/enums';

  const canvasDomElement = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const game = ref<Game | null>(null);
  const gameStarted = ref<boolean>(false);
  const newGamePlus = ref<boolean>(false);
  const lastTimeStamp = ref<number>(0);

  const aspectRatio = ref<number>(MAX_WIDTH / MAX_HEIGHT);

  const startGame = (): void => {
    gameStarted.value = true;
    game.value?.start();
    void (document.getElementById(EAsset.BGMUSIC) as HTMLAudioElement)?.play();
  };

  const stopGame = (): void => {
    gameStarted.value = false;
    newGamePlus.value = true;
    void (document.getElementById(EAsset.FX_WIN) as HTMLAudioElement)?.play();
  };

  onMounted((): void => {
    if (!canvasDomElement.value) return;
    context.value = canvasDomElement.value.getContext('2d');
    const { width, height } = canvasDomElement.value.getBoundingClientRect();
    canvasDomElement.value.width = width;
    canvasDomElement.value.height = height;
    game.value = new Game(width, height);
    animate(0);

    window.addEventListener(GAME_OVER, stopGame);
    window.addEventListener('resize', handleResize);
  });

  const animate = (timeStamp: number): void => {
    if (!context.value || !canvasDomElement.value) return;
    const { width, height } = canvasDomElement.value.getBoundingClientRect();
    const deltaTime = timeStamp - lastTimeStamp.value;
    lastTimeStamp.value = timeStamp;

    context.value.clearRect(0, 0, width, height);
    game.value?.update(deltaTime);
    game.value?.draw(context.value);
    requestAnimationFrame(animate);
  };

  const handleResize = debounce((): void => {
    location.reload();
  });

  onBeforeUnmount((): void => {
    window.removeEventListener(GAME_OVER, stopGame);
    window.removeEventListener('resize', handleResize);
  });
</script>

<style scoped lang="scss">
  .canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 48px);
    border: 2px solid var(--color-dark-blue-alt);
    border-radius: 4px;
  }

  .asset {
    display: none;
  }
</style>
