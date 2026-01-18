<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
    hide-default-footer
    density="comfortable"
    hover
    @click:row="rowClick"
  >
    <template #[`item.partner`]="{ item: row }">
      <v-btn 
        v-if="row.partner !== undefined"
        variant="text" 
        @click.stop="() => router.push(`/partner/${row.partner?.id}`)"
      >
        {{ getPartnerName(row.partner) }}
      </v-btn>
    </template>
    <template #[`item.status`]="{ item: row }">
      <status-chip :status="row.status" />
    </template>
    <template #[`item.direction`]="{ item: row }">
      <direction-chip :direction="row.direction" />
    </template>
    <template #[`item.actions`]="{ item: row }">
      <ConfirmDeleteModal
        :name="getOrderName(row)"
        :action-fn="() => deleteOrderCommmandHandler.handle({id: row.id})"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";

import { toRef } from 'vue';
import { useRouter } from 'vue-router';

import { Order } from '@/domain/order/models/order';
import { Partner } from '@/domain/partner/models/partner';

import { useOrders } from '@/presentation/composables/useOrders';
import { useOrderTable } from '@/presentation/composables/order/useOrdersTable';
import type { OrderTableRow, } from '@/presentation/composables/order/useOrdersTable';
import type { VDataTableRow } from '@/presentation/types/types';
import StatusChip from "./StatusChip.vue";
import DirectionChip from "./DirectionChip.vue";

const router = useRouter();

const props = defineProps < {
  orders: Order[] | undefined;
} > ();

const { deleteOrderCommmandHandler } = useOrders();

const { data, headers } = useOrderTable(toRef(props, "orders"));

function getOrderName(row: OrderTableRow): string {
  if(row.partner) {
    return `παραγγελία για ${getPartnerName(row.partner)}`;
  }
  
  return row.id;
}

function getPartnerName(partner: Partner) {
  return partner.businessName
            ? `${partner.businessName} (${partner.contactName})`
            : partner.contactName;
}

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/order/${row.item.id}`);
}

</script>

<style scoped></style>