import type { RenderFunction } from 'vue'

export interface SideBarOptionItem {
  icon: string
  content: RenderFunction
  key: string | number
  title: string
}

export type SideBarOption = Array<SideBarOptionItem>
