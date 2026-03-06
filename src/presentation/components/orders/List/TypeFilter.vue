<template>
  <v-autocomplete
    v-model="selectedType"
    :items="types"
    item-title="title"
    item-value="value"
    :return-object="false"
    clearable
    chips
    density="compact"
    placeholder="type"
  >
  <template #chip="{ props, item }">
    <OrderTypeChip 
      v-bind="props"
      :type="item.value"
    />
  </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { OrderType } from '@/domain/order/orderTypes';
import { getOrderTypeString } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { computed } from 'vue';
import OrderTypeChip from '../OrderTypeChip.vue';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  modelValue?: OrderType;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value?: OrderType): void;
}>();

const types = [
  { value: OrderType.Purchase, title: getOrderTypeString(OrderType.Purchase, tCap)},
  { value: OrderType.Sales, title: getOrderTypeString(OrderType.Sales, tCap)}
]

const selectedType = computed({
  get: () => props.modelValue,
  set: (v: OrderType) => emits("update:modelValue", v)
});

</script>