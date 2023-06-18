<script setup lang="ts">
import type { SideBarOption } from './interface'

defineProps<{
  options: SideBarOption
}>()
const actIndex = ref(-1)
const drawerClosed = ref(true)
const taskClosed = ref(true)
const taskOpenedStatus = ref('')

function drawerActivate() {
  drawerClosed.value = !drawerClosed.value
}

function taskShown(index: number) {
  if (actIndex.value === index) {
    if (taskClosed.value) {
      taskClosed.value = false
    }
    else {
      taskClosed.value = true
    }
  }
  else {
    taskClosed.value = false
  }
  actIndex.value = index
  if (!drawerClosed.value && !taskClosed.value) {
    taskOpenedStatus.value = '.e-sidebar-task-opened-draw-open'
  }
  if (drawerClosed.value && !taskClosed.value) {
    taskOpenedStatus.value = '.e-sidebar-task-opened-draw-close'
  }
}
</script>

<template>
  <div id="e-sidebar">
    <div relative h-full>
      <div
        :class="[taskClosed ? 'e-sidebar-task-closed' : taskOpenedStatus]"
        absolute right-0 z-998 h-full w-360px overflow="hidden" transition
      >
        <div>
          <e-card>
            <template #header-left>
              left
            </template>
            <template #header-right>
              right
            </template>
          </e-card>
        </div>
      </div>
      <div
        :class="drawerClosed ? 'e-sidebar-hidden' : ''"
        relative z-999 h-full w-full border-t-2px transition
      >
        <div cursor="pointer" ma h-60px w-160px flex flex-row flex-items-center>
          <div
            :class="drawerClosed ? '' : 'e-index0'"
            class="iconfont icon-icon-packing" @click="drawerActivate()"
          />
        </div>
        <div
          v-for="(item, index) in options" :key="item.key"
          class="e-sidebar-icon"
          cursor="pointer"
          relative flex-row
          @click="taskShown(index)"
        >
          <div relative ma h-60px w-160px flex flex-row flex-items-center>
            <div class="iconfont" mr-5px :class="[item.icon, (actIndex === index && !taskClosed) ? 'icon-activate' : '']" />
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

#e-sidebar .e-index0 {
  transform: rotate(180deg);
  color: var(--c-secondary);
}

#e-sidebar .e-sidebar-task-closed {
  transform: translate(300px);
}

#e-sidebar .e-sidebar-task-opened-draw-open {
  transform: translate(-200px);
}

#e-sidebar .e-sidebar-task-opened-draw-close {
  transform: translate(-70px);
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
