<script setup lang="ts">
import type { SideBarOption } from './interface'

defineProps<{
  options: SideBarOption
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
  <div id="e-sidebar">
    <div relative h-full>
      <div
        :class="isActivate ? 'e-sidebar-hidden' : ''"
        h-full w-full border-t-2px
      >
        <div
          v-for="(item, index) in options" :key="item.key"
          class="e-sidebar-icon"
          cursor="pointer"
          relative z-999 flex-row
          @click="active(index)"
        >
          <div ma h-60px w-160px flex flex-row flex-items-center>
            <div class="iconfont" mr-5px :class="item.icon" />
            <div ml-5px>
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="line" absolute right-0 top-0 z-1000 h-full w-20px />
    </div>
  </div>
</template>

<style>
#e-sidebar div * {
  box-sizing: content-box;
  background-color: var(--c-dark);
}
.e-sidebar-icon:not(:last-child) > div {
  border-bottom: 1px solid;
}

#e-sidebar .e-sidebar-hidden {
  transform: translateX(130px);
}
#e-sidebar .line {
  background-color: var(--c-dark);
}
</style>
