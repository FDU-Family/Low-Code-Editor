import type { ButtonData, ButtonOptions } from '@editor/types/widgets'
import type { VNode } from 'vue'
import { ButtonType } from '../types/enum'
import { Text } from './Text'

export class Button extends Text {
  static _type = 'Button'
  data!: ButtonData

  constructor(option: ButtonOptions) {
    super(option)
    if (option.content) {
      this.data.content = option.content
    }
    else {
      this.data.content = 'Button'
    }

    if (option.buttonType) {
      this.data.buttonType = option.buttonType
    }
    else {
      this.data.buttonType = ButtonType.Primary
    }
  }

  static preview(): VNode {
    return super.preview
  }

  protected _render(): VNode {
    return super._render
  }
}
