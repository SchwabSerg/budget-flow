<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <section class="app-empty-state">
    <div v-if="$slots.illustration" class="app-empty-state__illustration">
      <slot name="illustration" />
    </div>

    <div class="app-empty-state__copy">
      <h2 class="app-empty-state__title">{{ title }}</h2>
      <p v-if="description" class="app-empty-state__description">{{ description }}</p>
    </div>

    <div v-if="$slots.action" class="app-empty-state__action">
      <slot name="action" />
    </div>
  </section>
</template>

<style scoped>
.app-empty-state {
  display: grid;
  justify-items: center;
  gap: var(--space-4);
  padding: var(--space-12) var(--space-4);
  text-align: center;
}

.app-empty-state__illustration {
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  font-size: var(--text-3xl);
  line-height: var(--leading-tight);
}

.app-empty-state__copy {
  display: grid;
  gap: var(--space-2);
}

.app-empty-state__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--text-md);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
}

.app-empty-state__description {
  max-width: 280px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
</style>
