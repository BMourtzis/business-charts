<template>
  <v-row align="start" justify="space-between" dense>
    <v-col cols="5" class="d-flex" justify="start">
      <h1 class="text-h4 font-weight-bold mr-2">
        {{ getOrderNumberName() }}
      </h1>
      <status-chip :status="order.status" class="ml-2" />
      <direction-chip :direction="order.direction" class="ml-2"/>
    </v-col>
    <v-col cols="4" class="d-flex flex-row justify-end">
      <!-- TODO: move to separate component -->
      <!-- <div class="d-flex button-with-dropdown">
        <v-btn 
          color="primary" 
          class="left-btn"
          variant="flat"
          size="small"
        >
          Main Action
        </v-btn>

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn 
              color="primary" 
              v-bind="props" 
              class="right-btn"
              variant="flat"
              size="small"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>Option 1</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Option 2</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Option 3</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn color="grey" variant="flat" size="small">Complete</v-btn>
      <v-btn color="red" variant="flat" size="small">Cancel</v-btn> -->
      
    </v-col>

    <v-col cols="1" class="d-flex flex-row justify-end">
      <!-- <EditPartnerModal :partner="supplier" mini /> -->
      <ConfirmDeleteModal
        :name="getOrderNumberName()"
        :action-fn="() => deleteOrder()"
        mini
      />
      <!-- TODO: move to separate componet -->
      <!-- <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item @click="console.log('clicked')">
            <template v-slot:prepend>
              <v-icon color="red" icon="mdi-trash-can"></v-icon>
            </template>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Option 2</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Option 3</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

    </v-col>
  </v-row>
  <v-row align="start" justify="space-between" dense>
    <v-col cols="3" class="text-md-left">
      <div
        v-if="partner" 
        class="text-subtitle-1 text-grey-darken-1 order-details-line"
      >
        <strong v-if="order.direction === OrderDirection.Credit">{{ tCap('partner.customer') }}</strong>
        <strong v-if="order.direction === OrderDirection.Debit">{{ tCap('partner.customer') }}</strong>:
        <v-btn 
          variant="text" 
          :to="`/partner/${partner.id}`"
        >
          {{ partner.businessName }}
        </v-btn>
      </div>
      <div 
        v-if="order.dueDate"
        class="text-subtitle-1 text-grey-darken-1 order-details-line"
      >
        <strong>{{ tCap("order.dueDate") }}</strong>: {{ getDate(order.dueDate) }}
      </div>
      <div 
        class="text-subtitle-1 text-grey-darken-1 font-weight-bold order-details-line">
        {{ tCap("order.notes") }}:
      </div>
      <span>{{ order.notes }}</span>
    </v-col>

    <v-col cols="4" md="5" class="text-md-right">
      <span> {{ tCap("order.total") }}</span>
      <div class="text-h5 font-weight-bold">{{ getAmount(order.totalAmount) }}</div>
      <div>
        {{ tCap("order.orderSum") }} <strong>{{ getAmount(order.subtotal) }} </strong>
        · {{ tCap("order.vatRate") }} <strong>{{ getAmount(order.taxAmount) }} </strong>
        <span v-if="order.discountAmount > 0">
          · {{ tCap("order.discount") }} <strong>{{ getAmount(order.discountAmount) }} </strong>
        </span>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import StatusChip from "./StatusChip.vue";
import DirectionChip from "./DirectionChip.vue";

import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { Order } from '@/domain/order/models/order';

import { getDate, getAmount } from '@/presentation/composables/order/useOrderDetails';
import { getPartnerDetails } from '@/presentation/composables/partner/usePartnerDetails';
import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { OrderDirection } from "@/domain/order/orderTypes";

const { tCap } = useLocalizationHelpers();
const router = useRouter();
const { deleteOrderCommmandHandler } = useOrders();

const props = defineProps<{ order: Order }>();

const partner = computed(() => getPartnerDetails(props.order.partnerId));

function getOrderNumberName() {
  return `${tCap('order.order')} #${ props.order.orderNumber }`;
}


function deleteOrder() {
  router.back();
  deleteOrderCommmandHandler.handle({id: props.order.id});
}

</script>

<style lang="css" scoped>
  .left-block {
    text-align: left;
  }

  .order-details-line {
    min-height: 32px;
  }

  .button-with-dropdown .left-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .button-with-dropdown .right-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 2px;
  }
</style>