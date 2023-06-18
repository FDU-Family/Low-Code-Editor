<script setup lang="ts">
import type { SideBarOption } from './interface'

defineProps<{
  options: SideBarOption
}>()
const actIndex = ref(-1)
const isActivate = ref(true)
const iconActivate = ref('')
const isExpansion = ref(false)

function active(index: number) {
  if (index === 0) {
    isActivate.value = !isActivate.value
    isExpansion.value = !isExpansion.value
    if (isActivate.value) { // true
      iconActivate.value = ''
    }
    else {
      iconActivate.value = 'icon-hf-activate'
    }
  }
  else {
    iconActivate.value = 'icon-activate'
  }
  actIndex.value = index
}
</script>

<template>
  <div id="e-sidebar">
    <div relative h-full>
      <div
        :class="isActivate ? 'e-sidebar-hidden' : ''"
        h-full w-full border-t-2px transition
      >
        <div
          v-for="(item, index) in options" :key="item.key"
          class="e-sidebar-icon"
          cursor="pointer"
          relative z-999 flex-row
          @click="active(index)"
        >
          <div ma h-60px w-160px flex flex-row flex-items-center>
            <div class="iconfont" mr-5px :class="[item.icon, actIndex === index ? iconActivate : '', (index === 0 && isExpansion) ? 'icon-expansion-activate' : '']" />
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

#e-sidebar .icon-hf-activate {
  transform: rotate(180deg);
  color: var(--c-primary);
}
#e-sidebar .icon-expansion-activate {
  transform: rotate(180deg);
}

#e-sidebar .icon-activate {
  color: var(--c-primary);
}

#e-sidebar .e-sidebar-hidden {
  transform: translateX(130px);
}
#e-sidebar .line {
  background-color: var(--c-dark);
}
</style>
