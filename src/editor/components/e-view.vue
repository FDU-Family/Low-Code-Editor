<script setup lang="ts">
import { vDrag } from '@editor/directives'

const dragOption = {
  group: 'editor',
  animation: 150,
  debounce: true,
  debounceTimeout: 300,
  shakeRange: 3,
}
</script>

<template>
  <div>
    <div v-drag="dragOption" />
  </div>
</template>

<style>

</style>
