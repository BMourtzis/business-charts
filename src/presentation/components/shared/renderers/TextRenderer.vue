<template>
  <span>{{ value }}</span>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>