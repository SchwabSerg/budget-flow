import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppCategoryPill from './AppCategoryPill.vue'

describe('AppCategoryPill', () => {
  it('renders the emoji prefix', () => {
    const wrapper = mount(AppCategoryPill, {
      props: { color: 'coral', emoji: '🍕' },
    })

    expect(wrapper.text()).toContain('🍕')
  })

  it('renders default slot content', () => {
    const wrapper = mount(AppCategoryPill, {
      props: { color: 'coral', emoji: '🍕' },
      slots: { default: 'Food' },
    })

    expect(wrapper.text()).toContain('Food')
  })

  it.each(['coral', 'teal', 'purple', 'pink', 'amber', 'blue', 'green'] as const)(
    'applies the %s category color classes',
    (color) => {
      const wrapper = mount(AppCategoryPill, {
        props: { color, emoji: '✨' },
      })

      expect(wrapper.classes()).toContain(`bg-cat-${color}-bg`)
      expect(wrapper.classes()).toContain(`text-cat-${color}-text`)
    },
  )
})
