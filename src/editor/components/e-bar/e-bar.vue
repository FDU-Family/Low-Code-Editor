<script setup lang="ts">
import type { BarOption } from './interface'

defineProps<{
  options: BarOption
}>()

const actIndex = ref(0)
const isActivate = ref(false)

function active(index: number) {
  if (isActivate.value && index === actIndex.value) {
    isActivate.value = false
  }
  else {
    isActivate.value = true
    actIndex.value = index
  }
}
</script>

<template>
  <div id="e-bar" relative>
    <div
      :class="isActivate ? 'e-bar-content-active' : ''"
      absolute
      overflow="hidden"
      z-998
      h-full
      w-full
      transition-all
    >
      <div
        class="e-bar-border-head"
        h-a
        w-300px
        border-t-2px
      >
        <e-card>
          <template #header-left>
            {{ options[actIndex].title }}
          </template>
          <template #header-right>
            <div
              class="iconfont icon-icon-arrowhead-line"
              transform="rotate-180"
              cursor="pointer"
              @click="active(actIndex)"
            />
          </template>
          <template #default>
            <Transition name="fade-side" mode="out-in">
              <component :is="options[actIndex].content" />
            </Transition>
          </template>
        </e-card>
      </div>
    </div>
    <div border-t-2px :class="isActivate ? 'e-bar-border-head' : ''">
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
}
#e-bar .e-bar-border-head{
  border-top:2px solid var(--c-primary);
}
</style>
