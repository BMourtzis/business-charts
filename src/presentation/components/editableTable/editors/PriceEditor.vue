<template>
  <v-text-field
    class="price-editor"
    :model-value="localeValue"
    @update:model-value="$emit('update:modelValue', greekToIntlLocale($event))"
    density="compact"
    variant="underlined"
    hide-details
    autofocus
    type="text"
    inputmode="decimal"
    @blur="$emit('blur')"
    @keydown="onKeydown"
    :suffix="getMonetarySign()"
    :style="{ width: width || '2vw'}"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation';
import { getMonetarySign, greekToIntlLocale, intlToGreekLocale } from '@/utlis/priceUtils';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  width?: string;
}>();

const emit = defineEmits([
  'update:modelValue',
  'blur',
  "navigate"
]);

const localeValue = computed(() => intlToGreekLocale(props.modelValue));

const { onKeydown} = useCellNavigation(emit);

function toNumberString(localeValue: string): string {
  const normalized = localeValue.replace(",", ".");
  return normalized === "" ? "" : normalized;
}

</script>