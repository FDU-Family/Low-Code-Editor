<script setup lang="ts">
import { Text } from './widgets/Text'

const text = new Text({})
const textComponent = text.render()
</script>

<template>
  <div>
    <textComponent />
    <NInput v-model:value="text.data.content" />
    <NDynamicTags v-model:value="text.data.props.class" />
  </div>
</template>

<style></style>
