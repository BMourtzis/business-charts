<template>
  <v-menu v-model="menuOpen">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item
        prepend-icon="mdi-file-delimited"
        :title="tCap('order.labelCsvTitle')"
        @click="selectLineItemsOpen = true"
      />
      <v-list-item
        prepend-icon="mdi-invoice-export-outline"
        :title="tCap('order.exportInvoiceTitle')"
      />
      <v-list-item
        v-if="order.status === OrderStatus.Draft"
        prepend-icon="mdi-trash-can"
        :title="tCap('common.delete')"
        class="text-red"
        @click="() => { menuOpen = false; deleteDialogOpen = true;}"
      />
    </v-list>
  </v-menu>

  <confirm-delete-modal
    v-model="deleteDialogOpen"
    :name="getOrderNumberName()"
    :action-fn="() => deleteOrder()"
    hide
  />

  <select-line-items-modal 
    v-model="selectLineItemsOpen"
    :order="order"
    :action="exportToCSVPrinList"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { Order } from '@/domain/order/models/order';

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import ConfirmDeleteModal from '../ConfirmDeleteModal.vue';
import { useExportLabelPrintListToCSV } from '@/presentation/composables/order/useCSVExport';
import { OrderStatus } from '@/domain/order/orderTypes';
import SelectLineItemsModal from './SelectLineItemsModal.vue';
import type { OrderLineItem } from '@/domain/order/models/orderLineItem';

const router = useRouter();
const { tCap } = useLocalizationHelpers();

const { deleteOrderCommmandHandler } = useOrders();

const props = defineProps<{
  order: Order
}>();

const menuOpen = ref(false);
const deleteDialogOpen = ref(false);
const selectLineItemsOpen = ref(false);

function getOrderNumberName() {
  return `#${ props.order.orderNumber }`;
}

function exportToCSVPrinList(items: OrderLineItem[]) {
  useExportLabelPrintListToCSV(items, props.order.orderNumber);
}

function deleteOrder() {
  router.back();
  deleteOrderCommmandHandler.handle({id: props.order.id});
}


</script>