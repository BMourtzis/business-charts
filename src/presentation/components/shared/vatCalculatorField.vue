<template>
  <v-text-field
    :model-value="inputValue * 100"
    @update:model-value="onInput"
    type="number"
    min="0"
    max="100"
    step="1"
    suffix="%"
    :label="tCap('order.vatRate')"
    :rules="[required, numeric]"
    :hint="hintString"
    persistent-hint
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { useValidationRules } from '@/presentation/composables/useValidationRules'
import { numberPriceToGreekFormatLocale } from '@/utlis/priceUtils'

const { required, numeric } = useValidationRules()
const { tCap } = useLocalizationHelpers()

const props = defineProps<{
  modelValue: number
  baseAmount: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Internal rate (0–1)
const inputValue = ref(0)

const onInput = (val: string | number) => {
  inputValue.value = Number(val) / 100
}

const vatAmount = computed(() =>(inputValue.value * props.baseAmount));

const hintString = computed(() => numberPriceToGreekFormatLocale(vatAmount.value));

watch(
  () => props.modelValue,
  v => {
    inputValue.value = Number(v) || 0
  },
  { immediate: true }
);

watch(
  () => inputValue.value,
  v => {
    emit('update:modelValue', v)
  }
);
</script>

<style scoped>
</style>