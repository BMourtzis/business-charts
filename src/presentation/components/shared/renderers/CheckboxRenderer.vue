<template>
  <v-checkbox
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    density="compact"
    hide-details
    tabindex="0"
    @keydown="onCheckboxKeydown"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/shared/onCellNavigation';
import { NavigationDirection } from '@/presentation/viewModels/navigation';

const props = defineProps<{
  modelValue: string;
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
</script>