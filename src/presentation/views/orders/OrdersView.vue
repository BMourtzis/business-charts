<template>
  <v-card class="mb-3">
    <v-card-text>
      <v-row dense>
        <v-col cols="3">
          <v-combobox
            v-model="selectedStatuses"
            :items="statuses"
            item-title="title"
            item-value="value"
            :return-object="false"
            placeholder="default filters"
            chips
            closable-chips
            multiple
            density="compact"
          >
            <template #chip="{ props, item }">
              <StatusChip v-bind="props" :status="item.value" />
            </template>
          </v-combobox>
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
import OrderList from '@/presentation/components/orders/OrderList.vue';
import AddOrderModal from "@/presentation/components/orders/AddOrderModal.vue";

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { ref } from 'vue';
import { OrderStatus } from '@/domain/order/orderTypes';
import StatusChip from '@/presentation/components/orders/StatusChip.vue';
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

const selectedStatuses = ref([]);
</script>

<style scoped></style>