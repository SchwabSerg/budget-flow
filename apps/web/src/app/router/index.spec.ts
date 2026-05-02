import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { appRouteGuard } from './index'
import { useAuthStore } from '../../features/auth/stores/authStore'

function route(path: string, meta: Record<string, unknown>, fullPath = path) {
  return {
    path,
    fullPath,
    matched: [{ meta }],
  }
}

describe('appRouteGuard', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('redirects authenticated routes to login when no token exists', async () => {
    const next = vi.fn()

    await appRouteGuard(route('/dashboard', { requiresAuth: true }) as never, {} as never, next)

    expect(next).toHaveBeenCalledWith({
      name: 'login',
      query: { redirect: '/dashboard' },
    })
  })

  it('redirects guest routes to dashboard when a token exists', async () => {
    const authStore = useAuthStore()
    authStore.token = 'token'
    const next = vi.fn()

    await appRouteGuard(route('/login', { guestOnly: true }) as never, {} as never, next)

    expect(next).toHaveBeenCalledWith({ name: 'dashboard' })
  })
})
