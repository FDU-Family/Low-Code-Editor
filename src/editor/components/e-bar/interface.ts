import type { RenderFunction } from 'vue'

export interface BarOptionItem {
  icon: string
  content: RenderFunction
  key: string | number
  title: string
}
export type BarOption = Array<BarOptionItem>
