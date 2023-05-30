import type { WidgetData, WidgetOptions } from '@editor/types/widgets'
import type { RenderFunction, VNode } from 'vue'

export class Base {
  static _type = 'Base'
  data = reactive({} as WidgetData)

  constructor(option: WidgetOptions) {
    // initialize the widget
    // name
    if (option.name) {
      this.data.name = option.name
    }
    else {
      this.data.name = Base._type
    }
    // props
    if (option.props) {
      this.data.props = reactive(option.props)
    }
    else {
      this.data.props = {
        style: {},
        class: [],
      }
    }
  }

  /**
   * Class Static Methods,
   * To Show Widget Initial State
   */
  static preview(): VNode {
    return h('div')
  }

  /**
   * Add some wrappers for the widget render
   */
  render(): RenderFunction {
    return () => h('div', null, this._render())
  }

  /**
   * widget custom render,
   * child widget can use it
   */
  protected _render(): VNode {
    return h('div')
  }
}
