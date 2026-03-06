<template>
  <v-row>
    <v-col cols="1">
      <!-- <v-btn
        color="red"
        icon="mdi-trash-can"
        variant="text"
        density="compact"
      /> -->
      <v-tooltip 
        :text="tCap('order.listCsvTitle')"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-btn
            :disabled="selected.length === 0"
            v-bind="props"
            color="green"
            icon="mdi-file-delimited"
            variant="text"
            density="compact"
            @click="openSelectLineItemsForCsvList"
          />
        </template>
      </v-tooltip>
      <v-tooltip 
        :text="tCap('order.labelCsvTitle')"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-btn
            :disabled="selected.length === 0"
            v-bind="props"
            color="orange"
            icon="mdi-label-multiple"
            variant="text"
            density="compact"
            @click="openSelectLineItemsForCsvPrintList"
          />
        </template>
      </v-tooltip>
      
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
      <EditOrderModal
        :order="row.order"
        mini
      />
      <EditOrderLinesModal 
        v-if="row.status === OrderStatus.Draft"
        :order="row.order" 
        mini 
      />
      <ConfirmDeleteModal
        v-if="row.order.netAllocatedAmount === 0"
        :name="row.orderNumber"
        :action-fn="() => deleteOrderCommmandHandler.handle({id: row.id})"
        :mini="true"
      />
    </template>
  </v-data-table>
    <select-line-items-modal 
      v-model="selectLineItemsOpen"
      :filename="selectLineItemsFilename"
      :items="selectedLineItems"
      :type="selectLineItemsType"
    />
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import StatusChip from "@/presentation/components/orders/StatusChip.vue";
import OrderTypeChip from "@/presentation/components/orders/OrderTypeChip.vue";
import PartnerBtn from "@/presentation/components/partner/PartnerBtn.vue";
import SelectLineItemsModal from '@/presentation/components/orders/Modals/SelectLineItemsModal.vue';
import EditOrderLinesModal from "@/presentation/components/orders/Modals/EditOrderLinesModal.vue";
import EditOrderModal from "@/presentation/components/orders/Modals/EditOrderModal.vue";

import { computed, ref, toRef } from 'vue';
import { useRouter } from 'vue-router';

import { Order } from '@/domain/order/models/order';
import { Partner } from '@/domain/partner/models/partner';

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useOrderTable } from '@/presentation/composables/order/useOrdersTable';
import type { VDataTableRow } from '@/presentation/types/types';
import { OrderStatus, OrderType } from "@/domain/order/orderTypes";
import { useLocalizationHelpers } from "@/presentation/composables/useLocalization";

const router = useRouter();

const {
  tCap
} = useLocalizationHelpers();

const selected = ref<string[]>([]);

const selectLineItemsOpen = ref(false);
const selectLineItemsType = ref<"lineItems" | "labels">("lineItems");
const selectLineItemsFilename = ref("multiple-orders");

const selectedLineItems = computed(() => {
  if(!props.orders) return [];

  const filteredOrders = props.orders.filter(o => selected.value.includes(o.id));

  return filteredOrders.flatMap(o => o.items);
});

const props = defineProps<{
  orders: Order[] | undefined;
  statusFilter: OrderStatus[];
  partnerFilter: string[];
  typeFilter?: OrderType;
}>();

const { deleteOrderCommmandHandler } = useOrders();

const filteredOrders = computed(() => {
  if(!props.orders || props.orders.length === 0) return [];
  let filtered = props.orders;

  console.log(props.partnerFilter);

  if(props.statusFilter.length > 0) {
    filtered = filtered.filter(o => props.statusFilter.includes(o.status));
  } else {
    filtered = filtered.filter(o => defaultStatusFilter.includes(o.status));
  }

  if(props.partnerFilter.length > 0) {
    filtered = filtered.filter(o => props.partnerFilter.includes(o.partnerId));
  }

  if(props.typeFilter) {
    filtered = filtered.filter(o => o.type === props.typeFilter);
  }
  
  return filtered;
});

const defaultStatusFilter = [
  OrderStatus.Draft, 
  OrderStatus.Approved, 
  OrderStatus.Processing, 
  OrderStatus.ReadyForShipment, 
  OrderStatus.Shipped
];

const { data, headers } = useOrderTable(filteredOrders);

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/order/${row.item.id}`);
}

function openSelectLineItemsForCsvPrintList() {
  selectLineItemsType.value = "labels";
  selectLineItemsOpen.value = true;
}

function openSelectLineItemsForCsvList() {
  selectLineItemsType.value = "lineItems";
  selectLineItemsOpen.value = true;
}

</script>

<style scoped></style>