<script setup lang="ts">
import type { BarOption } from './interface'

defineProps<{
  options: BarOption
}>()

const actIndex = ref(0)
const isActivate = ref(false)

function active(index: number) {
  if (isActivate.value) {
    isActivate.value = false
  }
  else {
    isActivate.value = true
    actIndex.value = index
  }
}
</script>

<template>
  <div id="e-bar">
    <div position="relative">
      <div
        :class="isActivate ? 'e-bar-content-active' : ''"
        position="absolute"
        z-998
        h-full
        w-full
        transition
        overflow="hidden"
      >
        <div class="e-bar-border-head" border-t-2pxborder-t-2px h-a w-300px>
          <component :is="options[actIndex].content" />
        </div>
      </div>
    </div>
    <div b class="border-t-2px" :class="isActivate ? 'e-bar-border-head' : ''">
      <div
        v-for="item, index in options" :key="item.key"
        class="e-bar-icon"
        cursor="pointer"
        z-999
        w-60px
        position="relative"
        @click="active(index)"
      >
        <div ma h-60px w-30px flex-center>
          <div class="iconfont" :class="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#e-bar div * {
  box-sizing: content-box;
  background-color: var(--c-dark);
}
.e-bar-icon:not(:last-child) > div {
  border-bottom: 1px solid;
}
#e-bar .e-bar-content-active{
  transform: translateX(60px);
  width: 300px;
  height: auto;
  z-index: 1000;
}
#e-bar .e-bar-border-head{
  border-top:2px solid var(--c-primary);
}
</style>
