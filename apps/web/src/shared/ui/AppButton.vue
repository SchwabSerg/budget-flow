<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

function handleClick(event: MouseEvent): void {
  if (isDisabled.value) {
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    class="app-button"
    :class="[`app-button--${variant}`, `app-button--${size}`]"
    :disabled="isDisabled"
    :aria-busy="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true"></span>
    <span class="app-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}

.app-button:focus-visible {
  box-shadow: var(--shadow-focus);
  outline: none;
}

.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.app-button--sm {
  min-height: 32px;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
}

.app-button--md {
  min-height: 44px;
  padding: var(--space-3) var(--space-5);
}

.app-button--lg {
  min-height: 52px;
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-md);
}

.app-button--primary {
  /* `--color-bg-surface` is the system's white-like token for text on coral. */
  color: var(--color-bg-surface);
  background: var(--color-primary-500);
}

.app-button--primary:hover:not(:disabled) {
  background: var(--color-primary-600);
}

.app-button--primary:active:not(:disabled) {
  background: var(--color-primary-700);
}

.app-button--secondary {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
  border-color: var(--color-border-strong);
}

.app-button--secondary:hover:not(:disabled) {
  border-color: var(--color-primary-500);
}

.app-button--ghost {
  color: var(--color-primary-700);
  background: transparent;
}

.app-button--ghost:hover:not(:disabled) {
  background: var(--color-primary-50);
}

.app-button--destructive {
  color: var(--color-danger-text);
  background: var(--color-danger-bg);
}

.app-button--destructive:hover:not(:disabled) {
  color: var(--color-bg-surface);
  background: var(--color-danger);
}

.app-button__spinner {
  width: var(--space-4);
  height: var(--space-4);
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--radius-full);
  animation: app-button-spin var(--duration-slow) linear infinite;
}

.app-button__content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

@keyframes app-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
