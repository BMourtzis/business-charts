<template>
  <v-row align="start" justify="space-between" dense>
    <v-col cols="5" class="d-flex" justify="start">
      <h1 class="mr-2">
        {{ getOrderNumberName() }}
      </h1>
      <status-chip :status="order.status" class="ml-2 mt-2" />
      <order-type-chip :type="order.type" class="ml-2 mt-2"/>
    </v-col>
    <v-col cols="4" class="d-flex flex-row justify-end">
      <order-details-header-status :order="order" />
    </v-col>

    <v-col cols="1" class="d-flex flex-row justify-end">
      <!-- <EditPartnerModal :partner="supplier" mini /> -->
      <order-details-header-menu :order="order" />
    </v-col>
  </v-row>
  <v-row align="start" justify="space-between" dense>
    <v-col cols="3" class="text-md-left">
      <div
        v-if="partner" 
        class="text-subtitle-1 text-grey-darken-1 order-details-line"
      >
        <strong>{{ tCap('partner.customer') }}</strong>:
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
      <span class="formatted-notes">{{ order.notes }}</span>
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
      <div v-if="order.depositAmount > 0">
        {{ tCap("order.deposit") }} <strong>{{ getAmount(order.depositAmount) }} </strong>
        · {{ tCap("order.remainingAmount") }} <strong>{{ getAmount(order.remainingAmount) }} </strong>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import StatusChip from "./StatusChip.vue";
import OrderTypeChip from "./OrderTypeChip.vue";

import { computed } from 'vue';

import { Order } from '@/domain/order/models/order';

import { getPartnerDetails } from '@/presentation/composables/partner/usePartnerDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { getAmount, getDate } from "@/presentation/composables/useUtils";
import OrderDetailsHeaderMenu from "./OrderDetailsHeaderMenu.vue";
import OrderDetailsHeaderStatus from "./OrderDetailsHeaderStatus.vue";

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ order: Order }>();

const partner = computed(() => getPartnerDetails(props.order.partnerId));

function getOrderNumberName() {
  return `#${ props.order.orderNumber }`;
}
</script>

<style lang="css" scoped>
  .left-block {
    text-align: left;
  }

  .order-details-line {
    min-height: 32px;
  }

  .formatted-notes {
    white-space: pre-wrap;
  }
</style>