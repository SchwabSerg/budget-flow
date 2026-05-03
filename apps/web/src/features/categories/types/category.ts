export const categoryColors = ['coral', 'teal', 'purple', 'pink', 'amber', 'blue', 'green'] as const

export type CategoryColor = (typeof categoryColors)[number]

export interface Category {
  id: number
  name: string
  emoji: string
  color: CategoryColor
  sort_order: number
  created_at: string | null
  updated_at: string | null
}

export interface CategoryPayload {
  name: string
  emoji: string
  color: CategoryColor
  sort_order?: number
}

