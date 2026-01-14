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
    step="0.01"
    @blur="$emit('blur')"
    @keydown="onKeydown"
    suffix="€"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/shared/onCellNavigation';

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits([
  'update:modelValue',
  'blur',
  "navigate"
]);

const { onKeydown} = useCellNavigation(emit);
</script>