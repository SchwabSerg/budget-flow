import { apiBaseUrl } from '../config/env'

export class ApiRequestError extends Error {
  public readonly status: number
  public readonly errors: Record<string, string[]>

  constructor(message: string, status: number, errors: Record<string, string[]> = {}) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.errors = errors
  }
}

interface JsonRequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | object
  token?: string | null
}

export async function requestJson<TResponse>(
  path: string,
  init: JsonRequestOptions = {},
): Promise<TResponse> {
  const { body, token, ...requestInit } = init
  const requestUrl = new URL(path, apiBaseUrl)
  const headers = new Headers(requestInit.headers)

  headers.set('Accept', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const isJsonBody = body !== undefined && !(body instanceof FormData) && !(body instanceof Blob)

  if (isJsonBody) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(requestUrl, {
    ...requestInit,
    headers: {
      ...Object.fromEntries(headers.entries()),
    },
    body: isJsonBody ? JSON.stringify(body) : body,
  })

  if (!response.ok) {
    const errorPayload = await parseJson<{
      message?: string
      errors?: Record<string, string[]>
    }>(response)

    throw new ApiRequestError(
      errorPayload?.message ?? `API request failed with status ${response.status}.`,
      response.status,
      errorPayload?.errors,
    )
  }

  return (await parseJson<TResponse>(response)) as TResponse
}

async function parseJson<TResponse>(response: Response): Promise<TResponse | null> {
  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    return null
  }

  return (await response.json()) as TResponse
}
