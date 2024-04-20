<template>
  <canvas ref="canvasDomElement" class="canvas"></canvas>
  <img
    v-for="image of IMAGES"
    class="asset"
    :key="image.key"
    :id="image.key"
    :src="image.path"
  />
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { Game } from './classes/Game';
  import { IMAGES } from './constants';
  import { debounce } from './utils';

  const canvasDomElement = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const game = ref<Game | null>(null);
  const lastTimeStamp = ref<number>(0);

  onMounted((): void => {
    if (!canvasDomElement.value) return;
    context.value = canvasDomElement.value.getContext('2d');
    const { width, height } = canvasDomElement.value.getBoundingClientRect();
    canvasDomElement.value.width = width;
    canvasDomElement.value.height = height;
    game.value = new Game(width, height);
    animate(0);
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
    max-height: 500px;
  }

  .asset {
    display: none;
  }
</style>
