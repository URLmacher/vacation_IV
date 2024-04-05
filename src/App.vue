<template>
  <canvas ref="canvasDomElement" class="canvas"></canvas>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Game } from './classes/Game';

  const canvasDomElement = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const game = ref<Game | null>(null);
  const lastTimeStamp = ref<number>(0);

  onMounted((): void => {
    if (!canvasDomElement.value) return;
    context.value = canvasDomElement.value.getContext('2d');
    const { width, height } = canvasDomElement.value.getBoundingClientRect();
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
    @include absolute-center;
    height: 800px;
    width: 500px;
    max-width: 100%;
    max-height: 100%;
    background-color: blue;
  }
</style>
