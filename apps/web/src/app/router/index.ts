import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../../features/dashboard/pages/DashboardPage.vue'),
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import('../../features/expenses/pages/ExpensesPage.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../../features/calendar/pages/CalendarPage.vue'),
    },
    {
      path: '/assets',
      name: 'assets',
      component: () => import('../../features/assets/pages/AssetsPage.vue'),
    },
    {
      path: '/savings',
      name: 'savings',
      component: () => import('../../features/savings/pages/SavingsPage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../../features/settings/pages/SettingsPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../../features/auth/pages/LoginPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../../shared/ui/NotFoundPage.vue'),
    },
  ],
})
