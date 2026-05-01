import { requestJson } from '../../../shared/api/httpClient'
import type { AuthResponse, CurrentUserResponse, LoginPayload, RegisterPayload } from '../types/auth'

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: payload,
  })
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export function getCurrentUser(token: string): Promise<CurrentUserResponse> {
  return requestJson<CurrentUserResponse>('/api/auth/user', {
    token,
  })
}

export function logout(token: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>('/api/auth/logout', {
    method: 'POST',
    token,
  })
}
