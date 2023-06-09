<script setup lang="ts">
import '@editor/styles/variable.css'
import '@editor/styles/UI.css'

// import { difference } from 'lodash-es'
// import { useScriptStore } from './stores/ScriptStore'

// const mountedFnList = ref([])

// const ScriptStore = useScriptStore()
// ScriptStore.init()
// // watch file and reload
// import.meta.hot?.on('watch-file:msg', (data: any) => {
//   if (data.kind === 'unlink') {
//     ScriptStore.del(data.path)
//   }
//   else {
//     ScriptStore.update(data.path, data.content)
//   }
// })

// watch the selector change, and then add or delete the function in onclick array
// watch(mountedFnList,
//   (newVal, oldVal) => {
//     if (newVal.length > oldVal.length) {
//     // if add
//     // get function
//       const { fn } = ScriptStore.getFn(difference(newVal, oldVal)[0])
//       if (text.data.props.onClick) {
//       // if has onClick
//         if (Array.isArray(text.data.props.onClick)) {
//         // if onclick is Array just push in
//           text.data.props.onClick.push(fn.bind(text.data))
//         }
//         else {
//         // is a function, should make a array and push
//           text.data.props.onClick = [fn.bind(text.data), text.data.props.onClick]
//         }
//       }
//       else {
//       // if dont have onClick, just new and set
//         text.data.props.onClick = [fn.bind(text.data)]
//       }
//     }
//     else {
//     // if delete
//       const { fn } = ScriptStore.getFn(difference(oldVal, newVal)[0])
//       // find the function index in onclick array and delete
//       text.data.props.onClick.splice(
//         text.data.props.onClick.findIndex(
//           (item: any) => item.toString() === fn.bind(text.data).toString(),
//         ),
//       )
//     }
//   })

const bar = ref()

const barState = useStorage('bar-state', { x: 60, y: 100 }, localStorage)

const { style } = useDraggable(bar, {
  initialValue: barState.value,
  onEnd: (position) => {
    barState.value.x = position.x
    barState.value.y = position.y
  },
})
</script>

<template>
  <!-- <div>
      <btnComponent />
      <NInput v-model:value="text.data.content" />
      <NDynamicTags v-model:value="text.data.props.class" />
      <NSelect v-model:value="mountedFnList" multiple :options="ScriptStore.selectOptions" />
    </div> -->
  <div id="editor-root" relative h-screen w-screen class="bg-$c-dark">
    <e-header class="editor-header" />
    <e-content class="editor-content" />
    <e-footer class="editor-footer" />
    <div ref="bar" absolute :style="style">
      <e-bar />
    </div>
  </div>
</template>

<style></style>
