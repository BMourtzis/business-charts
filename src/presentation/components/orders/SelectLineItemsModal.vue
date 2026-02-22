<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="onDialogUpdate"
    max-width="1800"
  >
    <v-card :title="title">
      <v-card-text>
        <selectable-table 
          :table-rows="rows"
          :table-columns="shoesVariationLayout"
          :all-selected="true"
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

import type { OrderLineItem } from '@/domain/order/models/orderLineItem';

import { computed, ref } from 'vue';

import { shoesVariationLayout } from '@/presentation/composables/order/useProductVariation';
import { useVariationTableMapper } from '@/presentation/composables/editableTable/useVariationTableMapper';
import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import type { TableRow } from '@/presentation/composables/editableTable/useEditableTable';
import { useExportLabelPrintListToCSV, useExportListToCSV } from '@/presentation/composables/order/useCSVExport';
import { mapItemVmToDTOList } from '@/presentation/mappers/orderItemMapper';
import { OrderItemMapperInstance } from '@/application/mapper/orderItemMapper';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  modelValue: boolean;
  filename: string;
  items: OrderLineItem[];
  type: "lineItems" | "labels";
}>();

const emit = defineEmits<{
  (e: "update:model-value", value: boolean): void
}>();

const selectedRows = ref<TableRow[]>([]);

const { vmToRows, rowsToVm } = useVariationTableMapper(shoesVariationLayout);

const rows = computed(() => {
  const lineItems = mapOrderLineItemsToVM(props.items);
  return vmToRows(lineItems);
});

const title = computed(() => {
  if(props.type === "labels") {
    return tCap('order.labelCsvTitle')
  }
  else if(props.type === "lineItems") {
    return tCap('order.listCsvTitle')
  }
})

const action = computed(() => {
  if(props.type === "labels") {
    return (items: OrderLineItem[]) =>
      useExportLabelPrintListToCSV(items, props.filename);
  }
  else if(props.type === "lineItems") {
    return (items: OrderLineItem[]) => 
      useExportListToCSV(items, shoesVariationLayout, props.filename)
  }

  throw new Error("not a valid type");
});

function confirmAction() {
  const models = getModels();

  action.value(models);

  closeDialog();
}

function getModels() {
  const vms = rowsToVm(selectedRows.value);
  const dtos = mapItemVmToDTOList(vms);
  return dtos.map(OrderItemMapperInstance.toModel);
}

function closeDialog() {
  emit("update:model-value", false);
  selectedRows.value = [];
}

function onDialogUpdate(value: boolean) {
  if(!value) closeDialog();
}

</script>