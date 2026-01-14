<template>
  <span
    class="text-renderer" 
    :style="{ width: width || '1vw'}"
  >
    {{ modelValue }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  width?: string;
}>();
</script>

<style scoped>
  .text-renderer {
    display: inline-block;
  }
</style>