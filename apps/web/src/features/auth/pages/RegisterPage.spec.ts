import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RegisterPage from './RegisterPage.vue'

const routerPush = vi.fn()
const authStore = reactive({
  isLoading: false,
  error: null as string | null,
  fieldErrors: {} as Record<string, string[]>,
  register: vi.fn(),
})

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: routerPush }),
}))

vi.mock('../stores/authStore', () => ({
  useAuthStore: () => authStore,
}))

describe('RegisterPage', () => {
  beforeEach(() => {
    authStore.isLoading = false
    authStore.error = null
    authStore.fieldErrors = {}
    authStore.register = vi.fn().mockResolvedValue(undefined)
    routerPush.mockReset()
  })

  it('calls auth store register on form submission', async () => {
    const wrapper = mount(RegisterPage)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Ada')
    await inputs[1].setValue('ada@example.com')
    await inputs[2].setValue('password123')
    await inputs[3].setValue('password123')
    await wrapper.find('form').trigger('submit')

    expect(authStore.register).toHaveBeenCalledWith({
      name: 'Ada',
      email: 'ada@example.com',
      password: 'password123',
      password_confirmation: 'password123',
    })
  })

  it('shows loading state', () => {
    authStore.isLoading = true
    const wrapper = mount(RegisterPage)

    expect(wrapper.find('.app-button__spinner').exists()).toBe(true)
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('surfaces API errors', () => {
    authStore.error = 'Registration failed.'
    const wrapper = mount(RegisterPage)

    expect(wrapper.text()).toContain('Registration failed.')
  })

  it('redirects to dashboard on success', async () => {
    const wrapper = mount(RegisterPage)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Ada')
    await inputs[1].setValue('ada@example.com')
    await inputs[2].setValue('password123')
    await inputs[3].setValue('password123')
    await wrapper.find('form').trigger('submit')

    expect(routerPush).toHaveBeenCalledWith('/dashboard')
  })

  it('shows validation messages for empty fields', async () => {
    const wrapper = mount(RegisterPage)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Name is required.')
    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Password is required.')
    expect(wrapper.text()).toContain('Password confirmation is required.')
    expect(authStore.register).not.toHaveBeenCalled()
  })
})
