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
  import { onMounted, ref } from 'vue';
  import { Game } from './classes/Game';
  import { IMAGES } from './constants';

  const canvasDomElement = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const game = ref<Game | null>(null);
  const lastTimeStamp = ref<number>(0);

  onMounted((): void => {
    if (!canvasDomElement.value) return;
    context.value = canvasDomElement.value.getContext('2d');
    const { width, height } = canvasDomElement.value.getBoundingClientRect();
    canvasDomElement.value.width = 1000;
    canvasDomElement.value.height = 500;
    game.value = new Game(width, height);
    animate(0);
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
</script>

<style scoped lang="scss">
  .canvas {
    border: 5px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: blue;
    font-family: 'Bangers', cursive;
    height: 500px;
    width: 1000px;
  }

  .asset {
    display: none;
  }
</style>
