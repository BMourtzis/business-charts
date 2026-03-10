<template>
  <v-menu v-model="menuOpen">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item
        prepend-icon="mdi-file-delimited"
        :title="tCap('order.title.listCsv')"
        @click="openSelectLineItemsForCsvList"
      />
      <v-list-item
        prepend-icon="mdi-label-multiple"
        :title="tCap('order.title.labelCsv')"
        @click="openSelectLineItemsForCsvPrintList"
      />
      <v-list-item
        prepend-icon="mdi-invoice-export-outline"
        :title="tCap('order.title.exportInvoice')"
      />
      <v-list-item
        v-if="order.netAllocatedAmount === 0"
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
    :filename="selectLineItemsFilename"
    :items="[...order.items]"
    :type="selectLineItemsType"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { Order } from '@/domain/order/models/order';

import { useOrders } from '@/presentation/composables/order/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import ConfirmDeleteModal from '@/presentation/components/ConfirmDeleteModal.vue';
import SelectLineItemsModal from '@/presentation/components/orders/Modals/SelectLineItemsModal.vue';

const router = useRouter();
const { tCap } = useLocalizationHelpers();

const { deleteOrderCommmandHandler } = useOrders();

const props = defineProps<{
  order: Order
}>();

const menuOpen = ref(false);
const deleteDialogOpen = ref(false);

const selectLineItemsOpen = ref(false);
const selectLineItemsType = ref<"lineItems" | "labels">("lineItems");
const selectLineItemsFilename = ref(props.order.orderNumber);

function getOrderNumberName() {
  return `#${ props.order.orderNumber }`;
}

function deleteOrder() {
  router.back();
  deleteOrderCommmandHandler.handle({id: props.order.id});
}

function openSelectLineItemsForCsvPrintList() {
  selectLineItemsType.value = "labels";
  selectLineItemsOpen.value = true;
}

function openSelectLineItemsForCsvList() {
  selectLineItemsType.value = "lineItems";
  selectLineItemsOpen.value = true;
}

</script>