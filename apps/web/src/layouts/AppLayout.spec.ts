import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import AppLayout from './AppLayout.vue'

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-router')>()

  return {
    ...actual,
    useRoute: () => ({ path: '/dashboard', meta: { title: 'Dashboard' } }),
    useRouter: () => ({ push: vi.fn() }),
  }
})

describe('AppLayout', () => {
  it('renders header, router-view, and tab bar', () => {
    const wrapper = mount(AppLayout, {
      global: {
        stubs: {
          RouterView: { template: '<div data-test="router-view" />' },
          RouterLink: { props: ['to'], template: '<a><slot /></a>' },
        },
      },
    })

    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true)
    expect(wrapper.find('[data-test="router-view"]').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppBottomTabBar' }).exists()).toBe(true)
  })
})
