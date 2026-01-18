<template>
  <v-checkbox
    ref="checkboxRef"
    :model-value="modelValue"
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
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  focused: boolean;
  width?: string;
  readonly?: boolean
}>();

const emit = defineEmits([
  'update:modelValue',
  'blur',
  "navigate"
]);

const { onKeydown} = useCellNavigation(emit);

function onCheckboxKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case ' ':
      e.preventDefault()
      emit('update:modelValue', !props.modelValue)
      return

    case 'Enter':
      e.preventDefault()
      emit('update:modelValue', !props.modelValue)
      emit('navigate', NavigationDirection.Down)
      return
  }

  onKeydown(e);
}

const checkboxRef = ref<HTMLElement | any>(null);

watch(() => props.focused, async (focused) => {
  if(focused) {
    await nextTick()
    const input: HTMLInputElement | null =
      checkboxRef.value?.$el?.querySelector('input[type="checkbox"]');
    input?.focus()
  }
});
</script>