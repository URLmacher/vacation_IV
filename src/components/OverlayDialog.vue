<template>
  <div class="overlay" :class="{ 'overlay--visible': show }">
    <div class="left-overlay">
      <div v-if="show" class="left-overlay__content">
        <h1 class="vacation__title">{{ TEXTS.vacationTitle }}</h1>
        <h3 class="vacation__sub-title">{{ TEXTS.vacationYear }}</h3>

        <button
          class="vacation__button"
          @click="emits('start-game')"
          :disabled="gameStarted"
        >
          <span class="vacation__button-arrow"></span>
          {{ newGamePlus ? TEXTS.btnTextRoundTwo : TEXTS.btnText }}
        </button>
        <div v-if="newGamePlus" class="vacation__confirmed">
          <FireWork />
          <p class="vacation__confirmed-text">{{ TEXTS.allConfirmed }}</p>
        </div>
      </div>
    </div>
    <div class="right-overlay">
      <div v-if="show" class="vacation__controls">
        <p class="vacation__controls-text">{{ TEXTS.controls }}</p>
        <p class="vacation__controls-text">{{ TEXTS.controlsShoot }}</p>
        <p class="vacation__controls-text">{{ TEXTS.controlsMove }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TEXTS } from '@/constants';
  import FireWork from '@/components/FireWork.vue';

  interface IProps {
    gameStarted: boolean;
    show: boolean;
    newGamePlus: boolean;
  }
  defineProps<IProps>();

  const emits = defineEmits(['start-game']);
</script>

<style lang="scss">
  .overlay {
    pointer-events: none;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .left-overlay,
  .right-overlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: transform 0.5s ease;
  }

  .left-overlay__content {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    width: min-content;
    margin: auto;
    height: 100%;
  }

  .left-overlay {
    width: 100%;
    height: 60%;
    bottom: auto;
    left: 0;
    transform: translateX(-100%);
    padding: 40px;
    border-right: 2px solid var(--color-dark-blue-alt);
    @include background-pattern;

    @include window-medium {
      width: 60%;
      height: 100%;
      bottom: 0;
    }
  }

  .right-overlay {
    width: 100%;
    height: 40%;
    top: auto;
    bottom: 0;
    right: 0;
    padding: 40px;
    display: flex;
    justify-content: end;
    align-items: end;
    transform: translateX(100%);

    @include window-medium {
      width: 40%;
      height: 100%;
      top: 0;
    }
  }

  .overlay--visible .left-overlay,
  .overlay--visible .right-overlay {
    transform: translateX(0);
  }
</style>
