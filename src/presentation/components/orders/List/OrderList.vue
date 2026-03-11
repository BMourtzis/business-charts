<template>
  <v-data-table
    v-model="selected"
    v-model:sort-by="sortBy"
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
        :order="row.order" 
        mini 
      />
      <ConfirmDeleteModal
        v-if="row.order.netAllocatedAmount === 0"
        :name="row.orderNumber"
        :action-fn="() => deleteOrderCommmandHandler.handle({id: row.id})"
        mini
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import StatusChip from "@/presentation/components/orders/StatusChip.vue";
import OrderTypeChip from "@/presentation/components/orders/OrderTypeChip.vue";
import PartnerBtn from "@/presentation/components/partner/PartnerBtn.vue";
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
import type { SortItem } from "vuetify/lib/components/VDataTable/composables/sort";

const router = useRouter();

const props = defineProps<{
  orders: Order[] | undefined;
  selected: string[];
  statusFilter: OrderStatus[];
  partnerFilter: string[];
  typeFilter?: OrderType;
}>();

const emits = defineEmits<{
  (e: 'update:selected', value: string[]): void
}>();

const sortBy = ref(
  [{ key: 'status', order: 'asc' }] as SortItem[]
);

const selected = computed({
  get: () => props.selected,
  set: (v: string[]) => emits('update:selected', v)
});

const { deleteOrderCommmandHandler } = useOrders();
const filters = computed(() => {
  return {
    status: props.statusFilter,
    partner: props.partnerFilter,
    type: props.typeFilter
  };
});

const { data, headers } = useOrderTable(
  toRef(props, "orders"),
  filters
);

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/order/${row.item.id}`);
}

</script>

<style scoped></style>