<template>
  <v-autocomplete
    class="autocomplete-editor"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :items="items"
    density="compact"
    hide-details
    autofocus
    @blur="$emit('blur')"
    @keydown="onKeydown"
    :style="{width: width || '5vw'}"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation';

defineProps<{
  modelValue: string;
  items: string[];
  width?: string;
}>();

const emit = defineEmits([
  'update:modelValue',
  'blur',
  "navigate"
]);

const { onKeydown} = useCellNavigation(emit);
</script>
<style scoped>
  .autocomplete-editor {
    width: 5vw;
  }
</style>