<template>
  <v-card class="mb-5">
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
        <!-- <v-spacer/>
        <v-col cols="1">
          <AddOrderModal mini />
        </v-col> -->
      </v-row>
    </v-card-text>
  </v-card>
  <v-card class="mb-2">
    <v-card-text>
      <v-row>
    <v-col cols="1">
      <!-- <v-btn
        color="red"
        icon="mdi-trash-can"
        variant="text"
        density="compact"
      /> -->
      <v-tooltip 
        :text="tCap('order.listCsvTitle')"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-btn
            :disabled="selected.length === 0"
            v-bind="props"
            color="green"
            icon="mdi-file-delimited"
            variant="text"
            density="compact"
            @click=""
          />
        </template>
      </v-tooltip>
      <v-tooltip 
        :text="tCap('order.labelCsvTitle')"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-btn
            :disabled="selected.length === 0"
            v-bind="props"
            color="orange"
            icon="mdi-label-multiple"
            variant="text"
            density="compact"
            @click=""
          />
        </template>
      </v-tooltip>
    </v-col>
    <v-spacer />
      <v-col cols="3">
        <AddOrderModal />
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
import TypeFilter from '@/presentation/components/orders/List/TypeFilter.vue';

import { useOrders } from '@/presentation/composables/order/useOrders';

import { ref } from 'vue';
import { OrderStatus, OrderType } from '@/domain/order/orderTypes';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { allOrders } = useOrders();

const { tCap } = useLocalizationHelpers();


const selected = ref<string[]>([]);

const selectedStatuses = ref<OrderStatus[]>([]);
const selectedPartners = ref<string[]>([]);
const selectedType = ref<OrderType>();

</script>

<style scoped></style>