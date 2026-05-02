import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppButton from './AppButton.vue'

describe('AppButton', () => {
  it('renders default slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Save' },
    })

    expect(wrapper.text()).toContain('Save')
  })

  it("emits 'click' when clicked", async () => {
    const wrapper = mount(AppButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it("does not emit 'click' when disabled", async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it("does not emit 'click' when loading", async () => {
    const wrapper = mount(AppButton, {
      props: { loading: true },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders spinner when loading prop is true', () => {
    const wrapper = mount(AppButton, {
      props: { loading: true },
    })

    expect(wrapper.find('.app-button__spinner').exists()).toBe(true)
  })

  it.each(['primary', 'secondary', 'ghost', 'destructive'] as const)(
    'applies the %s variant class',
    (variant) => {
      const wrapper = mount(AppButton, {
        props: { variant },
      })

      expect(wrapper.classes()).toContain(`app-button--${variant}`)
    },
  )
})
