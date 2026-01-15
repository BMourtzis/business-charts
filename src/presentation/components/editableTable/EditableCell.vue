<template>
  <td @click.stop="requestEdit">
    <template v-if="showEditor(focused, hasEditor)">
      <slot
        name="editor"
        :value="value"
        :width="width"
        :onUpdate="onCellUpdate"
        :onBlur="requestClose"
        :onNavigate="handleNavigate"
        @keydown.stop
      >
        <!-- Default editor -->
        <text-editor
          :model-value="value"
          :width="width"
          @update:model-value="onCellUpdate"
          @blur="requestClose"
          @navigate="handleNavigate"
        />
      </slot>
    </template>
    <template v-if="!showEditor(focused, hasEditor)">
      <slot 
        name="display"
        :value="value"
        :width="width"
        :focused="focused"
        :onUpdate="onCellUpdate"
        :onBlur="requestClose"
        :onNavigate="handleNavigate"
        @keydown.stop
      >
        <text-renderer :modelValue="value" :width="width"/>
      </slot>
    </template>
  </td>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import TextRenderer from './renderers/TextRenderer.vue';
import TextEditor from './editors/TextEditor.vue';
import { NavigationDirection } from '@/presentation/viewModels/navigation';

const props = defineProps<{
  modelValue: string;
  focused: boolean;
  hasEditor: boolean;
  width?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'request-edit'): void,
  (e: 'request-close'): void,
  (e: 'request-move-cell', moveAmount: number): void,
  (e: 'request-move-row', moveAmount: number): void
}>();

const value = computed({
  get: () => props.modelValue,
  set: v => onCellUpdate(v)
});

function onCellUpdate(value: string) {
  emit("update:modelValue", value);
}

function requestEdit() {
  if(!props.focused && props.hasEditor) {
    emit('request-edit');
  }
}

function showEditor(focused: boolean, hasEditor: boolean) {
  if(!hasEditor) return false;

  return focused;
}

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

function requestClose(e?: KeyboardEvent) {
  e?.preventDefault();
  emit('request-close');
}

</script>

<style lang="css" scoped>

</style>