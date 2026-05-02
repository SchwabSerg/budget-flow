import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppCard from './AppCard.vue'

describe('AppCard', () => {
  it('renders default slot content', () => {
    const wrapper = mount(AppCard, {
      slots: { default: 'Card content' },
    })

    expect(wrapper.text()).toContain('Card content')
  })

  it('applies elevated shadow class when elevated is true', () => {
    const wrapper = mount(AppCard, {
      props: { elevated: true },
    })

    expect(wrapper.classes()).toContain('app-card--elevated')
  })

  it.each(['none', 'sm', 'md', 'lg'] as const)(
    'applies the %s padding class',
    (padding) => {
      const wrapper = mount(AppCard, {
        props: { padding },
      })

      expect(wrapper.classes()).toContain(`app-card--padding-${padding}`)
    },
  )
})
