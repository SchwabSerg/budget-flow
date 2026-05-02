import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AppModalSheet from './AppModalSheet.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

function mountSheet(open = true) {
  return mount(AppModalSheet, {
    props: { open, title: 'Create expense' },
    slots: {
      default: '<p data-test="content">Sheet content</p>',
      footer: '<button data-test="footer">Save</button>',
    },
    attachTo: document.body,
  })
}

describe('AppModalSheet', () => {
  it('renders nothing when open is false', () => {
    mountSheet(false)

    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  it('renders content when open is true', () => {
    mountSheet()

    expect(document.body.querySelector('[data-test="content"]')?.textContent).toBe('Sheet content')
  })

  it("emits 'close' when backdrop is clicked", async () => {
    const wrapper = mountSheet()

    document.body.querySelector<HTMLElement>('[data-test="modal-backdrop"]')?.click()
    await nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it("emits 'close' when Escape key is pressed", async () => {
    const wrapper = mountSheet()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('renders the title prop', () => {
    mountSheet()

    expect(document.body.querySelector('[role="dialog"]')?.textContent).toContain('Create expense')
  })

  it('renders footer slot when provided', () => {
    mountSheet()

    expect(document.body.querySelector('[data-test="footer"]')).not.toBeNull()
  })

  it('moves focus into the sheet when opened and returns focus after close', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    const wrapper = mountSheet(false)

    await wrapper.setProps({ open: true })
    await nextTick()
    expect(document.activeElement).toBe(document.body.querySelector('[role="dialog"]'))

    await wrapper.setProps({ open: false })
    await nextTick()
    expect(document.activeElement).toBe(trigger)
  })

  it('removes Escape listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    const wrapper = mountSheet()

    wrapper.unmount()

    expect(removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
    removeEventListener.mockRestore()
  })
})
