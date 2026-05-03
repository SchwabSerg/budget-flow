import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiRequestError } from '@/shared/api/httpClient'
import { useAuthStore } from '../../auth/stores/authStore'
import * as categoriesApi from '../api/categoriesApi'
import { useCategoriesStore } from './categoriesStore'
import type { Category } from '../types/category'

vi.mock('../api/categoriesApi', () => ({
  list: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  deleteCategory: vi.fn(),
}))

const category: Category = {
  id: 1,
  name: 'Coffee',
  emoji: '☕',
  color: 'amber',
  sort_order: 1,
  created_at: null,
  updated_at: null,
}

describe('categoriesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useAuthStore().token = 'token'
    vi.mocked(categoriesApi.list).mockReset()
    vi.mocked(categoriesApi.create).mockReset()
    vi.mocked(categoriesApi.update).mockReset()
    vi.mocked(categoriesApi.deleteCategory).mockReset()
  })

  it('loads categories', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([category])
    const store = useCategoriesStore()

    await store.fetchAll()

    expect(categoriesApi.list).toHaveBeenCalledWith('token')
    expect(store.list).toEqual([category])
    expect(store.loading).toBe(false)
  })

  it('creates a category and appends it to state', async () => {
    vi.mocked(categoriesApi.create).mockResolvedValue(category)
    const store = useCategoriesStore()

    await store.create({ name: 'Coffee', emoji: '☕', color: 'amber' })

    expect(categoriesApi.create).toHaveBeenCalledWith('token', { name: 'Coffee', emoji: '☕', color: 'amber' })
    expect(store.list).toEqual([category])
  })

  it('updates a category in state', async () => {
    const updated = { ...category, name: 'Cafe' }
    vi.mocked(categoriesApi.update).mockResolvedValue(updated)
    const store = useCategoriesStore()
    store.list = [category]

    await store.update(category.id, { name: 'Cafe', emoji: '☕', color: 'amber' })

    expect(categoriesApi.update).toHaveBeenCalledWith('token', category.id, {
      name: 'Cafe',
      emoji: '☕',
      color: 'amber',
    })
    expect(store.list).toEqual([updated])
  })

  it('deletes a category from state', async () => {
    vi.mocked(categoriesApi.deleteCategory).mockResolvedValue(undefined)
    const store = useCategoriesStore()
    store.list = [category]

    await store.deleteOne(category.id)

    expect(categoriesApi.deleteCategory).toHaveBeenCalledWith('token', category.id)
    expect(store.list).toEqual([])
  })

  it('keeps delete conflict errors available to callers', async () => {
    const conflict = new ApiRequestError('Cannot delete category.', 409, {}, { expenses_count: 2 })
    vi.mocked(categoriesApi.deleteCategory).mockRejectedValue(conflict)
    const store = useCategoriesStore()
    store.list = [category]

    await expect(store.deleteOne(category.id)).rejects.toBe(conflict)

    expect(store.error).toBe('Cannot delete category.')
    expect(store.list).toEqual([category])
  })
})

