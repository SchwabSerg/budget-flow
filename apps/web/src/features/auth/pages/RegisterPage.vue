<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '../../../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

async function submitRegister() {
  try {
    await authStore.register(form)
    await router.push({ name: 'dashboard' })
  } catch {
    // Validation and request errors are displayed from the auth store.
  }
}
</script>

<template>
  <AuthLayout>
    <p class="eyebrow">Create account</p>
    <h1>Start using BudgetFlow</h1>
    <p class="lede">Create a local account to enter the authenticated app shell.</p>

    <form class="auth-form" @submit.prevent="submitRegister">
      <label class="field">
        <span>Name</span>
        <input v-model="form.name" autocomplete="name" name="name" type="text" />
        <span v-if="authStore.fieldErrors.name" class="field-error">
          {{ authStore.fieldErrors.name[0] }}
        </span>
      </label>

      <label class="field">
        <span>Email</span>
        <input v-model="form.email" autocomplete="email" name="email" type="email" />
        <span v-if="authStore.fieldErrors.email" class="field-error">
          {{ authStore.fieldErrors.email[0] }}
        </span>
      </label>

      <label class="field">
        <span>Password</span>
        <input v-model="form.password" autocomplete="new-password" name="password" type="password" />
        <span v-if="authStore.fieldErrors.password" class="field-error">
          {{ authStore.fieldErrors.password[0] }}
        </span>
      </label>

      <label class="field">
        <span>Confirm password</span>
        <input
          v-model="form.password_confirmation"
          autocomplete="new-password"
          name="password_confirmation"
          type="password"
        />
        <span v-if="authStore.fieldErrors.password_confirmation" class="field-error">
          {{ authStore.fieldErrors.password_confirmation[0] }}
        </span>
      </label>

      <p v-if="authStore.error" class="status status--error">{{ authStore.error }}</p>

      <button class="button button--wide" type="submit" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Creating account...' : 'Create account' }}
      </button>
    </form>

    <p class="auth-switch">
      Already have an account?
      <RouterLink :to="{ name: 'login' }">Log in</RouterLink>
    </p>
  </AuthLayout>
</template>
