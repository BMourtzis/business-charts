<template>
  <v-text-field
    ref="fieldRef"
    class="price-editor"
    :model-value="localeValue"
    @update:model-value="$emit('update:modelValue', greekToIntlLocale($event))"
    density="compact"
    variant="underlined"
    hide-details
    tabindex="0"
    type="text"
    inputmode="decimal"
    @blur="$emit('blur', focusKey)"
    @keydown="onKeydown"
    :suffix="getMonetarySign()"
    :style="{ width: width || '2vw'}"
  />
</template>

<script setup lang="ts">
import { useCellNavigation } from '@/presentation/composables/editableTable/onCellNavigation';
import type { NavigationDirection } from '@/presentation/viewModels/navigation';
import { getMonetarySign, greekToIntlLocale, intlToGreekLocale } from '@/utlis/priceUtils';
import { computed, nextTick, onMounted, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  width?: string;
  focusKey: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'blur', focusKey: number): void,
  (e: 'navigate', direction: NavigationDirection): void
}>();

const localeValue = computed(() => intlToGreekLocale(props.modelValue));

const { onKeydown} = useCellNavigation(emit);

const fieldRef = ref<any>(null);

onMounted(() => focus());

async function focus() {
  await nextTick()
  const input =
    fieldRef.value?.$el?.querySelector('input')
  input?.focus()
}

</script>