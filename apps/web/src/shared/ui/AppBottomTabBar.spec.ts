import { mount, RouterLinkStub } from '@vue/test-utils'
import { Circle, Home } from 'lucide-vue-next'
import { describe, expect, it, vi } from 'vitest'
import AppBottomTabBar from './AppBottomTabBar.vue'

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-router')>()

  return {
    ...actual,
    useRoute: () => ({ path: '/expenses/123' }),
  }
})

const items = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/expenses', label: 'Expenses', icon: Circle },
]

describe('AppBottomTabBar', () => {
  it('renders one item per items array entry', () => {
    const wrapper = mount(AppBottomTabBar, {
      props: { items },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(items.length)
  })

  it('applies active class based on current route', () => {
    const wrapper = mount(AppBottomTabBar, {
      props: { items },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    const links = wrapper.findAllComponents(RouterLinkStub)

    expect(links[0].classes()).not.toContain('app-bottom-tab-bar__item--active')
    expect(links[1].classes()).toContain('app-bottom-tab-bar__item--active')
  })

  it('renders each item as a router-link to its path', () => {
    const wrapper = mount(AppBottomTabBar, {
      props: { items },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    const links = wrapper.findAllComponents(RouterLinkStub)

    expect(links[0].props('to')).toBe('/')
    expect(links[1].props('to')).toBe('/expenses')
  })
})
