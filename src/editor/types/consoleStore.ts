export type sendType = 'info' | 'warn' | 'loading'

export interface messageType {
  type: sendType
  msg: string
  time: Date
}

export interface stateType {
  messages: Array<messageType>
  index: number
}
