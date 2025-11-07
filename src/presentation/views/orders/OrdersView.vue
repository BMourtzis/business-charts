<template>
  <v-container>
    <h1>{{ tCap('partner.supplier', 2) }}</h1>
    <AddOrderModal />
    <OrderList :orders="allOrders " />
  </v-container>
</template>

<script setup lang="ts">
import OrderList from '@/presentation/components/orders/OrderList.vue';
import AddOrderModal from "@/presentation/components/orders/AddOrderModal.vue";

import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { allOrders } = useOrders();

const { tCap } = useLocalizationHelpers();
</script>

<style scoped></style>