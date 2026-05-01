<template>
  <main class="auth-shell">
    <RouterLink class="brand auth-brand" :to="{ name: 'dashboard' }" aria-label="BudgetFlow dashboard">
      <span class="brand-mark">B</span>
      <span>BudgetFlow</span>
    </RouterLink>

    <section class="auth-panel">
      <slot />
    </section>
  </main>
</template>
