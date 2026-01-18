<template>
  <v-text-field
    class="price-editor"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', sanitize($event))"
    density="compact"
    variant="underlined"
    hide-details
    autofocus
    type="text"
    inputmode="decimal"
    @blur="$emit('blur')"
    @keydown="onKeydown"
    suffix="€"
    :style="{ width: width || '2vw'}"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation';

defineProps<{
  modelValue: string;
  width?: string;
}>();

const emit = defineEmits([
  'update:modelValue',
  'blur',
  "navigate"
]);

const { onKeydown} = useCellNavigation(emit);

function sanitize(value: string) {
  // allow digits and at most one decimal point
  const parts = value.replace(/[^\d.]/g, '').split('.');
  if (parts.length > 2) {
    // more than one dot → keep only first dot
    return parts.shift() + '.' + parts.join('');
  }
  return parts.join('.');
}
</script>