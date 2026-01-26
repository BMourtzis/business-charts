<template>
  <v-autocomplete
    ref="fieldRef"
    class="autocomplete-editor"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :items="items"
    density="compact"
    hide-details
    @blur="$emit('blur', focusKey)"
    @keydown="onKeydown"
    :style="{width: width || '5vw'}"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation';
import type { NavigationDirection } from '@/presentation/viewModels/navigation';
import { nextTick, onMounted, ref } from 'vue';

defineProps<{
  modelValue: string;
  items: string[];
  width?: string;
  focusKey: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'blur', focusKey: number): void,
  (e: 'navigate', direction: NavigationDirection): void
}>();

const { onKeydown} = useCellNavigation(emit);

const fieldRef = ref<any>(null);

onMounted(() => focus());

async function focus() {
  await nextTick();
  const input =
    fieldRef.value?.$el?.querySelector('input');
  input?.focus();
}

</script>
<style scoped>
  .autocomplete-editor {
    width: 5vw;
  }
</style>