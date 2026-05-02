<script setup lang="ts">
interface Props {
  color: 'coral' | 'teal' | 'purple' | 'pink' | 'amber' | 'blue' | 'green'
  emoji: string
}

defineProps<Props>()
</script>

<template>
  <span
    class="app-category-pill"
    :class="[`bg-cat-${color}-bg`, `text-cat-${color}-text`]"
  >
    <span class="app-category-pill__emoji" aria-hidden="true">{{ emoji }}</span>
    <span><slot /></span>
  </span>
</template>

<style scoped>
.app-category-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
}

.app-category-pill__emoji {
  line-height: var(--leading-tight);
}
</style>
