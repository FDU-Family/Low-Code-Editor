import { defineStore } from 'pinia'
import type { sendType, stateType } from '@editor/types/consoleStore'
import dayjs from 'dayjs'

export const useConsoleStore = defineStore('console', {
  state: (): stateType => ({
    messages: [],
    index: -1,
  }),
  actions: {
    send(type: sendType, msg: string) {
      // cause push returns the length of array, so `-1` is the last index in the array
      const _index = this.messages.push({
        type,
        msg,
        time: dayjs(),
      }) - 1
      // This code means
      // before pushed, if the `index` is the last item, after pushing, it also,
      // `_index` is the last index now, so `_index - 1` is the last index before.
      if (this.index === _index - 1) {
        this.index = _index
      }
    },
  },
  getters: {
    message: state => state.index === -1 ? null : state.messages[state.index],
  },
})
