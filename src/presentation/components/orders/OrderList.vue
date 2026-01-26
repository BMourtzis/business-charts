<template>
  <v-data-table
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
        :name="row.orderNumber"
        :action-fn="() => deleteOrderCommmandHandler.handle({id: row.id})"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import StatusChip from "./StatusChip.vue";
import OrderTypeChip from "./OrderTypeChip.vue";
import PartnerBtn from "../partner/PartnerBtn.vue";

import { toRef } from 'vue';
import { useRouter } from 'vue-router';

import { Order } from '@/domain/order/models/order';
import { Partner } from '@/domain/partner/models/partner';

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useOrderTable, type OrderTableRow } from '@/presentation/composables/order/useOrdersTable';
import type { VDataTableRow } from '@/presentation/types/types';

const router = useRouter();

const props = defineProps < {
  orders: Order[] | undefined;
} > ();

const { deleteOrderCommmandHandler } = useOrders();

const { data, headers } = useOrderTable(toRef(props, "orders"));

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/order/${row.item.id}`);
}

</script>

<style scoped></style>