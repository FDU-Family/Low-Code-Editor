import type { ButtonType } from './enum'

/**
 * Base widget props type
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

/**
 * Base widget data type
 */
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

/**
 * Text widget data type
 */
export type TextData = WidgetData & {
  content: string
}

/**
 * Button widget options type
 */

export type ButtonOptions = WidgetOptions & {
  content?: string
  buttonType?: ButtonType
}

export type ButtonData = WidgetData & {
  content: string
  buttonType: ButtonType
}
