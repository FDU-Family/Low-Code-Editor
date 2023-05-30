<script setup lang="ts">
import type Module from 'node:module'
import type { SelectOption } from 'naive-ui'
import { Text } from './widgets/Text'
import type { scriptFunction } from './stores/ScriptStore'
import { useScriptStore } from './stores/ScriptStore'

const text = new Text({})
const textComponent = text.render()

const ScriptStore = useScriptStore()
ScriptStore.scriptModules = import.meta.glob<Module>('~/scripts/*.js')

const mountedFnList = ref([])
const fnOptions = reactive([] as Array<SelectOption>)

const fnMap = new Map<string, scriptFunction>()

ScriptStore.functionList.then((res) => {
  res.forEach((item) => {
    fnMap.set(item.name, item.fn)
    fnOptions.push({
      label: item.name,
      value: item.name,
    })
  })
})

function updateHandle(value: string[]) {
  value.forEach((item) => {
    if (text.data.props.onClick) {
      if (Array.isArray(text.data.props.onClick)) {
        text.data.props.onClick.push(fnMap.get(item)!.bind(text.data))
      }
      else {
        text.data.props.onClick = [fnMap.get(item)!.bind(text.data), text.data.props.onClick]
      }
    }
    else {
      text.data.props.onClick = [fnMap.get(item)!.bind(text.data)]
    }
  })
}
</script>

<template>
  <div>
    <textComponent />
    <NInput v-model:value="text.data.content" />
    <NDynamicTags v-model:value="text.data.props.class" />
    <NSelect v-model:value="mountedFnList" multiple :options="fnOptions" @update:value="updateHandle" />
  </div>
</template>

<style></style>
