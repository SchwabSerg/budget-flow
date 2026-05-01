<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AuthLayout from '../../../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

async function submitLogin() {
  try {
    await authStore.login(form)
    await router.push(typeof route.query.redirect === 'string' ? route.query.redirect : { name: 'dashboard' })
  } catch {
    // Validation and request errors are displayed from the auth store.
  }
}
</script>

<template>
  <AuthLayout>
    <p class="eyebrow">Welcome back</p>
    <h1>Log in to BudgetFlow</h1>
    <p class="lede">Use your account token session to enter the authenticated app shell.</p>

    <form class="auth-form" @submit.prevent="submitLogin">
      <label class="field">
        <span>Email</span>
        <input v-model="form.email" autocomplete="email" name="email" type="email" />
        <span v-if="authStore.fieldErrors.email" class="field-error">
          {{ authStore.fieldErrors.email[0] }}
        </span>
      </label>

      <label class="field">
        <span>Password</span>
        <input v-model="form.password" autocomplete="current-password" name="password" type="password" />
        <span v-if="authStore.fieldErrors.password" class="field-error">
          {{ authStore.fieldErrors.password[0] }}
        </span>
      </label>

      <p v-if="authStore.error" class="status status--error">{{ authStore.error }}</p>

      <button class="button button--wide" type="submit" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Logging in...' : 'Log in' }}
      </button>
    </form>

    <p class="auth-switch">
      New to BudgetFlow?
      <RouterLink :to="{ name: 'register' }">Create an account</RouterLink>
    </p>
  </AuthLayout>
</template>
