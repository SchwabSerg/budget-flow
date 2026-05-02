import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import AppInput from './AppInput.vue'

describe('AppInput', () => {
  it('renders label when provided', () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Email' },
    })

    expect(wrapper.text()).toContain('Email')
  })

  it('renders helper text when provided', () => {
    const wrapper = mount(AppInput, {
      props: { helperText: 'Use your main email.' },
    })

    expect(wrapper.text()).toContain('Use your main email.')
  })

  it('renders error message when error prop is set', () => {
    const wrapper = mount(AppInput, {
      props: { error: 'Email is required.' },
    })

    expect(wrapper.text()).toContain('Email is required.')
  })

  it('hides helper text when error is set', () => {
    const wrapper = mount(AppInput, {
      props: {
        helperText: 'Use your main email.',
        error: 'Email is required.',
      },
    })

    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).not.toContain('Use your main email.')
  })

  it('supports v-model two-way binding', async () => {
    const Parent = defineComponent({
      components: { AppInput },
      setup() {
        const value = ref('')

        return { value }
      },
      template: '<AppInput v-model="value" />',
    })

    const wrapper = mount(Parent)
    const input = wrapper.find('input')

    await input.setValue('budget')

    expect((wrapper.vm as unknown as { value: string }).value).toBe('budget')
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(AppInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})
