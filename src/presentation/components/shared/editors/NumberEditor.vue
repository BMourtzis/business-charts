<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    density="compact"
    variant="underlined"
    hide-details
    autofocus
    type="number"
    min="0"
    step="1"
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