<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="auth-layout">
    <div class="auth-layout__content">
      <p class="auth-layout__brand">BudgetFlow</p>
      <slot>
        <RouterView />
      </slot>
    </div>
  </main>
</template>

<style scoped>
.auth-layout {
  display: grid;
  min-height: 100vh;
  min-height: 100dvh;
  place-items: center;
  background: var(--color-bg-app);
  padding: var(--space-6) var(--space-4);
}

.auth-layout__content {
  display: grid;
  width: min(100%, 360px);
  gap: var(--space-6);
}

.auth-layout__brand {
  margin: 0;
  color: var(--color-primary-700);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
  text-align: center;
}
</style>
