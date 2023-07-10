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
  <div id="e-sidebar" class="e-sidebar">
    <div relative h-full>
      <div
        :class="drawerClosed ? 'e-sidebar-hidden' : ''"
        class="bg-$c-dark"
        relative
        z-999
        h-full
        w-full
        p-20px
        transition
      >
        <div
          :class="taskClosed ? '' : 'e-sidebar-task-active'"
          class="bg-$c-dark"
          absolute left-0 top-0 z-997 h-full w-360px overflow="hidden" transition
        >
          <div>
            <e-card>
              <template #header-left>
                <div class="iconfont icon-icon-packing c-$c-secondary" scale-x--100 cursor-pointer @click="taskClosed = true" />
              </template>
              <template #header-right>
                <span class="font-600 c-$c-secondary">{{ options[actIndex]?.title }}</span>
              </template>
              <template #default>
                <Transition name="fade-side-right" mode="out-in">
                  <component :is="options[actIndex].content" v-if="actIndex >= 0" />
                </Transition>
              </template>
            </e-card>
          </div>
        </div>
        <div relative z-999 class="bg-$c-dark">
          <div
            class="editor-icon-size&quot;"
            b-b="2px $c-border"
            flex
            cursor-pointer
            transition
            @click="drawerActivate()"
          >
            <div class="iconfont icon-icon-packing" :class="drawerClosed ? '' : 'scale-x--100 c-$c-secondary'" transition />
          </div>
          <div
            v-for="(item, index) in options"
            :key="item.key"
            class="e-sidebar-icon"
            b-b="2px $c-border"
            :class="(actIndex === index && !taskClosed) ? 'c-$c-primary b-b-$c-primary' : ''"
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
      <div class="bg-$c-dark" absolute right-0 top-0 z-1000 h-full w-20px />
    </div>
  </div>
</template>

<style>
#e-sidebar .e-sidebar-task-active {
  transform: translateX(-360px);
}

#e-sidebar .e-sidebar-hidden {
  transform: translateX(130px);
}
</style>
