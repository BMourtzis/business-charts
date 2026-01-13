<template>
  <td @click.stop="requestEdit">
    <template v-if="editing && canEdit">
      <slot
        name="editor"
        :value="value"
        :onUpdate="onCellUpdate"
        :onBlur="requestClose"
        :onKeydown="onKeydown"
      >
        <!-- Default editor -->
        <text-editor
          :model-value="value"
          @update:model-value="onCellUpdate"
          @blur="requestClose"
          @keydown="onKeydown"
        />
        
      </slot>
    </template>
    <template v-if="!(editing && canEdit)">
      <slot 
        name="display"
        :value="value"
        :onUpdate="onCellUpdate"
        :onBlur="requestClose"
        :onKeydown="onKeydown"
      >
        <text-renderer :modelValue="value" />
      </slot>
    </template>
  </td>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import TextRenderer from './renderers/TextRenderer.vue';
import TextEditor from './editors/TextEditor.vue';

const props = defineProps<{
  modelValue: string;
  editing: boolean,
  canEdit: boolean
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
  if(!props.editing && props.canEdit) {
    emit('request-edit');
  }
}
const keyHandlers: Record<string, (e: KeyboardEvent) => void> = {
  Escape: requestClose,
  Tab: requestMoveCell,
  Enter: requestMoveRow
};

function onKeydown(e: KeyboardEvent) {
  if(e.isComposing) return;

  keyHandlers[e.key]?.(e);
}

function requestClose(e?: KeyboardEvent) {
  e?.preventDefault();
  emit('request-close');
}

function requestMoveCell(e: KeyboardEvent) {
  e.preventDefault();
  emit('request-move-cell', getMoveAmount(e));
}

function requestMoveRow(e: KeyboardEvent) {
  e.preventDefault();
  emit('request-move-row', getMoveAmount(e));
}

function getMoveAmount(e: KeyboardEvent) {
   if(e.shiftKey) {
    return -1
  } else {
    return 1;
  }
}

</script>

<style lang="css" scoped>

</style>