<template>
  <AuthLayout>
    <p class="eyebrow">Authentication</p>
    <h1>Login placeholder</h1>
    <p class="lede">
      Authentication is not implemented yet. This page reserves the route and layout for the future
      Sanctum-backed auth flow.
    </p>
    <RouterLink class="button button--wide" :to="{ name: 'dashboard' }">Back to dashboard</RouterLink>
  </AuthLayout>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AuthLayout from '../../../layouts/AuthLayout.vue'
</script>
