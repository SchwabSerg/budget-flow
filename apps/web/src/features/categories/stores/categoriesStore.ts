import { defineStore } from 'pinia'
import { ApiRequestError } from '@/shared/api/httpClient'
import { useAuthStore } from '../../auth/stores/authStore'
import * as categoriesApi from '../api/categoriesApi'
import type { Category, CategoryPayload } from '../types/category'

interface CategoriesState {
  list: Category[]
  loading: boolean
  error: string | null
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    list: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll(): Promise<void> {
      await this.runWithLoading(async (token) => {
        this.list = await categoriesApi.list(token)
      })
    },

    async create(payload: CategoryPayload): Promise<Category> {
      return await this.runWithLoading(async (token) => {
        const category = await categoriesApi.create(token, payload)
        this.list = [...this.list, category].sort(sortCategories)

        return category
      })
    },

    async update(id: number, payload: CategoryPayload): Promise<Category> {
      return await this.runWithLoading(async (token) => {
        const category = await categoriesApi.update(token, id, payload)
        this.list = this.list
          .map((item) => item.id === id ? category : item)
          .sort(sortCategories)

        return category
      })
    },

    async deleteOne(id: number): Promise<void> {
      await this.runWithLoading(async (token) => {
        await categoriesApi.deleteCategory(token, id)
        this.list = this.list.filter((category) => category.id !== id)
      })
    },

    async runWithLoading<TResult>(callback: (token: string) => Promise<TResult>): Promise<TResult> {
      const authStore = useAuthStore()

      if (!authStore.token) {
        throw new ApiRequestError('Authentication token is missing.', 401)
      }

      this.loading = true
      this.error = null

      try {
        return await callback(authStore.token)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Category request failed.'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})

function sortCategories(first: Category, second: Category): number {
  return first.sort_order - second.sort_order || first.name.localeCompare(second.name)
}
