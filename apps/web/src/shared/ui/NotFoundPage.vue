<template>
  <AppLayout>
    <section class="page-hero">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p class="lede">The requested page does not exist in the BudgetFlow frontend.</p>
      <RouterLink class="button" :to="{ name: 'dashboard' }">Go to dashboard</RouterLink>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppLayout from '../../layouts/AppLayout.vue'
</script>
