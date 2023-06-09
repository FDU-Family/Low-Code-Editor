<script setup lang="ts">
import { difference } from 'lodash-es'
import { Button } from './widgets/Button'
import { useScriptStore } from './stores/ScriptStore'

// import { Tag } from './widgets/Tag'

// new A text widget and render
// const text = new Text({})
// const textComponent = text.render()

// new A button widget and render
const text = new Button({ content: '123', type: 'primary', size: 'small' })
const btnComponent = text.render()

const mountedFnList = ref([])

const ScriptStore = useScriptStore()
ScriptStore.init()
// watch file and reload
import.meta.hot?.on('watch-file:msg', (data: any) => {
  if (data.kind === 'unlink') {
    ScriptStore.del(data.path)
  }
  else {
    ScriptStore.update(data.path, data.content)
  }
})

// watch the selector change, and then add or delete the function in onclick array
watch(mountedFnList,
  (newVal, oldVal) => {
    if (newVal.length > oldVal.length) {
    // if add
    // get function
      const { fn } = ScriptStore.getFn(difference(newVal, oldVal)[0])
      if (text.data.props.onClick) {
      // if has onClick
        if (Array.isArray(text.data.props.onClick)) {
        // if onclick is Array just push in
          text.data.props.onClick.push(fn.bind(text.data))
        }
        else {
        // is a function, should make a array and push
          text.data.props.onClick = [fn.bind(text.data), text.data.props.onClick]
        }
      }
      else {
      // if dont have onClick, just new and set
        text.data.props.onClick = [fn.bind(text.data)]
      }
    }
    else {
    // if delete
      const { fn } = ScriptStore.getFn(difference(oldVal, newVal)[0])
      // find the function index in onclick array and delete
      text.data.props.onClick.splice(
        text.data.props.onClick.findIndex(
          (item: any) => item.toString() === fn.bind(text.data).toString(),
        ),
      )
    }
  })
</script>

<template>
  <div>
    <btnComponent />
    <NInput v-model:value="text.data.content" />
    <NDynamicTags v-model:value="text.data.props.class" />
    <NSelect v-model:value="mountedFnList" multiple :options="ScriptStore.selectOptions" />
  </div>
</template>

<style></style>
