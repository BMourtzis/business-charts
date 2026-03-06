<template>
  <v-card class="mb-3">
    <v-card-text>
      <v-row dense>
        <v-col cols="3">
          <StatusFilter v-model="selectedStatuses" />
        </v-col>
        <v-spacer/>
        <v-col cols="1">
          <AddOrderModal mini />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-text>
      <OrderList :orders="allOrders" :status-filter="selectedStatuses" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import OrderList from '@/presentation/components/orders/List/OrderList.vue';
import AddOrderModal from "@/presentation/components/orders/Modals/AddOrderModal.vue";
import StatusFilter from '@/presentation/components/orders/List/StatusFilter.vue';

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { ref } from 'vue';
import { OrderStatus } from '@/domain/order/orderTypes';
import { getStatusString } from '@/presentation/composables/order/useOrderDetails';

const { allOrders } = useOrders();

const { tCap } = useLocalizationHelpers();

const statuses = [
  { value: OrderStatus.Draft, title: getStatusString(OrderStatus.Draft, tCap)},
  { value: OrderStatus.Approved, title: getStatusString(OrderStatus.Approved, tCap)}, 
  { value: OrderStatus.Processing, title: getStatusString(OrderStatus.Processing, tCap)},
  { value: OrderStatus.ReadyForShipment, title: getStatusString(OrderStatus.ReadyForShipment, tCap)},
  { value: OrderStatus.Shipped, title: getStatusString(OrderStatus.Shipped, tCap)},
  { value: OrderStatus.Cancelled, title: getStatusString(OrderStatus.Cancelled, tCap)},
  { value: OrderStatus.Completed, title: getStatusString(OrderStatus.Completed, tCap)},
];

const selectedStatuses = ref<OrderStatus[]>([]);
</script>

<style scoped></style>