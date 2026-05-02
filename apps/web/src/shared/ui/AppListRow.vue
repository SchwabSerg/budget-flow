<script setup lang="ts">
interface Props {
  hasBorder?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasBorder: true,
  clickable: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent): void {
  if (!props.clickable) {
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    v-if="clickable"
    type="button"
    class="app-list-row app-list-row--clickable"
    :class="{ 'app-list-row--bordered': hasBorder }"
    @click="handleClick"
  >
    <span v-if="$slots.leading" class="app-list-row__leading">
      <slot name="leading" />
    </span>
    <span class="app-list-row__content">
      <slot />
    </span>
    <span v-if="$slots.trailing" class="app-list-row__trailing">
      <slot name="trailing" />
    </span>
  </button>

  <div v-else class="app-list-row" :class="{ 'app-list-row--bordered': hasBorder }">
    <span v-if="$slots.leading" class="app-list-row__leading">
      <slot name="leading" />
    </span>
    <span class="app-list-row__content">
      <slot />
    </span>
    <span v-if="$slots.trailing" class="app-list-row__trailing">
      <slot name="trailing" />
    </span>
  </div>
</template>

<style scoped>
.app-list-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  min-height: 56px;
  padding: var(--space-3) 0;
  color: var(--color-text-primary);
  background: transparent;
  text-align: left;
}

.app-list-row--bordered {
  border-bottom: 1px solid var(--color-border);
}

.app-list-row--clickable {
  cursor: pointer;
}

.app-list-row--clickable:hover {
  background: var(--color-bg-muted);
}

.app-list-row--clickable:focus-visible {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-focus);
  outline: none;
}

.app-list-row__leading {
  display: inline-grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.app-list-row__content {
  min-width: 0;
}

.app-list-row__trailing {
  color: var(--color-text-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
}
</style>
