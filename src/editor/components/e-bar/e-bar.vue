<script setup lang="ts">
import type { BarOption } from './interface'

defineProps<{
  options: BarOption
}>()
</script>

<template>
  <div b>
    <div v-for="item, index in options" :key="index" w-60px class="e-bar-icon" cursor="pointer">
      <div ma h-60px w-30px flex-center>
        <div class="iconfont" :class="item.icon" />
      </div>
    </div>
  </div>
</template>

<style>
.e-bar-icon:not(:last-child) > div {
  border-bottom: 1px solid;
}
</style>
