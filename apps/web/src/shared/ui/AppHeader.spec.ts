import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppHeader from './AppHeader.vue'

describe('AppHeader', () => {
  it('renders title', () => {
    const wrapper = mount(AppHeader, {
      props: { title: 'Expenses' },
    })

    expect(wrapper.text()).toContain('Expenses')
  })

  it('shows back button only when showBack is true', () => {
    const withoutBack = mount(AppHeader, {
      props: { title: 'Expenses' },
    })
    const withBack = mount(AppHeader, {
      props: { title: 'Expenses', showBack: true },
    })

    expect(withoutBack.find('button').exists()).toBe(false)
    expect(withBack.find('button').exists()).toBe(true)
  })

  it("emits 'back' when back button is clicked", async () => {
    const wrapper = mount(AppHeader, {
      props: { title: 'Expenses', showBack: true },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('renders action slot when provided', () => {
    const wrapper = mount(AppHeader, {
      props: { title: 'Expenses' },
      slots: { action: '<button data-test="action">Add</button>' },
    })

    expect(wrapper.find('[data-test="action"]').exists()).toBe(true)
  })
})
