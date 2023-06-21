import type { Dayjs } from 'dayjs'

export type sendType = 'info' | 'warn' | 'loading'

export interface messageType {
  type: sendType
  msg: string
  time: Dayjs
}

export interface stateType {
  messages: Array<messageType>
  index: number
}
