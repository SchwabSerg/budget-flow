import { requestJson } from '@/shared/api/httpClient'
import type { Category, CategoryPayload } from '../types/category'

interface ResourceResponse<TData> {
  data: TData
}

export async function list(token: string): Promise<Category[]> {
  const response = await requestJson<ResourceResponse<Category[]>>('/api/categories', {
    token,
  })

  return response.data
}

export async function create(token: string, payload: CategoryPayload): Promise<Category> {
  const response = await requestJson<ResourceResponse<Category>>('/api/categories', {
    method: 'POST',
    token,
    body: payload,
  })

  return response.data
}

export async function update(token: string, id: number, payload: CategoryPayload): Promise<Category> {
  const response = await requestJson<ResourceResponse<Category>>(`/api/categories/${id}`, {
    method: 'PATCH',
    token,
    body: payload,
  })

  return response.data
}

export async function deleteCategory(token: string, id: number): Promise<void> {
  await requestJson<null>(`/api/categories/${id}`, {
    method: 'DELETE',
    token,
  })
}

