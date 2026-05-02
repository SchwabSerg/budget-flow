import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppListRow from './AppListRow.vue'

describe('AppListRow', () => {
  it('renders leading, default, and trailing slots', () => {
    const wrapper = mount(AppListRow, {
      slots: {
        leading: '<span data-test="leading">🍕</span>',
        default: '<span data-test="content">Lunch</span>',
        trailing: '<span data-test="trailing">120 ₴</span>',
      },
    })

    expect(wrapper.find('[data-test="leading"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="trailing"]').exists()).toBe(true)
  })

  it('shows bottom border by default', () => {
    const wrapper = mount(AppListRow)

    expect(wrapper.classes()).toContain('app-list-row--bordered')
  })

  it('hides bottom border when hasBorder is false', () => {
    const wrapper = mount(AppListRow, {
      props: { hasBorder: false },
    })

    expect(wrapper.classes()).not.toContain('app-list-row--bordered')
  })

  it("emits 'click' when clickable is true and clicked", async () => {
    const wrapper = mount(AppListRow, {
      props: { clickable: true },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it("does not emit 'click' when clickable is false", async () => {
    const wrapper = mount(AppListRow)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
