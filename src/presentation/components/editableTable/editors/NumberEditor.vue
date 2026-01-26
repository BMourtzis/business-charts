<template>
  <v-text-field
    ref="fieldRef"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    density="compact"
    variant="underlined"
    hide-details
    tabindex="0"
    @blur="$emit('blur', focusKey)"
    @keydown="onKeydown"
    :style="{ width: width || '1vw' }"
  />
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation'
import type { NavigationDirection } from '@/presentation/viewModels/navigation';

defineProps<{
  modelValue: string;
  width?: string;
  focusKey: number;
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'blur', focusKey: number): void,
  (e: 'navigate', direction: NavigationDirection): void
}>();

const { onKeydown } = useCellNavigation(emit);

const fieldRef = ref<any>(null);

onMounted(() => focus());

async function focus() {
  await nextTick()
  const input =
    fieldRef.value?.$el?.querySelector('input')
  input?.focus()
}

</script>
