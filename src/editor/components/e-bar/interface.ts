import type { RenderFunction } from 'vue'

export interface BarOptionItem {
  icon: string
  content: RenderFunction
  key: string | number
}
export type BarOption = Array<BarOptionItem>
