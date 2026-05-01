import { defineStore } from 'pinia'
import { getApiHealth } from '../../../shared/api/healthApi'
import type { ApiHealthResponse } from '../types/dashboard'

interface HealthState {
  health: ApiHealthResponse | null
  isLoading: boolean
  error: string | null
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): HealthState => ({
    health: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async loadHealth() {
      this.isLoading = true
      this.error = null

      try {
        this.health = await getApiHealth()
      } catch (error) {
        this.health = null
        this.error = error instanceof Error ? error.message : 'Unable to reach the API.'
      } finally {
        this.isLoading = false
      }
    },
  },
})
