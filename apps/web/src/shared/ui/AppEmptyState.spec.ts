import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppEmptyState from './AppEmptyState.vue'

describe('AppEmptyState', () => {
  it('renders title', () => {
    const wrapper = mount(AppEmptyState, {
      props: { title: 'No expenses yet' },
    })

    expect(wrapper.text()).toContain('No expenses yet')
  })

  it('renders description when provided', () => {
    const wrapper = mount(AppEmptyState, {
      props: {
        title: 'No expenses yet',
        description: 'Add your first expense to start tracking.',
      },
    })

    expect(wrapper.text()).toContain('Add your first expense to start tracking.')
  })

  it('renders illustration slot', () => {
    const wrapper = mount(AppEmptyState, {
      props: { title: 'No expenses yet' },
      slots: { illustration: '<span data-test="illustration">💸</span>' },
    })

    expect(wrapper.find('[data-test="illustration"]').exists()).toBe(true)
  })

  it('renders action slot when provided', () => {
    const wrapper = mount(AppEmptyState, {
      props: { title: 'No expenses yet' },
      slots: { action: '<button data-test="action">Add expense</button>' },
    })

    expect(wrapper.find('[data-test="action"]').exists()).toBe(true)
  })
})
