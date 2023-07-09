import type { ButtonData, ButtonOptions } from '@editor/types/widgets'
import type { VNode } from 'vue'
import { NButton } from 'naive-ui'
import { Text } from './Text'

export class Button extends Text {
  static _type = 'Button'
  data!: ButtonData

  constructor(option: ButtonOptions) {
    super(option)

    if (option.type) {
      this.data.type = option.type
    }
    else {
      this.data.type = 'primary'
    }

    if (option.size) {
      this.data.size = option.size
    }
    else {
      this.data.size = 'tiny'
    }
  }

  static preview(): VNode {
    return h(NButton, { type: 'primary' }, () => '按钮')
  }

  protected _render(): VNode {
    return h(NButton, this.data.props, super._render())
  }
}
