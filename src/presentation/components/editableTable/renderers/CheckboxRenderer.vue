<template>
  <v-checkbox
    ref="checkboxRef"
    :model-value="Boolean(modelValue)"
    @update:model-value="$emit('update:modelValue', $event)"
    density="compact"
    hide-details
    tabindex="0"
    @keydown="onCheckboxKeydown"
    :style="{ width: width || '1vw'}"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation';
import { NavigationDirection } from '@/presentation/viewModels/navigation';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  width?: string;
  readonly?: boolean;
  focusKey: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | null): void,
  (e: 'blur', focusKey: number): void,
  (e: 'navigate', direction: NavigationDirection): void
}>();

const { onKeydown} = useCellNavigation(emit);

function onCheckboxKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case ' ':
      e.preventDefault();
      emit('update:modelValue', !props.modelValue);
      return;

    case 'Enter':
      e.preventDefault();
      emit('navigate', NavigationDirection.Down);
      return;
  }

  onKeydown(e);
}

const checkboxRef = ref<HTMLElement | any>(null);

onMounted(() => focus());

watch(() => props.focusKey, (k) => {
  if (!k) return;
  focus();
})

async function focus() {
  await nextTick();
  const input: HTMLInputElement | null =
    checkboxRef.value?.$el?.querySelector('input[type="checkbox"]');
  input?.focus();
}
</script>