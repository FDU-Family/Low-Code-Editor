import type { TextData, TextOptions } from '@editor/types/widgets'
import type { VNode } from 'vue'
import { h } from 'vue'
import { Base } from './Base'

export class Text extends Base {
  static _type = 'Text'
  data!: TextData

  constructor(option: TextOptions) {
    super(option)

    if (option.content) {
      this.data.content = option.content
    }
    else {
      this.data.content = '文本Editor'
    }

    this.data.props.class.push('widget-text')
  }

  static preview(): VNode {
    return h('div', { class: 'widget-text' }, '按钮')
  }

  protected _render(): VNode {
    return h('div', this.data.props, this.data.content)
  }
}
