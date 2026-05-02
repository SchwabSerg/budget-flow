<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

interface Props {
  open: boolean
  title: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const sheetElement = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

function requestClose(): void {
  emit('close')
}

function handleBackdropClick(): void {
  requestClose()
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.open) {
    requestClose()
  }
}

function addEscapeListener(): void {
  window.addEventListener('keydown', handleEscape)
}

function removeEscapeListener(): void {
  window.removeEventListener('keydown', handleEscape)
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      previouslyFocusedElement = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
      addEscapeListener()
      await nextTick()
      sheetElement.value?.focus()

      return
    }

    removeEscapeListener()
    previouslyFocusedElement?.focus()
    previouslyFocusedElement = null
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  removeEscapeListener()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="app-modal-sheet">
      <div v-if="open" class="app-modal-sheet" role="presentation">
        <div class="app-modal-sheet__backdrop" data-test="modal-backdrop" @click="handleBackdropClick"></div>
        <section
          ref="sheetElement"
          class="app-modal-sheet__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
        >
          <div class="app-modal-sheet__handle" aria-hidden="true"></div>
          <header class="app-modal-sheet__header">
            <h2 class="app-modal-sheet__title">{{ title }}</h2>
          </header>
          <div class="app-modal-sheet__body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="app-modal-sheet__footer">
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.app-modal-sheet {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal-backdrop);
  display: grid;
  align-items: end;
}

.app-modal-sheet__backdrop {
  position: absolute;
  inset: 0;
  background: var(--color-backdrop);
}

.app-modal-sheet__panel {
  position: relative;
  z-index: var(--z-modal);
  display: grid;
  max-height: 90vh;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-lg);
  overflow: auto;
  outline: none;
}

.app-modal-sheet__handle {
  justify-self: center;
  width: 36px;
  height: 4px;
  margin-top: var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
}

.app-modal-sheet__header,
.app-modal-sheet__body,
.app-modal-sheet__footer {
  padding-inline: var(--space-4);
}

.app-modal-sheet__header {
  padding-top: var(--space-4);
}

.app-modal-sheet__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
}

.app-modal-sheet__body {
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
}

.app-modal-sheet__footer {
  padding-top: var(--space-3);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
}

.app-modal-sheet-enter-active,
.app-modal-sheet-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.app-modal-sheet-enter-active .app-modal-sheet__panel,
.app-modal-sheet-leave-active .app-modal-sheet__panel {
  transition: transform var(--duration-normal) var(--ease-ios);
}

.app-modal-sheet-enter-from,
.app-modal-sheet-leave-to {
  opacity: 0;
}

.app-modal-sheet-enter-from .app-modal-sheet__panel,
.app-modal-sheet-leave-to .app-modal-sheet__panel {
  transform: translateY(100%);
}
</style>
