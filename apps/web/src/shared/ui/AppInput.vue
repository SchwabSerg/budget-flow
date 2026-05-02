<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  type?: 'text' | 'email' | 'password' | 'number' | 'date'
  label?: string
  helperText?: string
  error?: string
  disabled?: boolean
  placeholder?: string
  autocomplete?: string
  name?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  label: undefined,
  helperText: undefined,
  error: undefined,
  disabled: false,
  placeholder: undefined,
  autocomplete: undefined,
  name: undefined,
})

const model = defineModel<string | number>({ default: '' })
const inputId = useId()
</script>

<template>
  <label class="app-input" :for="inputId">
    <span v-if="label" class="app-input__label">{{ label }}</span>

    <span class="app-input__control" :class="{ 'app-input__control--error': error }">
      <span v-if="$slots.leading" class="app-input__slot app-input__slot--leading">
        <slot name="leading" />
      </span>

      <input
        :id="inputId"
        v-model="model"
        class="app-input__field"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="helperText || error ? `${inputId}-message` : undefined"
      />

      <span v-if="$slots.trailing" class="app-input__slot app-input__slot--trailing">
        <slot name="trailing" />
      </span>
    </span>

    <span v-if="error" :id="`${inputId}-message`" class="app-input__message app-input__message--error">
      {{ error }}
    </span>
    <span v-else-if="helperText" :id="`${inputId}-message`" class="app-input__message">
      {{ helperText }}
    </span>
  </label>
</template>

<style scoped>
.app-input {
  display: grid;
  gap: var(--space-2);
}

.app-input__label {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
}

.app-input__control {
  display: flex;
  align-items: center;
  min-height: 48px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}

.app-input__control:focus-within {
  border-color: var(--color-primary-500);
  box-shadow: var(--shadow-focus);
}

.app-input__control--error {
  border-color: var(--color-danger);
}

.app-input__field {
  width: 100%;
  min-width: 0;
  min-height: 46px;
  border: 0;
  padding: 0 var(--space-4);
  color: var(--color-text-primary);
  background: transparent;
  font: inherit;
  outline: none;
}

.app-input__field::placeholder {
  color: var(--color-text-tertiary);
}

.app-input__field:disabled {
  cursor: not-allowed;
}

.app-input__control:has(.app-input__field:disabled) {
  opacity: 0.5;
}

.app-input__slot {
  display: inline-flex;
  align-items: center;
  color: var(--color-text-tertiary);
}

.app-input__slot--leading {
  padding-left: var(--space-4);
}

.app-input__slot--trailing {
  padding-right: var(--space-4);
}

.app-input__message {
  color: var(--color-text-tertiary);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.app-input__message--error {
  color: var(--color-danger-text);
}
</style>
