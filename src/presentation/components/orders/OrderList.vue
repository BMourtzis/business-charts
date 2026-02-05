<template>
  <v-row v-if="selected.length > 0">
    <v-col cols="1">
      <!-- <v-btn
        color="red"
        icon="mdi-trash-can"
        variant="text"
        density="compact"
      /> -->
      <v-btn
        color="grey"
        icon="mdi-file-delimited"
        variant="text"
        density="compact"
        @click="openSelectLineItemsForCsvList"
      />
      <v-btn
        color="grey"
        icon="mdi-label-multiple"
        variant="text"
        density="compact"
        @click="openSelectLineItemsForCsvPrintList"
      />
    </v-col>
    
  </v-row>
  <v-data-table
    v-model="selected"
    show-select
    :headers="headers"
    :items="data"
    class="text-start"
    hide-default-footer
    density="comfortable"
    :items-per-page="-1"
    hover
    @click:row="rowClick"
  >
    <template #[`item.partner`]="{ item: row }">
      <partner-btn :partner="row.partner" />
    </template>
    <template #[`item.status`]="{ item: row }">
      <status-chip :status="row.status" />
    </template>
    <template #[`item.direction`]="{ item: row }">
      <order-type-chip :type="row.type" />
    </template>
    <template #[`item.actions`]="{ item: row }">
      <ConfirmDeleteModal
        v-if="row.status === OrderStatus.Draft"
        :name="row.orderNumber"
        :action-fn="() => deleteOrderCommmandHandler.handle({id: row.id})"
        :mini="true"
      />
    </template>
  </v-data-table>
    <select-line-items-modal 
      v-model="selectLineItemsOpen"
      :title="selectLineItemsTitle"
      :items="selectedLineItems"
      :action="selectLineItemsAction"
    />
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import StatusChip from "./StatusChip.vue";
import OrderTypeChip from "./OrderTypeChip.vue";
import PartnerBtn from "../partner/PartnerBtn.vue";
import SelectLineItemsModal from './SelectLineItemsModal.vue';

import { computed, ref, toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

import { Order } from '@/domain/order/models/order';
import { Partner } from '@/domain/partner/models/partner';

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useOrderTable } from '@/presentation/composables/order/useOrdersTable';
import type { VDataTableRow } from '@/presentation/types/types';
import { OrderStatus } from "@/domain/order/orderTypes";
import type { OrderLineItem } from "@/domain/order/models/orderLineItem";
import { useLocalizationHelpers } from "@/presentation/composables/useLocalization";
import { useExportLabelPrintListToCSV, useExportListToCSV } from "@/presentation/composables/order/useCSVExport";
import { shoesVariationLayout } from "@/presentation/composables/order/useProductVariation";

const router = useRouter();
const { tCap } = useLocalizationHelpers();

const selected = ref<string[]>([]);

const selectLineItemsOpen = ref(false);
const selectLineItemsAction = ref<(items: OrderLineItem[]) => void>(() => {});
const selectLineItemsTitle = ref("");

const selectedLineItems = computed(() => {
  if(!props.orders) return [];

  const filteredOrders = props.orders.filter(o => selected.value.includes(o.id));

  return filteredOrders.flatMap(o => o.items);
});

const props = defineProps < {
  orders: Order[] | undefined;
} > ();

const { deleteOrderCommmandHandler } = useOrders();

const { data, headers } = useOrderTable(toRef(props, "orders"));

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/order/${row.item.id}`);
}

function openSelectLineItemsForCsvPrintList() {
  selectLineItemsAction.value = exportToCSVPrinList;
  selectLineItemsTitle.value = tCap('order.labelCsvTitle');
  selectLineItemsOpen.value = true;
}

function openSelectLineItemsForCsvList() {
  selectLineItemsAction.value = exportToCsv;
  selectLineItemsTitle.value = tCap('order.listCsvTitle');
  selectLineItemsOpen.value = true;
}

function exportToCSVPrinList(items: OrderLineItem[]) {
  useExportLabelPrintListToCSV(items, 'multiple-orders');
}

function exportToCsv(items: OrderLineItem[]) {
  useExportListToCSV(items, shoesVariationLayout, 'multiple-orders')
}

</script>

<style scoped></style>