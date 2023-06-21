import { defineStore } from 'pinia'
import type { sendType, stateType } from '@editor/types/consoleStore'

defineStore('console', {
  state: (): stateType => ({
    messages: [],
    index: 0,
  }),
  actions: {
    send(type: sendType, msg: string) {
      this.messages.push({
        type,
        msg,
        time: new Date(),
      })
    },
  },
})
