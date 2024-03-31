<template>
  <canvas ref="canvasDomElement" class="canvas"></canvas>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const canvasDomElement = ref<HTMLCanvasElement | null>(null)
  const context = ref<CanvasRenderingContext2D | null>(null)

  onMounted(() => {
    if (!canvasDomElement.value) return
    context.value = canvasDomElement.value.getContext('2d')
  })
</script>

<style scoped lang="scss">
  .canvas {
    @include absolute-center;
    height: 500px;
    width: 500px;
    max-width: 100%;
    max-height: 100%;
    background-color: blue;
  }
</style>
