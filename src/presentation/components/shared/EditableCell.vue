<template>
  <td @click="requestEdit">
    <template v-if="editing && canEdit">
      <slot
        name="editor"
        :value="value"
        :onUpdate="updateValue"
        :onBlur="requestClose"
        :onKeydown="onKeydown"
      >
        <!-- Default editor -->
        <v-text-field
          v-model="value"
          density="compact"
          variant="underlined"
          hide-details
          autofocus
          @blur="requestClose"
          @keydown="onKeydown"
          style="width: 50px"
        />
      </slot>
    </template>
    <span style="width: 50px" v-if="!(editing && canEdit)">{{ value }}</span>
  </td>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
  set: v => updateValue(v)
});

function updateValue(value: string) {
  emit("update:modelValue", value);
}

function requestEdit() {
  if(props.canEdit) {
    emit('request-edit');
  }
}

function onKeydown(e: KeyboardEvent) {
  switch(e.key) {
    case 'Escape':
      requestClose(e);
      break;
    case 'Tab':
      requestMoveCell(e);
      break;
    case "Enter":
      requestMoveRow(e);
      break;
  }
}

function requestClose(e: KeyboardEvent) {
  e.preventDefault();
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