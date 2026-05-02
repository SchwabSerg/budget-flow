<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AppButton, AppEmptyState } from '@/shared/ui'
import { useAuthStore } from '../../auth/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

async function logout(): Promise<void> {
  await authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <AppEmptyState
    title="Settings"
    description="Coming soon. This screen will manage profile settings and app preferences."
  >
    <template #illustration>⚙️</template>
    <template #action>
      <AppButton variant="secondary" @click="logout">Log out</AppButton>
    </template>
  </AppEmptyState>
</template>
