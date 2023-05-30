// import type Module from 'node:module'
import { defineStore } from 'pinia'

interface Module {
  [key: string]: any
  // 其他属性定义...
}

export type scriptFunction = (args: any[]) => void

export const useScriptStore = defineStore('script', {
  state: () => ({
    scriptModules: {} as Record<string, () => Promise<Module>>,
  }),
  actions: {

  },
  getters: {
    functionList: async (state) => {
      const arr = [] as Array<{ name: string; fn: scriptFunction }>
      for (const path in state.scriptModules) {
        const mod = await state.scriptModules[path]()
        const prefix = path.substring(path.indexOf('scripts/') + 7)
        Object.keys(mod).forEach((func) => {
          if (typeof mod[func] === 'function') {
            arr.push({
              name: `${prefix}@${func}`,
              fn: mod[func] as scriptFunction,
            })
          }
        })
      }
      return arr
    },
  },
})
