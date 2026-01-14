<template>
  <v-autocomplete
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :items="items"
    density="compact"
    hide-details
    autofocus
    @blur="$emit('blur')"
    @keydown="onKeydown"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/shared/onCellNavigation';

defineProps<{
  modelValue: string;
  items: string[];
}>();
const emit = defineEmits([
  'update:modelValue',
  'blur',
  "navigate"
]);

const { onKeydown} = useCellNavigation(emit);
</script>
<style scoped></style>