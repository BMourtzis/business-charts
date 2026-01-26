<template>
  <td 
    :tabindex="tabIndex"
    @click.stop="requestEdit"
  >
    <template v-if="showEditor">
      <slot
        name="editor"
        :value="value"
        :width="width"
        :focusKey="isActive ? focusKey : 0"
        :onUpdate="onCellUpdate"
        :onBlur="requestClose"
        :onNavigate="handleNavigate"
      >
        <!-- Default editor -->
        <text-editor
          :model-value="value"
          :width="width"
          :focus-key="isActive ? focusKey : 0"
          @update:model-value="onCellUpdate"
          @blur="requestClose"
          @navigate="handleNavigate"
        />
      </slot>
    </template>
    <template v-if="!showEditor">
      <slot 
        name="display"
        :value="value"
        :width="width"
        :focusKey="isActive ? focusKey : 0"
        :onUpdate="onCellUpdate"
        :onBlur="requestClose"
        :onNavigate="handleNavigate"
      >
        <text-renderer :modelValue="value" :width="width" :focus-key="isActive ? focusKey : 0"/>
      </slot>
    </template>
  </td>
</template>

<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';

import TextRenderer from './renderers/TextRenderer.vue';
import TextEditor from './editors/TextEditor.vue';
import { NavigationDirection } from '@/presentation/viewModels/navigation';
import type { CellPosition } from '@/presentation/composables/editableTable/useTableCellEditing';

const props = defineProps<{
  modelValue: string;
  hasEditor: boolean;
  width?: string;
  position: CellPosition;
  activeCell: CellPosition | null;
  focusKey: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'request-edit'): void,
  (e: 'request-close'): void,
  (e: 'request-move-cell', moveAmount: number): void,
  (e: 'request-move-row', moveAmount: number): void
}>();

const isActive = computed(() => 
  props.activeCell !== null &&
  props.position.row === props.activeCell.row &&
  props.position.column === props.activeCell.column
);

const tabIndex = computed(() => {
  if(isActive.value) return -1;
  return 0;
});

const value = computed({
  get: () => props.modelValue,
  set: v => onCellUpdate(v)
});

const showEditor = computed(() => {
  if(!props.hasEditor) return false;
  return isActive.value;
});

watch(
  () => isActive.value,
  async (active) => {
    if (active && props.hasEditor) {
      emit('request-edit');
      await nextTick();
    }
  }
);

function handleNavigate(direction: NavigationDirection) {
  switch(direction) {
    case NavigationDirection.Up:
      moveEditingCellByRow(-1);
      break;
    case NavigationDirection.Down:
      moveEditingCellByRow(1);
      break;
    case NavigationDirection.Left:
      moveEditingCellByCell(-1);
      break;
    case NavigationDirection.Right:
      moveEditingCellByCell(1);
      break;
  }
}

function moveEditingCellByCell(moveAmount: number) {
  emit('request-move-cell', moveAmount);
}

function moveEditingCellByRow(moveAmount: number) {
  emit('request-move-row', moveAmount);
}

function requestClose(focusKey: number) {
  if(focusKey === props.focusKey) {
    emit('request-close');
  }
}

function onCellUpdate(value: string) {
  emit("update:modelValue", value);
}

function requestEdit() {
  if(!isActive.value && props.hasEditor) {
    emit('request-edit');
  }
}

</script>