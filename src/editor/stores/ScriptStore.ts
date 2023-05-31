// import type Module from 'node:module'
import { defineStore } from 'pinia'
import axios from 'axios'

interface Module {
  [key: string]: any
}

export type scriptFunction = (args: any[]) => void

export const useScriptStore = defineStore('script', {
  state: () => ({
    // cache for script files
    _fnCache: new Map<string, Array<{ fn: scriptFunction;name: string }>>(),
  }),
  actions: {
    /**
     * ### init the store
     * will get all the script files and load the `export function`
     */
    async init() {
      // get all the script files from vite server by the vite plugin
      const { data } = await axios.get('/scripts')
      for (const item of data[0].folder) {
        // add all functions
        await this.update(item.name, item.content)
      }
    },

    /**
     * ### update the file
     * using broswer blob to import the content (actually is the js code string) as a js module,
     * and load all the export function in the module
     * @param path the file path
     * @param content the js code string
     */
    async update(path: string, content: string) {
      // wraps the js code string as a blob, the get the url and use `import()` dynamicly import
      const blob = new Blob([content], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      const mod = await import(/* @vite-ignore */url) as Module
      // find all the export function and push to arr
      const arr = [] as Array<{ fn: scriptFunction;name: string }>
      Object.keys(mod).forEach((func) => {
        if (typeof mod[func] === 'function') {
          arr.push({
            fn: mod[func] as scriptFunction,
            name: func,
          })
        }
      })
      // set the cache
      this._fnCache.set(path, arr)
    },

    /**
     * will remove the file in the cache
     * @param path the file path
     */
    del(path: string) {
      this._fnCache.delete(path)
    },

    /**
     * get function by the name
     * @param name the function name, such as `/test.js@test`
     * @returns function info
     */
    getFn(name: string) {
      // get the info in the string
      const i = name.indexOf('@')
      const fileName = name.substring(0, i)
      const fnName = name.substring(i + 1)
      // find the function info in the cache
      const fn = this._fnCache.get(`src/scripts${fileName}`)!.find(item => item.name === fnName)!.fn
      return {
        fn, fnName, fileName,
      }
    },
  },
  getters: {
    /**
     * the option for naive ui selector
     * @returns option for naive ui selector
     */
    selectOptions: (state) => {
      const arr = [] as Array<{ label: string; value: string }>
      state._fnCache.forEach((v, k) => {
        // get the function prefix, such as `/test.js`
        const prefix = k.substring(k.indexOf('src/scripts') + 'src/scripts'.length)
        arr.push(...v.map(item => ({
          label: `${prefix}@${item.name}`, // assemble the function name
          value: `${prefix}@${item.name}`,
        })))
      })
      return arr
    },
  },
})
