import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../../features/auth/stores/authStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../../features/dashboard/pages/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: () => import('../../features/expenses/pages/ExpensesPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../../features/calendar/pages/CalendarPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/assets',
    name: 'assets',
    component: () => import('../../features/assets/pages/AssetsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/savings',
    name: 'savings',
    component: () => import('../../features/savings/pages/SavingsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../../features/settings/pages/SettingsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../features/auth/pages/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../../features/auth/pages/RegisterPage.vue'),
    meta: { guestOnly: true },
  },
]

if (import.meta.env.DEV) {
  routes.push({
    path: '/dev/components',
    name: 'dev-components',
    component: () => import('../../features/dev/pages/ComponentsPage.vue'),
    meta: { requiresAuth: false },
  })
}

routes.push({
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('../../shared/ui/NotFoundPage.vue'),
})

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (authStore.token && !authStore.user && !authStore.hasLoadedUser) {
    await authStore.loadCurrentUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})
