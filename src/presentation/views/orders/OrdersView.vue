<template>
  <v-card class="mb-3">
    <v-card-text>
      <v-row dense>
        <v-col cols="3">
          <PartnerFilter v-model="selectedPartners" />
        </v-col>
        <v-col cols="3">
          <StatusFilter v-model="selectedStatuses" />
        </v-col>
        <v-col cols="3">
          <TypeFilter v-model="selectedType" />
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
      <OrderList 
        :orders="allOrders"
        :status-filter="selectedStatuses"
        :partner-filter="selectedPartners"
        :type-filter="selectedType"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import OrderList from '@/presentation/components/orders/List/OrderList.vue';
import AddOrderModal from "@/presentation/components/orders/Modals/AddOrderModal.vue";
import StatusFilter from '@/presentation/components/orders/List/StatusFilter.vue';
import PartnerFilter from '@/presentation/components/orders/List/PartnerFilter.vue';

import { useOrders } from '@/presentation/composables/order/useOrders';

import { ref } from 'vue';
import { OrderStatus, OrderType } from '@/domain/order/orderTypes';
import TypeFilter from '@/presentation/components/orders/List/TypeFilter.vue';

const { allOrders } = useOrders();

const selectedStatuses = ref<OrderStatus[]>([]);
const selectedPartners = ref<string[]>([]);
const selectedType = ref<OrderType>();

</script>

<style scoped></style>