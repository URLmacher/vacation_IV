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
        <div v-if="!newGamePlus" class="vacation__confirmed">
          <FireWork />
          <p class="vacation__confirmed-text">{{ TEXTS.allConfirmed }}</p>
        </div>
      </div>
    </div>
    <div class="right-overlay"></div>
  </div>
</template>

<script setup lang="ts">
  import { TEXTS } from '@/constants';
  import FireWork from '@/components/FireWork.vue'

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
    // pointer-events: none;
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
    // pointer-events: none;
    position: absolute;
    top: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: transform 0.5s ease;
  }

  .left-overlay__content {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: min-content;
    margin: auto;
    height: 100%;
  }

  .left-overlay {
    left: 0;
    width: 100%;
    transform: translateX(-100%);
    padding: 40px;
    border-right: 2px solid var(--color-dark-blue-alt);
    @include background-pattern;

    @include window-medium {
      width: 70%;
    }
  }

  .right-overlay {
    width: 0%;
    right: 0;
    transform: translateX(100%);

    @include window-medium {
      width: 30%;
    }
  }

  .overlay--visible .left-overlay,
  .overlay--visible .right-overlay {
    transform: translateX(0);
  }
</style>
