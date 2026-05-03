import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../../features/auth/stores/authStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: { template: '<div />' },
  },
  {
    path: '/',
    component: () => import('../../layouts/AuthLayout.vue'),
    meta: { guestOnly: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../../features/auth/pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../../features/auth/pages/RegisterPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../../layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../../features/dashboard/pages/DashboardPlaceholderPage.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'expenses',
        name: 'expenses',
        component: () => import('../../features/expenses/pages/ExpensesPlaceholderPage.vue'),
        meta: { title: 'Expenses' },
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('../../features/calendar/pages/CalendarPlaceholderPage.vue'),
        meta: { title: 'Calendar' },
      },
      {
        path: 'savings',
        name: 'savings',
        component: () => import('../../features/savings/pages/SavingsPlaceholderPage.vue'),
        meta: { title: 'Savings' },
      },
      {
        path: 'assets',
        name: 'assets',
        component: () => import('../../features/assets/pages/AssetsPlaceholderPage.vue'),
        meta: { title: 'Assets' },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../../features/settings/pages/SettingsPage.vue'),
        meta: { title: 'Settings' },
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../../features/categories/pages/CategoriesPage.vue'),
        meta: { title: 'Categories', showBack: true, backTo: '/settings' },
      },
    ],
  },
]

if (import.meta.env.DEV) {
  routes.push({
    path: '/dev/components',
    name: 'dev-components',
    component: () => import('../../features/dev/pages/ComponentsPage.vue'),
  })
}

routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('../../layouts/AppLayout.vue'),
  children: [
    {
      path: '',
      name: 'not-found',
      component: () => import('../../shared/ui/NotFoundPage.vue'),
      meta: { title: 'Not found' },
    },
  ],
})

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export async function appRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  const authStore = useAuthStore()

  if (to.path === '/') {
    next(authStore.token ? '/dashboard' : '/login')
    return
  }

  if (to.matched.some((route) => route.meta.requiresAuth) && !authStore.token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.matched.some((route) => route.meta.guestOnly) && authStore.token) {
    next({ name: 'dashboard' })
    return
  }

  if (authStore.token && !authStore.user && !authStore.hasLoadedUser) {
    await authStore.loadCurrentUser()
  }

  if (to.matched.some((route) => route.meta.requiresAuth) && !authStore.token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  next()
}

router.beforeEach(appRouteGuard)
