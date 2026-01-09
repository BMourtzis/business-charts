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

// import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps < {
  orders: Order[];
} > ();

const headers = [
  { title: tCap('partner.businessName'), key: "partnerId" },
  { title: tCap('partner.contactName'), key: "createdDate" },
  { title: tCap('partner.vatNumber'), key: "sentDate" },
  { title: tCap('partner.vatNumber'), key: "status" },
  { title: tCap('partner.vatNumber'), key: "direction" },
  { title: tCap('partner.vatNumber'), key: "totalAmount" },  
  { title: tCap('common.action', 2), key: "actions"}
]
</script>

<style scoped></style>