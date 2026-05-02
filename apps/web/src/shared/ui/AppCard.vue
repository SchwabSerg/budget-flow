<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevated?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  elevated: false,
})
</script>

<template>
  <section
    class="app-card"
    :class="[`app-card--padding-${padding}`, { 'app-card--elevated': elevated }]"
  >
    <slot />
  </section>
</template>

<style scoped>
.app-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
}

.app-card--padding-none {
  padding: 0;
}

.app-card--padding-sm {
  padding: var(--space-3);
}

.app-card--padding-md {
  padding: var(--space-4);
}

.app-card--padding-lg {
  padding: var(--space-5);
}

.app-card--elevated {
  box-shadow: var(--shadow-sm);
}
</style>
