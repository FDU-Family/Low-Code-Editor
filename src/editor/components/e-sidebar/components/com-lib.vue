<script setup lang="ts">
import { vDrag } from '@editor/directives'
import { Button, Tag, Text } from '@editor/widgets'

const dragOption = {
  group: {
    name: 'editor',
    pull: 'clone',
    put: false,
  },
  animation: 150,
  debounce: true,
  debounceTimeout: 150,
  shakeRange: 3,
}

const buttonPreview = Button.preview()
const textPreview = Text.preview()
const tagPreview = Tag.preview()
</script>

<template>
  <div>
    <div v-drag="dragOption">
      <buttonPreview />
      <textPreview />
      <tagPreview />
    </div>
  </div>
</template>

<style>

</style>
