<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface TabBarItem {
  to: string
  label: string
  icon: Component
}

interface Props {
  items: TabBarItem[]
}

defineProps<Props>()

const route = useRoute()

function firstSegment(path: string): string {
  return path.split('/').filter(Boolean)[0] ?? ''
}

function isActive(path: string): boolean {
  if (path === '/') {
    return route.path === '/'
  }

  return firstSegment(route.path) === firstSegment(path)
}

const bottomPadding = computed(() => 'env(safe-area-inset-bottom)')
</script>

<template>
  <nav
    class="app-bottom-tab-bar"
    :style="{ paddingBottom: bottomPadding, '--tab-count': items.length }"
    aria-label="Primary navigation"
  >
    <RouterLink
      v-for="item in items"
      :key="item.to"
      class="app-bottom-tab-bar__item"
      :class="{ 'app-bottom-tab-bar__item--active': isActive(item.to) }"
      :to="item.to"
    >
      <component :is="item.icon" :size="24" aria-hidden="true" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-bottom-tab-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-tab-bar);
  display: grid;
  grid-template-columns: repeat(var(--tab-count, 5), minmax(0, 1fr));
  min-height: var(--tab-bar-height);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-surface);
}

.app-bottom-tab-bar__item {
  display: grid;
  min-height: var(--tab-bar-height);
  place-items: center;
  gap: var(--space-1);
  color: var(--color-text-tertiary);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  text-decoration: none;
}

.app-bottom-tab-bar__item--active {
  color: var(--color-primary-700);
}

.app-bottom-tab-bar__item:focus-visible {
  box-shadow: var(--shadow-focus);
  outline: none;
}
</style>
