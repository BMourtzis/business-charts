<template>
  <span>{{ modelValue }}</span>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();
</script>