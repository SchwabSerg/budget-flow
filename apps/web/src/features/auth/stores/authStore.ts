import { defineStore } from 'pinia'
import { ApiRequestError } from '../../../shared/api/httpClient'
import * as authApi from '../api/authApi'
import type { AuthUser, LoginPayload, RegisterPayload } from '../types/auth'

const authTokenKey = 'budgetflow.authToken'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  hasLoadedUser: boolean
  error: string | null
  fieldErrors: Record<string, string[]>
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem(authTokenKey),
    isLoading: false,
    hasLoadedUser: false,
    error: null,
    fieldErrors: {},
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user),
  },
  actions: {
    async register(payload: RegisterPayload) {
      await this.submitAuthRequest(() => authApi.register(payload))
    },

    async login(payload: LoginPayload) {
      await this.submitAuthRequest(() => authApi.login(payload))
    },

    async loadCurrentUser() {
      if (!this.token) {
        this.user = null
        this.hasLoadedUser = true
        return
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await authApi.getCurrentUser(this.token)

        this.user = response.user
      } catch (error) {
        this.clearSession()
        this.error = error instanceof Error ? error.message : 'Unable to load the current user.'
      } finally {
        this.isLoading = false
        this.hasLoadedUser = true
      }
    },

    async logout() {
      const token = this.token

      this.clearSession()

      if (!token) {
        return
      }

      try {
        await authApi.logout(token)
      } catch {
        // The local session is already cleared; a failed remote logout should not keep the user signed in.
      }
    },

    clearErrors() {
      this.error = null
      this.fieldErrors = {}
    },

    clearSession() {
      this.user = null
      this.token = null
      this.hasLoadedUser = false
      localStorage.removeItem(authTokenKey)
    },

    async submitAuthRequest(request: () => Promise<{ user: AuthUser; token: string }>) {
      this.isLoading = true
      this.clearErrors()

      try {
        const response = await request()

        this.user = response.user
        this.token = response.token
        this.hasLoadedUser = true
        localStorage.setItem(authTokenKey, response.token)
      } catch (error) {
        if (error instanceof ApiRequestError) {
          this.error = error.message
          this.fieldErrors = error.errors
        } else {
          this.error = error instanceof Error ? error.message : 'Authentication request failed.'
          this.fieldErrors = {}
        }

        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
