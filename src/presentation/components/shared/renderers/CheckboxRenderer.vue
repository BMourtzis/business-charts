<template>
  <v-checkbox
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    density="compact"
    hide-details
    @blur="$emit('blur')"
    @keydown="$emit('keydown', $event)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits([
  'update:modelValue',
  'blur',
  "keydown"
]);
</script>