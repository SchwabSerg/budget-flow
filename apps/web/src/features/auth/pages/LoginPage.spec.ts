import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginPage from './LoginPage.vue'

const routerPush = vi.fn()
const authStore = reactive({
  isLoading: false,
  error: null as string | null,
  fieldErrors: {} as Record<string, string[]>,
  login: vi.fn(),
})

vi.mock('vue-router', () => ({
  useRoute: () => ({ query: {} }),
  useRouter: () => ({ push: routerPush }),
}))

vi.mock('../stores/authStore', () => ({
  useAuthStore: () => authStore,
}))

describe('LoginPage', () => {
  beforeEach(() => {
    authStore.isLoading = false
    authStore.error = null
    authStore.fieldErrors = {}
    authStore.login = vi.fn().mockResolvedValue(undefined)
    routerPush.mockReset()
  })

  it('calls auth store login on form submission', async () => {
    const wrapper = mount(LoginPage)

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit')

    expect(authStore.login).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    })
  })

  it('shows loading state', () => {
    authStore.isLoading = true
    const wrapper = mount(LoginPage)

    expect(wrapper.find('.app-button__spinner').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').attributes('disabled')).toBeDefined()
  })

  it('surfaces API errors', () => {
    authStore.error = 'Invalid credentials.'
    const wrapper = mount(LoginPage)

    expect(wrapper.text()).toContain('Invalid credentials.')
  })

  it('redirects to dashboard on success', async () => {
    const wrapper = mount(LoginPage)

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit')

    expect(routerPush).toHaveBeenCalledWith('/dashboard')
  })

  it('shows validation messages for empty fields', async () => {
    const wrapper = mount(LoginPage)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Password is required.')
    expect(authStore.login).not.toHaveBeenCalled()
  })
})
