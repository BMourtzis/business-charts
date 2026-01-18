<template>
  <v-text-field
    v-model="inputValue"
    :hint="hintString"
    :label="label"
    type="number"
    :persistent-hint="mode === 'percent'"
  >
    <template #append-inner>
      <v-btn-toggle
        v-model="mode"
        density="compact"
        mandatory
        divided
        selected-class="bg-primary"
      >
        <v-btn value="percent">%</v-btn>
        <v-btn value="amount">€</v-btn>
      </v-btn-toggle>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: number,
  baseAmount: number,
  label?: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>();

const mode = ref<'percent' | 'amount'>('percent');
const inputValue = ref<number | null>(0);

const discountAmount = computed(() => {
    if(mode.value === 'amount') {
    return inputValue.value || 0;
  } else {
    return (((inputValue.value || 0) / 100) * props.baseAmount).toFixed(2);
  }
});

const hintString = computed(() => {
  if(mode.value === 'percent') {
    return `${discountAmount.value} €`;
  }
  return "";
});

watch(
  () => props.modelValue,
  v => {
    if(mode.value === 'amount') {
      inputValue.value = v;
    } else if(props.baseAmount > 0){
      inputValue.value = +(v / props.baseAmount * 100).toFixed(2); 
    }
  },
  { immediate: true }
);

watch(
  () => props.baseAmount,
  (newBase) => {
    if(mode.value === 'percent') {
      const amount = newBase * (inputValue.value || 0) / 100;
      emit('update:modelValue', Math.max(0, amount));
    }
  }
);

watch([inputValue, mode], () => {
  let amount = 0;

  if(mode.value === 'amount') {
    amount = inputValue.value || 0;
  } else {
    amount = ((inputValue.value || 0) / 100) * props.baseAmount;
  }

  emit('update:modelValue', Math.max(0, amount));
});

</script>

<style scoped>
</style>