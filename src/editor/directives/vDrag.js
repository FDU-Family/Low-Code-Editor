import Sortable from 'sortablejs'
import { DebouncePlugin } from 'sortablejs-plugin-debounce'

Sortable.mount(new DebouncePlugin())
export const vDrag = {
  mounted: (el, binding) => {
    const value = binding.value ? binding.value : {}
    new Sortable(el, value)
  },
}
