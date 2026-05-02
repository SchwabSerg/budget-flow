<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppButton, AppCard, AppInput } from '@/shared/ui'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const localErrors = reactive<Record<string, string>>({})

const emailError = computed(() => localErrors.email ?? authStore.fieldErrors.email?.[0])
const passwordError = computed(() => localErrors.password ?? authStore.fieldErrors.password?.[0])

function validate(): boolean {
  localErrors.email = form.email ? '' : 'Email is required.'
  localErrors.password = form.password ? '' : 'Password is required.'

  return !localErrors.email && !localErrors.password
}

async function submitLogin(): Promise<void> {
  if (!validate()) {
    return
  }

  try {
    await authStore.login(form)
    await router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard')
  } catch {
    // Validation and request errors are displayed from the auth store.
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-page__intro">
      <h1>Welcome back</h1>
      <p>Log in to continue tracking your monthly flow.</p>
    </div>

    <AppCard padding="lg" elevated>
      <form class="auth-page__form" novalidate @submit.prevent="submitLogin">
        <div v-if="authStore.error" class="auth-page__error" role="alert">
          {{ authStore.error }}
        </div>

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
          autocomplete="current-password"
          :disabled="authStore.isLoading"
          :error="passwordError"
          label="Password"
          type="password"
        />

        <AppButton class="auth-page__submit" :loading="authStore.isLoading" type="submit">
          Log in
        </AppButton>
      </form>
    </AppCard>

    <div class="auth-page__switch">
      <span>New to BudgetFlow?</span>
      <AppButton variant="ghost" @click="router.push('/register')">Create an account</AppButton>
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
