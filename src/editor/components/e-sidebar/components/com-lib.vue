<script setup lang="ts">
import { vDrag } from '@editor/directives'
import { Button } from '@editor/widgets'

const dragOption = {
  group: 'editor',
  animation: 150,
  debounce: true,
  debounceTimeout: 300,
  shakeRange: 3,
}

const buttonPreview = Button.preview()
</script>

<template>
  <div>
    <div v-drag="dragOption">
      <buttonPreview />
    </div>
  </div>
</template>

<style>

</style>
