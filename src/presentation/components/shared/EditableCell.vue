<template>
  <td @click="requestEdit">
    <v-text-field
      v-if="editing"
      v-model="value"
      density="compact"
      variant="underlined"
      hide-details
      autofocus
      @blur="requestClose"
      @keydown.esc="requestClose"
      @keydown.tab.prevent="requestMoveCell"
      @keydown.enter.prevent="requestMoveRow"
      style="width: 50px"
    />
    <span style="width: 100px" v-if="!editing">{{ value }}</span>
  </td>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  editing: boolean,
  type: 'text' | 'select'
  canEdit: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void,
  (e: 'request-edit'): void,
  (e: 'request-close'): void,
  (e: 'request-move-cell', moveAmount: number): void,
  (e: 'request-move-row', moveAmount: number): void
}>();

const value = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
});

function requestEdit() {
  emit('request-edit');
}

function requestClose() {
  emit('request-close');
}

function requestMoveCell(e: KeyboardEvent) {
  emit('request-move-cell', getMoveAmount(e));
}

function requestMoveRow(e: KeyboardEvent) {
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