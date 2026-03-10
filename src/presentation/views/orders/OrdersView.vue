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
        :text="tCap('order.title.listCsv')"
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
            @click="openSelectLineItemsForCsvList"
          />
        </template>
      </v-tooltip>
      <v-tooltip 
        :text="tCap('order.title.labelCsv')"
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
            @click="openSelectLineItemsForCsvPrintList"
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
        :selected="selected"
        :status-filter="selectedStatuses"
        :partner-filter="selectedPartners"
        :type-filter="selectedType"
        @update:selected="updateSelected"
      />
    </v-card-text>
  </v-card>
  <select-line-items-modal 
    v-model="selectLineItemsOpen"
    :filename="selectLineItemsFilename"
    :items="selectedLineItems"
    :type="selectLineItemsType"
  />
</template>

<script setup lang="ts">
import OrderList from '@/presentation/components/orders/List/OrderList.vue';
import AddOrderModal from "@/presentation/components/orders/Modals/AddOrderModal.vue";
import StatusFilter from '@/presentation/components/orders/List/StatusFilter.vue';
import PartnerFilter from '@/presentation/components/orders/List/PartnerFilter.vue';
import TypeFilter from '@/presentation/components/orders/List/TypeFilter.vue';
import SelectLineItemsModal from '@/presentation/components/orders/Modals/SelectLineItemsModal.vue';

import { useOrders } from '@/presentation/composables/order/useOrders';

import { computed, ref } from 'vue';
import { OrderStatus, OrderType } from '@/domain/order/orderTypes';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { allOrders } = useOrders();

const { tCap } = useLocalizationHelpers();

//Bulk actions
const selected = ref<string[]>([]);

function updateSelected(value: string[]) {
  selected.value = value;
}

const selectLineItemsOpen = ref(false);
const selectLineItemsType = ref<"lineItems" | "labels">("lineItems");
const selectLineItemsFilename = ref("multiple-orders");

const selectedLineItems = computed(() => {
  if(!allOrders || !allOrders.value) return [];

  const filteredOrders = allOrders.value.filter(o => selected.value.includes(o.id));

  return filteredOrders.flatMap(o => o.items);
});

function openSelectLineItemsForCsvPrintList() {
  selectLineItemsType.value = "labels";
  selectLineItemsOpen.value = true;
}

function openSelectLineItemsForCsvList() {
  selectLineItemsType.value = "lineItems";
  selectLineItemsOpen.value = true;
}

//Filters
const selectedStatuses = ref<OrderStatus[]>([]);
const selectedPartners = ref<string[]>([]);
const selectedType = ref<OrderType>();

</script>

<style scoped></style>