<template>
    <v-container class="py-6">
    <v-card 
      class="pa-4"
    >
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h6">
          {{ tCap('order.order', 2) }}
        </h2>
        <AddOrderModal />
        <!-- Filters (optional) -->
        <!-- <div class="d-flex gap-3 mb-4">
          <v-text-field
            v-model="search"
            density="compact"
            prepend-icon="mdi-magnify"
            placeholder="Search partners..."
            variant="solo-filled"
            hide-details
          />
        </div> -->
      </div>
      <OrderList :orders="allOrders" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import OrderList from '@/presentation/components/orders/OrderList.vue';
import AddOrderModal from "@/presentation/components/orders/AddOrderModal.vue";

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { allOrders } = useOrders();

const { tCap } = useLocalizationHelpers();
</script>

<style scoped></style>