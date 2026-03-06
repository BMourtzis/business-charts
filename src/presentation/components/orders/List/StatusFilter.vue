<template>
  <v-combobox
    v-model="selectedStatuses"
    :items="statuses"
    item-title="title"
    item-value="value"
    :return-object="false"
    placeholder="status"
    chips
    closable-chips
    multiple
    density="compact"
  >
    <template #chip="{ props, item }">
      <StatusChip 
        v-bind="props" 
        :status="item.value" 
      />
    </template>
  </v-combobox>
</template>

<script setup lang="ts">
import StatusChip from '@/presentation/components/orders/StatusChip.vue';

import { OrderStatus } from '@/domain/order/orderTypes';
import { getStatusString } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { computed } from 'vue';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  modelValue: OrderStatus[]
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: OrderStatus[]): void;
}>();

const statuses = [
  { value: OrderStatus.Draft, title: getStatusString(OrderStatus.Draft, tCap)},
  { value: OrderStatus.Approved, title: getStatusString(OrderStatus.Approved, tCap)}, 
  { value: OrderStatus.Processing, title: getStatusString(OrderStatus.Processing, tCap)},
  { value: OrderStatus.ReadyForShipment, title: getStatusString(OrderStatus.ReadyForShipment, tCap)},
  { value: OrderStatus.Shipped, title: getStatusString(OrderStatus.Shipped, tCap)},
  { value: OrderStatus.Cancelled, title: getStatusString(OrderStatus.Cancelled, tCap)},
  { value: OrderStatus.Completed, title: getStatusString(OrderStatus.Completed, tCap)},
];

const selectedStatuses = computed({
  get: () => props.modelValue,
  set: (v: OrderStatus[]) => emits("update:modelValue", v)
});
</script>