<script setup lang="ts">
import { LayoutDashboard, Receipt, CalendarDays, PiggyBank, UserCircle, Wallet } from 'lucide-vue-next'
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { AppBottomTabBar, AppButton, AppHeader } from '@/shared/ui'

const route = useRoute()
const router = useRouter()

const title = computed(() => typeof route.meta.title === 'string' ? route.meta.title : 'BudgetFlow')

const tabItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, disabled: false },
  { to: '/expenses', label: 'Expenses', icon: Receipt, disabled: false },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, disabled: true },
  { to: '/savings', label: 'Savings', icon: PiggyBank, disabled: true },
  { to: '/assets', label: 'Assets', icon: Wallet, disabled: true },
]

function openSettings(): void {
  void router.push('/settings')
}
</script>

<template>
  <div class="app-layout">
    <div class="app-layout__frame">
      <AppHeader :title="title">
        <template #action>
          <AppButton
            aria-label="Open settings"
            class="app-layout__profile-button"
            size="sm"
            variant="ghost"
            @click="openSettings"
          >
            <UserCircle :size="24" aria-hidden="true" />
          </AppButton>
        </template>
      </AppHeader>

      <main class="app-layout__content">
        <RouterView />
      </main>

      <AppBottomTabBar :items="tabItems" />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg-app);
}

.app-layout__frame {
  position: relative;
  width: min(100%, var(--content-max-width));
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  background: var(--color-bg-app);
}

.app-layout__content {
  padding: var(--space-6) var(--space-4) calc(var(--tab-bar-height) + var(--space-8));
}

.app-layout__profile-button {
  width: 44px;
  min-height: 44px;
  padding: 0;
}

.app-layout :deep(.app-bottom-tab-bar) {
  right: auto;
  left: 50%;
  width: min(100%, var(--content-max-width));
  transform: translateX(-50%);
}
</style>
