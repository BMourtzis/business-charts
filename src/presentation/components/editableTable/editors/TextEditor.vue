<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    density="compact"
    variant="underlined"
    hide-details
    autofocus
    @blur="$emit('blur')"
    @keydown="onKeydown"
    :style="{ width: width || '1vw'}"
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

</script>