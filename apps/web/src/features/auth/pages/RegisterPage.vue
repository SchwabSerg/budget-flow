<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppButton, AppCard, AppInput } from '@/shared/ui'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const localErrors = reactive<Record<string, string>>({})

const nameError = computed(() => localErrors.name ?? authStore.fieldErrors.name?.[0])
const emailError = computed(() => localErrors.email ?? authStore.fieldErrors.email?.[0])
const passwordError = computed(() => localErrors.password ?? authStore.fieldErrors.password?.[0])
const confirmationError = computed(() => (
  localErrors.password_confirmation ?? authStore.fieldErrors.password_confirmation?.[0]
))

function validate(): boolean {
  localErrors.name = form.name ? '' : 'Name is required.'
  localErrors.email = form.email ? '' : 'Email is required.'
  localErrors.password = form.password
    ? form.password.length >= 8
      ? ''
      : 'Password must be at least 8 characters.'
    : 'Password is required.'
  localErrors.password_confirmation = form.password_confirmation
    ? form.password_confirmation === form.password
      ? ''
      : 'Password confirmation must match.'
    : 'Password confirmation is required.'

  return Object.values(localErrors).every((message) => !message)
}

async function submitRegister(): Promise<void> {
  if (!validate()) {
    return
  }

  try {
    await authStore.register(form)
    await router.push('/dashboard')
  } catch {
    // Validation and request errors are displayed from the auth store.
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-page__intro">
      <h1>Create your account</h1>
      <p>Start tracking your budget with a local BudgetFlow account.</p>
    </div>

    <AppCard padding="lg" elevated>
      <form class="auth-page__form" novalidate @submit.prevent="submitRegister">
        <div v-if="authStore.error" class="auth-page__error" role="alert">
          {{ authStore.error }}
        </div>

        <AppInput
          v-model="form.name"
          autocomplete="name"
          :disabled="authStore.isLoading"
          :error="nameError"
          label="Name"
          placeholder="Your name"
        />

        <AppInput
          v-model="form.email"
          autocomplete="email"
          :disabled="authStore.isLoading"
          :error="emailError"
          label="Email"
          placeholder="you@example.com"
          type="email"
        />

        <AppInput
          v-model="form.password"
          autocomplete="new-password"
          :disabled="authStore.isLoading"
          :error="passwordError"
          helper-text="Use at least 8 characters."
          label="Password"
          type="password"
        />

        <AppInput
          v-model="form.password_confirmation"
          autocomplete="new-password"
          :disabled="authStore.isLoading"
          :error="confirmationError"
          label="Confirm password"
          type="password"
        />

        <AppButton class="auth-page__submit" :loading="authStore.isLoading" type="submit">
          Create account
        </AppButton>
      </form>
    </AppCard>

    <div class="auth-page__switch">
      <span>Already have an account?</span>
      <AppButton variant="ghost" @click="router.push('/login')">Log in</AppButton>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  display: grid;
  gap: var(--space-5);
}

.auth-page__intro {
  display: grid;
  gap: var(--space-2);
  text-align: center;
}

.auth-page__intro h1 {
  margin: 0;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
}

.auth-page__intro p,
.auth-page__switch {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.auth-page__form {
  display: grid;
  gap: var(--space-4);
}

.auth-page__error {
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-danger-text);
  background: var(--color-danger-bg);
  font-size: var(--text-sm);
}

.auth-page__submit {
  width: 100%;
}

.auth-page__switch {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}
</style>
