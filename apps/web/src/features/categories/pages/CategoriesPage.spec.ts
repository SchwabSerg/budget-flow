import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiRequestError } from '@/shared/api/httpClient'
import { useAuthStore } from '../../auth/stores/authStore'
import * as categoriesApi from '../api/categoriesApi'
import CategoriesPage from './CategoriesPage.vue'
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

function mountPage() {
  return mount(CategoriesPage, {
    attachTo: document.body,
  })
}

describe('CategoriesPage', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    setActivePinia(createPinia())
    useAuthStore().token = 'token'
    vi.mocked(categoriesApi.list).mockReset()
    vi.mocked(categoriesApi.create).mockReset()
    vi.mocked(categoriesApi.update).mockReset()
    vi.mocked(categoriesApi.deleteCategory).mockReset()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the categories list', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([category])
    const wrapper = mountPage()
    await flushPromises()

    expect(wrapper.text()).toContain('Coffee')
    expect(wrapper.text()).toContain('☕')
  })

  it('renders the empty state when there are no categories', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([])
    const wrapper = mountPage()
    await flushPromises()

    expect(wrapper.text()).toContain('No categories yet')
  })

  it('opens the create modal from the add button', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([])
    const wrapper = mountPage()
    await flushPromises()

    await wrapper.findAll('button').find((button) => button.text().includes('Add category'))?.trigger('click')
    await flushPromises()

    expect(document.body.textContent).toContain('New category')
  })

  it('validates and submits the create form', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([])
    vi.mocked(categoriesApi.create).mockResolvedValue(category)
    const wrapper = mountPage()
    await flushPromises()

    await wrapper.findAll('button').find((button) => button.text().includes('Add category'))?.trigger('click')
    await flushPromises()
    await document.body.querySelector<HTMLButtonElement>('.app-modal-sheet__footer .app-button--primary')?.click()
    await flushPromises()

    expect(document.body.textContent).toContain('Name is required.')
    expect(categoriesApi.create).not.toHaveBeenCalled()

    const inputs = document.body.querySelectorAll<HTMLInputElement>('input')
    await wrapper.vm.$nextTick()
    inputs[0].value = 'Coffee'
    inputs[0].dispatchEvent(new Event('input'))
    inputs[1].value = '☕'
    inputs[1].dispatchEvent(new Event('input'))
    await flushPromises()
    await document.body.querySelector<HTMLButtonElement>('.app-modal-sheet__footer .app-button--primary')?.click()
    await flushPromises()

    expect(categoriesApi.create).toHaveBeenCalledWith('token', {
      name: 'Coffee',
      emoji: '☕',
      color: 'coral',
      sort_order: 1,
    })
    expect(document.body.textContent).not.toContain('New category')
  })

  it('deletes a category and refreshes the list on success', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([category])
    vi.mocked(categoriesApi.deleteCategory).mockResolvedValue(undefined)
    const wrapper = mountPage()
    await flushPromises()

    await wrapper.find(`[aria-label="Open actions for ${category.name}"]`).trigger('click')
    await flushPromises()
    await document.body.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      if (button.textContent?.includes('Delete')) button.click()
    })
    await flushPromises()
    await document.body.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      if (button.textContent?.includes('Delete')) button.click()
    })
    await flushPromises()

    expect(categoriesApi.deleteCategory).toHaveBeenCalledWith('token', category.id)
    expect(categoriesApi.list).toHaveBeenCalledTimes(2)
  })

  it('shows a cannot delete modal when the API returns a conflict', async () => {
    vi.mocked(categoriesApi.list).mockResolvedValue([category])
    vi.mocked(categoriesApi.deleteCategory).mockRejectedValue(
      new ApiRequestError('Cannot delete category. 2 expenses are linked to it.', 409, {}, { expenses_count: 2 }),
    )
    const wrapper = mountPage()
    await flushPromises()

    await wrapper.find(`[aria-label="Open actions for ${category.name}"]`).trigger('click')
    await flushPromises()
    await document.body.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      if (button.textContent?.includes('Delete')) button.click()
    })
    await flushPromises()
    await document.body.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      if (button.textContent?.includes('Delete')) button.click()
    })
    await flushPromises()

    expect(document.body.textContent).toContain('Cannot delete')
    expect(document.body.textContent).toContain('Coffee has 2 expenses linked to it.')
  })
})
