<script setup lang="ts">
import dayjs from 'dayjs'
</script>

<template>
  <div flex items-center>
    <div border="l-6px $c-primary" h-full w-full flex items-center pl-24px pr-30px>
      <div class="iconfont icon-icon-checking c-$c-secondary" />
      <div class="e-footer-msg-container" h-full flex items-center justify-between>
        <div class="text-xs" ml-10px flex items-center>
          检测到脚本发生变化
        </div>
        <div class="text-xs c-$c-gray">
          {{ dayjs().format('HH:mm:ss') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.e-footer-msg-container {
  width: calc(100% - 30px);
}
</style>
