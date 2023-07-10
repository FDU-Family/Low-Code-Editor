<script setup lang="ts">

</script>

<template>
  <div p-20px class="e-editor-ui">
    <div justify="between" items="center" flex>
      <div class="text-md" flex-center>
        <slot name="header-left" />
      </div>
      <div><slot name="header-right" /></div>
    </div>
    <div my-10px w-full border-t="2px $c-border" />
    <div>
      <slot />
    </div>
  </div>
</template>

<style>

</style>
