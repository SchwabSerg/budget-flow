<!-- Dev-only design system showcase. Not shipped in production builds. -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  Calendar,
  CreditCard,
  Home,
  Plus,
  Settings,
  WalletCards,
} from 'lucide-vue-next'
import {
  AppBottomTabBar,
  AppButton,
  AppCard,
  AppCategoryPill,
  AppEmptyState,
  AppHeader,
  AppInput,
  AppListRow,
  AppModalSheet,
} from '@/shared/ui'

const inputValue = ref('')
const isSheetOpen = ref(false)

const tabs = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/expenses', label: 'Expenses', icon: CreditCard },
  { to: '/calendar', label: 'Calendar', icon: Calendar, disabled: true },
  { to: '/assets', label: 'Assets', icon: WalletCards, disabled: true },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const categoryColors = ['coral', 'teal', 'purple', 'pink', 'amber', 'blue', 'green'] as const
</script>

<template>
  <div class="components-page">
    <AppHeader title="Components" show-back @back="$router.back()">
      <template #action>
        <AppButton size="sm" variant="ghost">Action</AppButton>
      </template>
    </AppHeader>

    <main class="components-page__content">
      <section class="components-page__section">
        <h2>AppButton</h2>
        <div class="components-page__grid">
          <AppButton>Primary</AppButton>
          <AppButton variant="secondary">Secondary</AppButton>
          <AppButton variant="ghost">Ghost</AppButton>
          <AppButton variant="destructive">Destructive</AppButton>
          <AppButton size="sm">Small</AppButton>
          <AppButton size="lg">Large</AppButton>
          <AppButton loading>Saving</AppButton>
          <AppButton disabled>Disabled</AppButton>
        </div>
      </section>

      <section class="components-page__section">
        <h2>AppInput</h2>
        <div class="components-page__stack">
          <AppInput v-model="inputValue" label="Title" helper-text="A short descriptive name." placeholder="Groceries" />
          <AppInput v-model="inputValue" label="Amount" type="number" error="Amount is required." placeholder="1200" />
          <AppInput v-model="inputValue" label="Search" placeholder="Search">
            <template #leading>
              <CreditCard :size="18" />
            </template>
            <template #trailing>
              <Plus :size="18" />
            </template>
          </AppInput>
        </div>
      </section>

      <section class="components-page__section">
        <h2>AppCard</h2>
        <div class="components-page__stack">
          <AppCard>Default card</AppCard>
          <AppCard padding="sm">Small padding</AppCard>
          <AppCard padding="lg" elevated>Large elevated card</AppCard>
          <AppCard padding="none">
            <AppListRow :has-border="false">
              Card without padding
            </AppListRow>
          </AppCard>
        </div>
      </section>

      <section class="components-page__section">
        <h2>AppListRow</h2>
        <AppCard padding="md">
          <AppListRow clickable>
            <template #leading>🍕</template>
            <div>
              <strong>Lunch</strong>
              <p>Today</p>
            </div>
            <template #trailing>320 ₴</template>
          </AppListRow>
          <AppListRow :has-border="false">
            <template #leading>🚕</template>
            <div>
              <strong>Taxi</strong>
              <p>Yesterday</p>
            </div>
            <template #trailing>180 ₴</template>
          </AppListRow>
        </AppCard>
      </section>

      <section class="components-page__section">
        <h2>AppCategoryPill</h2>
        <div class="components-page__chips">
          <AppCategoryPill
            v-for="color in categoryColors"
            :key="color"
            :color="color"
            emoji="✨"
          >
            {{ color }}
          </AppCategoryPill>
        </div>
      </section>

      <section class="components-page__section">
        <h2>AppEmptyState</h2>
        <AppEmptyState
          title="No expenses yet"
          description="Add your first expense to start tracking your monthly flow."
        >
          <template #illustration>💸</template>
          <template #action>
            <AppButton>Add expense</AppButton>
          </template>
        </AppEmptyState>
      </section>

      <section class="components-page__section">
        <h2>AppModalSheet</h2>
        <AppButton @click="isSheetOpen = true">Open sheet</AppButton>
        <AppModalSheet
          title="Create expense"
          :open="isSheetOpen"
          @close="isSheetOpen = false"
        >
          <div class="components-page__stack">
            <AppInput v-model="inputValue" label="Title" placeholder="Coffee" />
            <AppInput v-model="inputValue" label="Amount" placeholder="95" />
          </div>
          <template #footer>
            <AppButton class="components-page__full-width" @click="isSheetOpen = false">Save</AppButton>
          </template>
        </AppModalSheet>
      </section>
    </main>

    <AppBottomTabBar :items="tabs" />
  </div>
</template>

<style scoped>
.components-page {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg-app);
  padding-bottom: calc(var(--tab-bar-height) + var(--space-8));
}

.components-page__content {
  display: grid;
  width: min(100%, var(--content-max-width));
  margin: 0 auto;
  gap: var(--space-8);
  padding: var(--space-6) var(--space-4);
}

.components-page__section {
  display: grid;
  gap: var(--space-4);
}

.components-page__section h2 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
}

.components-page__grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.components-page__stack {
  display: grid;
  gap: var(--space-3);
}

.components-page__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.components-page__full-width {
  width: 100%;
}
</style>
