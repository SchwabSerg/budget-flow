<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AppButton, AppEmptyState } from '@/shared/ui'

const router = useRouter()
</script>

<template>
  <AppEmptyState
    title="Dashboard"
    description="Your dashboard is almost ready. Add an expense to get started."
  >
    <template #illustration>📊</template>
    <template #action>
      <AppButton @click="router.push('/expenses')">Add expense</AppButton>
    </template>
  </AppEmptyState>
</template>
