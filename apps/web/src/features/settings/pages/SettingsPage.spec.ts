import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SettingsPage from './SettingsPage.vue'

const routerPush = vi.fn()
const authStore = reactive({
  logout: vi.fn(),
})

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: routerPush }),
}))

vi.mock('../../auth/stores/authStore', () => ({
  useAuthStore: () => authStore,
}))

describe('SettingsPage', () => {
  beforeEach(() => {
    routerPush.mockReset()
    authStore.logout = vi.fn().mockResolvedValue(undefined)
  })

  it('renders profile and categories rows', () => {
    const wrapper = mount(SettingsPage)

    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Categories')
  })

  it('navigates to categories when the categories row is clicked', async () => {
    const wrapper = mount(SettingsPage)

    await wrapper.findAll('button').find((button) => button.text().includes('Categories'))?.trigger('click')

    expect(routerPush).toHaveBeenCalledWith('/categories')
  })

  it('logs out and redirects to login', async () => {
    const wrapper = mount(SettingsPage)

    await wrapper.findAll('button').find((button) => button.text().includes('Log out'))?.trigger('click')

    expect(authStore.logout).toHaveBeenCalled()
    expect(routerPush).toHaveBeenCalledWith('/login')
  })
})

