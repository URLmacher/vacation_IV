<template>
  <div class="dialog-overlay" :class="{ 'dialog-overlay--open': open }">
    <div class="dialog-overlay__modal">
      <div class="dialog-overlay__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ open: boolean }>();
</script>

<style scoped lang="scss">
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: linear-gradient(
      0deg,
      var(--color-violet-semi-transparent) 0%,
      var(--color-violet-alt-semi-transparent) 100%
    );
    pointer-events: none;
    opacity: 0;
    transform: scale(0.5);
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;

    &__modal {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      padding: 24px;
      transform: translate(-50%, -50%) scale(0.5);
      width: 100%;
      max-width: 640px;
      pointer-events: none;
      transition:
        transform 0.5s ease,
        opacity 0.5s ease;
      transition-delay: 0.1s;
    }

    &__content {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 30px;
      background: linear-gradient(
        0deg,
        var(--color-dark-blue) 0%,
        var(--color-dark-blue-alt) 100%
      );
      border: 2px solid var(--color-text);
      border-radius: var(--border-radius);
    }

    &--open {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    &--open .dialog-overlay__modal {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      pointer-events: auto;
    }
  }
</style>
