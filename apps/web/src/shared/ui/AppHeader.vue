<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

interface Props {
  title: string
  showBack?: boolean
}

withDefaults(defineProps<Props>(), {
  showBack: false,
})

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <header class="app-header-primitive">
    <button
      v-if="showBack"
      type="button"
      class="app-header-primitive__back"
      aria-label="Go back"
      @click="emit('back')"
    >
      <ChevronLeft :size="24" aria-hidden="true" />
    </button>
    <span v-else class="app-header-primitive__spacer" aria-hidden="true"></span>

    <h1 class="app-header-primitive__title">{{ title }}</h1>

    <div class="app-header-primitive__action">
      <slot name="action" />
    </div>
  </header>
</template>

<style scoped>
.app-header-primitive {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-surface);
  padding: 0 var(--space-3);
}

.app-header-primitive__back,
.app-header-primitive__spacer,
.app-header-primitive__action {
  display: inline-grid;
  width: 44px;
  height: 44px;
  place-items: center;
}

.app-header-primitive__back {
  border: 0;
  border-radius: var(--radius-full);
  color: var(--color-text-primary);
  background: transparent;
  cursor: pointer;
}

.app-header-primitive__back:focus-visible {
  box-shadow: var(--shadow-focus);
  outline: none;
}

.app-header-primitive__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--text-md);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  text-align: center;
}
</style>
