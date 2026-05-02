import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AuthLayout from './AuthLayout.vue'

describe('AuthLayout', () => {
  it('renders centered auth content', () => {
    const wrapper = mount(AuthLayout, {
      slots: { default: '<div data-test="content">Auth content</div>' },
      global: {
        stubs: { RouterView: true },
      },
    })

    expect(wrapper.find('.auth-layout').exists()).toBe(true)
    expect(wrapper.find('.auth-layout__content').exists()).toBe(true)
    expect(wrapper.find('[data-test="content"]').text()).toBe('Auth content')
  })
})
