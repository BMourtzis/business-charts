<template>
  <v-data-table
    :headers="headers"
    :items="props.orders"
  >
    <!-- Custom column slot -->
    <template #[`item.actions`]="{ item }">
      <v-btn
        color="primary"
        variant="text"
        density="compact"
        icon="mdi-account-details"
        :to="`/partner/${item.id}`"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { Order } from '@/domain/order/models/order';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps < {
  orders: Order[];
} > ();

const headers = [
  { title: tCap('partner.businessName'), key: "partnerId" },
  { title: tCap('order.createdDate'), key: "createdDate" },
  { title: tCap('order.dueDate'), key: "dueDate" },
  { title: tCap('order.status'), key: "status" },
  { title: tCap('order.direction'), key: "direction" },
  { title: tCap('order.total'), key: "totalAmount" },  
  { title: tCap('common.action', 2), key: "actions"}
]
</script>

<style scoped></style>