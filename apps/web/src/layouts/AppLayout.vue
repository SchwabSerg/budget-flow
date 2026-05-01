<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navigationItems = [
  { name: 'dashboard', label: 'Dashboard', path: '/' },
  { name: 'expenses', label: 'Expenses', path: '/expenses' },
  { name: 'calendar', label: 'Calendar', path: '/calendar' },
  { name: 'assets', label: 'Assets', path: '/assets' },
  { name: 'settings', label: 'Settings', path: '/settings' },
]
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" :to="{ name: 'dashboard' }" aria-label="BudgetFlow dashboard">
        <span class="brand-mark">B</span>
        <span>BudgetFlow</span>
      </RouterLink>

      <RouterLink class="login-link" :to="{ name: 'login' }">Login</RouterLink>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <nav class="bottom-nav" aria-label="Primary navigation">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.name"
        class="bottom-nav__item"
        :to="item.path"
      >
        <span class="bottom-nav__dot" aria-hidden="true"></span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
