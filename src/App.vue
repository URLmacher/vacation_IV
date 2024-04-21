<template>
  <canvas ref="canvasDomElement" class="canvas"></canvas>

  <img
    v-for="image of IMAGES"
    class="asset"
    :key="image.key"
    :id="image.key"
    :src="image.path"
  />

  <DialogOverlay :open="!gameStarted">
    <h1 class="vacation__title">{{ TEXTS.vacationTitle }}</h1>
    <h3 class="vacation__sub-title">{{ TEXTS.vacationYear }}</h3>
    <div v-if="newGamePlus" class="vacation__confirmed">
      <FireWork />
      <p class="vacation__confirmed-text">{{ TEXTS.allConfirmed }}</p>
    </div>
    <button class="vacation__button" @click="startGame" :disabled="gameStarted">
      {{ newGamePlus ? TEXTS.btnTextRoundTwo : TEXTS.btnText }}
    </button>
  </DialogOverlay>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import DialogOverlay from './components/DialogOverlay.vue';
  import FireWork from './components/FireWork.vue';
  import { GAME_OVER, Game } from './classes/Game';
  import { IMAGES, TEXTS } from './constants';
  import { debounce } from './utils';

  const canvasDomElement = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const game = ref<Game | null>(null);
  const gameStarted = ref<boolean>(false);
  const newGamePlus = ref<boolean>(false);
  const lastTimeStamp = ref<number>(0);

  const startGame = (): void => {
    gameStarted.value = true;
    game.value?.start();
  };

  const stopGame = (): void => {
    gameStarted.value = false;
    newGamePlus.value = true;
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
    height: 100%;
    width: 100%;
    max-width: 1768px;
    max-height: 800px;
    border: 4px solid var(--color-violet);
    border-radius: 4px;
  }

  .asset {
    display: none;
  }
</style>
