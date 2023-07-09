<script setup lang="ts">
import type { SideBarOption } from './interface'

defineProps<{
  options: SideBarOption
}>()
const actIndex = ref(-1)
const drawerClosed = ref(true)
const taskClosed = ref(true)

function drawerActivate() {
  drawerClosed.value = !drawerClosed.value
}

function taskShown(index: number) {
  if (actIndex.value === index && taskClosed.value === false) {
    taskClosed.value = true
  }
  else {
    taskClosed.value = false
    actIndex.value = index
  }
}
</script>

<template>
  <div id="e-sidebar">
    <div relative h-full>
      <div
        :class="drawerClosed ? 'e-sidebar-hidden' : ''"
        relative
        z-999
        h-full
        w-full
        p-20px
        transition
      >
        <div
          :class="taskClosed ? '' : 'e-sidebar-task-active'"
          absolute left-0 top-0 z-998 h-full w-360px overflow="hidden" transition
        >
          <div>
            <e-card>
              <template #header-left>
                <div class="iconfont icon-icon-packing" scale-x--100 cursor-pointer @click="taskClosed = true" />
              </template>
              <template #header-right>
                {{ options[actIndex]?.title }}
              </template>
              <template #default>
                <Transition name="fade-side-right" mode="out-in">
                  <component :is="options[actIndex].content" v-if="actIndex >= 0" />
                </Transition>
              </template>
            </e-card>
          </div>
        </div>
        <div relative z-999>
          <div
            :class="drawerClosed ? '' : 'e-sidebar-active-icon'"
            class="iconfont icon-icon-packing editor-icon-size"
            cursor-pointer
            transition
            @click="drawerActivate()"
          />
          <div
            v-for="(item, index) in options"
            :key="item.key"
            class="e-sidebar-icon"
            :class="(actIndex === index && !taskClosed) ? 'icon-activate' : ''"
            cursor="pointer"
            flex
            items-center
            transition
            @click="taskShown(index)"
          >
            <div
              class="iconfont editor-icon-size"
              :class="item.icon"
            />
            <div ml-10px>
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
  background-color: var(--c-dark);
}

.e-sidebar-icon {
  border-bottom: 1px solid var(--c-border);
}

#e-sidebar .e-sidebar-active-icon {
  transform: scaleX(-1);
  color: var(--c-secondary);
}

#e-sidebar .e-sidebar-task-active {
  transform: translateX(-360px);
}

#e-sidebar .icon-activate,
#e-sidebar .icon-activate > div {
  color: var(--c-primary);
  border-color: var(--c-primary);
}

#e-sidebar .e-sidebar-hidden {
  transform: translateX(130px);
}

#e-sidebar .line {
  background-color: var(--c-dark);
}
</style>
