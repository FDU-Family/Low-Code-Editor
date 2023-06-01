/**
 *
 */
export interface WidgetProps {
  style: object
  class: Array<string>
  [key: string]: any
}

/**
 * Base widget options type
 */
export interface WidgetOptions {
  name?: string
  props?: WidgetProps
}

export interface WidgetData {
  name: string
  props: WidgetProps
}

/**
 * Text widget options type
 */
export type TextOptions = WidgetOptions & {
  content?: string
}

export type TextData = WidgetData & {
  content: string
}

/**
 * Button widget options type
 */

export type ButtonOptions = WidgetOptions & {
  content?: string
  type?: string
}

export type ButtonData = WidgetData & {
  content: string
  type: string
}
