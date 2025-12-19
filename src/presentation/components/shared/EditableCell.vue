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
      @keydown.tab="requestMoveCell(1)"
      @keydown.enter="requestMoveRow(1)"
      style="width: 50px"
    />
    <span style="width: 100px" v-if="!editing">{{ value }}</span>
  </td>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  editing: boolean
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

function requestMoveCell(moveAmount: number) {
  emit('request-move-cell', moveAmount);
}

function requestMoveRow(moveAmount: number) {
  emit('request-move-row', moveAmount);
}

</script>

<style lang="css" scoped>

</style>