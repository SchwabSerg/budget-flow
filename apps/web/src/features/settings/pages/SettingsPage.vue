<script setup lang="ts">
import { ChevronRight, Tags, UserCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppButton, AppCard, AppListRow } from '@/shared/ui'
import { useAuthStore } from '../../auth/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const profileMessage = ref('')

function openProfileStub(): void {
  profileMessage.value = 'Profile settings are coming soon.'
}

function openCategories(): void {
  void router.push('/categories')
}

async function logout(): Promise<void> {
  await authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <section class="settings-page" aria-labelledby="settings-title">
    <div>
      <p class="settings-page__eyebrow">Account</p>
      <h2 id="settings-title" class="settings-page__title">Settings</h2>
    </div>

    <AppCard padding="md">
      <AppListRow clickable @click="openProfileStub">
        <template #leading>
          <UserCircle :size="22" aria-hidden="true" />
        </template>
        <span class="settings-page__row-label">Profile</span>
        <template #trailing>
          <ChevronRight :size="20" aria-hidden="true" />
        </template>
      </AppListRow>

      <AppListRow clickable :has-border="false" @click="openCategories">
        <template #leading>
          <Tags :size="22" aria-hidden="true" />
        </template>
        <span class="settings-page__row-label">Categories</span>
        <template #trailing>
          <ChevronRight :size="20" aria-hidden="true" />
        </template>
      </AppListRow>
    </AppCard>

    <p v-if="profileMessage" class="settings-page__message">{{ profileMessage }}</p>

    <AppButton variant="secondary" class="settings-page__logout" @click="logout">Log out</AppButton>
  </section>
</template>

<style scoped>
.settings-page {
  display: grid;
  gap: var(--space-5);
}

.settings-page__eyebrow {
  margin: 0 0 var(--space-1);
  color: var(--color-text-tertiary);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.settings-page__title {
  margin: 0;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.settings-page__row-label {
  color: var(--color-text-primary);
  font-weight: var(--weight-medium);
}

.settings-page__message {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.settings-page__logout {
  width: 100%;
}
</style>
