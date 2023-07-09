<script setup lang="ts">
import { vDrag } from '@editor/directives'

const dragOption = {
  group: 'editor',
  animation: 150,
  debounce: true,
  debounceTimeout: 150,
  shakeRange: 3,
}
</script>

<template>
  <div>
    <div v-drag="dragOption" h-full w-full>
      <div />
    </div>
  </div>
</template>

<style>

</style>
