import { requestJson } from './httpClient'
import type { ApiHealthResponse } from '../types/api'

export function getApiHealth(): Promise<ApiHealthResponse> {
  return requestJson<ApiHealthResponse>('/api/health')
}
