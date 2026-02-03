<template>
  <v-dialog
    :model-value="modelValue"
    max-width="1800"
  >
    <v-card :title="title">
      <v-card-text>
        <selectable-table 
          :table-rows="rows"
          :table-columns="shoesVariationLayout"
          v-model:selected="selectedRows"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="tonal"
          color="indigo"
          :text="tCap('common.exportCsv')"
          @click="confirmAction"
        />
        <v-btn
          :text="tCap('common.cancel')"
          color="red"
          @click="emit('update:model-value', false)"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import SelectableTable from '../editableTable/SelectableTable.vue';

import type { Order } from '@/domain/order/models/order';
import type { OrderLineItem } from '@/domain/order/models/orderLineItem';

import { computed, ref } from 'vue';

import { shoesVariationLayout } from '@/presentation/composables/order/useProductVariation';
import { useVariationTableMapper } from '@/presentation/composables/editableTable/useVariationTableMapper';
import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import type { TableRow } from '@/presentation/composables/editableTable/useEditableTable';
import { mapItemVmToDTOList } from '@/presentation/mappers/orderItemMapper';
import { OrderItemMapperInstance } from '@/application/mapper/orderItemMapper';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  modelValue: boolean;
  title: string;
  order: Order;
  action: (items: OrderLineItem[]) => void;
}>();

const emit = defineEmits<{
  (e: "update:model-value", value: boolean): void
}>();

const selectedRows = ref<TableRow[]>([]);

const { vmToRows, rowsToVm } = useVariationTableMapper(shoesVariationLayout);

const rows = computed(() => {
  const lineItems = mapOrderLineItemsToVM([...props.order.items]);
  return vmToRows(lineItems);
});

function confirmAction() {
  const vms = rowsToVm(selectedRows.value);
  const dtos = mapItemVmToDTOList(vms);
  const models = dtos.map(OrderItemMapperInstance.toModel);

  props.action(models);

  emit("update:model-value", false);
  selectedRows.value = [];
}

</script>