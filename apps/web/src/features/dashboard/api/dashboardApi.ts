import { getApiHealth } from '../../../shared/api/healthApi'
import type { ApiHealthResponse } from '../types/dashboard'

export function getDashboardHealth(): Promise<ApiHealthResponse> {
  return getApiHealth()
}
