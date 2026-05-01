import { apiBaseUrl } from '../config/env'

export class ApiRequestError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

export async function requestJson<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const requestUrl = new URL(path, apiBaseUrl)
  const response = await fetch(requestUrl, {
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  if (!response.ok) {
    throw new ApiRequestError(`API request failed with status ${response.status}.`, response.status)
  }

  return (await response.json()) as TResponse
}
