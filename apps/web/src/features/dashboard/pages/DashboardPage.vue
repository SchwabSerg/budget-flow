<script setup lang="ts">
import { onMounted } from 'vue'
import AppLayout from '../../../layouts/AppLayout.vue'
import { useDashboardStore } from '../stores/dashboardStore'

const dashboardStore = useDashboardStore()

onMounted(() => {
  void dashboardStore.loadHealth()
})
</script>

<template>
  <AppLayout>
    <section class="page-hero">
      <p class="eyebrow">BudgetFlow</p>
      <h1>Personal finance workspace</h1>
      <p class="lede">
        A mobile-first budget tracker foundation for expenses, savings, assets, imports, realtime
        updates, and background processing.
      </p>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">Backend</p>
          <h2>API health</h2>
        </div>
        <button
          class="button"
          type="button"
          :disabled="dashboardStore.isLoading"
          @click="dashboardStore.loadHealth"
        >
          Refresh
        </button>
      </div>

      <p v-if="dashboardStore.isLoading" class="muted">Checking the Laravel API...</p>
      <p v-else-if="dashboardStore.error" class="status status--error">{{ dashboardStore.error }}</p>
      <p v-else-if="dashboardStore.health" class="status status--ok">
        {{ dashboardStore.health.service }} is {{ dashboardStore.health.status }}.
      </p>
      <p v-else class="muted">Health check has not run yet.</p>
    </section>
  </AppLayout>
</template>
