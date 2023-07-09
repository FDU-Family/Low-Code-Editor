import { NTag } from 'naive-ui'
import type { TagData, TagOptions } from '../types/widgets'
import { Text } from './Text'

export class Tag extends Text {
  static _type = 'Tag'
  data!: TagData

  constructor(option: TagOptions) {
    super(option)

    if (option.type) {
      this.data.type = option.type
    }
    else {
      this.data.type = 'default'
    }
  }

  static preview(): VNode {
    return h(NTag, { type: 'info' }, () => '标签')
  }

  protected _render(): VNode {
    return h(NTag, this.data.props, super._render())
  }
}
