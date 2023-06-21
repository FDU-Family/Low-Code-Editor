<script setup lang="ts">
import { useConsoleStore } from '../stores/ConsoleStore'

const consoleStore = useConsoleStore()
const shownMsg = ref(() => h('div'))
function msgComponent(msg: string, time: string) {
  return () => h('div', {
    class: 'e-footer-msg-container h-full flex items-center justify-between',
  }, [
    h('div', {
      class: 'text-xs ml-10px flex items-center c-$c-gray',
    }, msg),
    h('div', {
      class: 'text-xs c-$c-gray',
    }, time),
  ])
}

watch(() => consoleStore.message, () => {
  shownMsg.value = msgComponent(
    consoleStore.message ? consoleStore.message.msg : '',
    consoleStore.message ? consoleStore.message.time.format('HH:mm:ss') : '',
  )
})

consoleStore.send('info', 'Hello!')
setTimeout(() => {
  consoleStore.send('info', 'There is Low Code Editor!')
  setTimeout(() => {
    consoleStore.send('info', 'Welcome!')
  }, 2000)
}, 2000)
</script>

<template>
  <div flex items-center>
    <div border="l-6px $c-primary" h-full w-full flex items-center pl-24px pr-30px>
      <div class="iconfont icon-icon-checking c-$c-secondary" />
      <transition name="fade-side-up" mode="out-in">
        <component :is="shownMsg" />
      </transition>
    </div>
  </div>
</template>

<style>
.e-footer-msg-container {
  width: calc(100% - 30px);
}
</style>
