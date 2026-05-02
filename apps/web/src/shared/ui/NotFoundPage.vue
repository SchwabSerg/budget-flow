<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppButton from './AppButton.vue'
import AppEmptyState from './AppEmptyState.vue'

const router = useRouter()
</script>

<template>
  <AppEmptyState
    title="Page not found"
    description="The requested page does not exist in the BudgetFlow frontend."
  >
    <template #illustration>🧭</template>
    <template #action>
      <AppButton @click="router.push('/dashboard')">Go to dashboard</AppButton>
    </template>
  </AppEmptyState>
</template>
