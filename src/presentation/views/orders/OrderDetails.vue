<template>
  <v-container v-if="model">
    <order-details-header
      :order="model"
    />
    <v-row
      class="mt-6"
      align="start"
    >
      <v-col 
        cols="12" 
      >
        <order-details-line-items
          :order="model"
        />
      </v-col>
      <v-col 
        cols="6" 
        md="4"
        xl="2"
      >
        <order-details-timeline
          :order="model"
        />
      </v-col>
      <v-spacer/>
      <v-col 
        cols="6" 
        md="6"
        xl="8"
      >
        <order-details-money-allocations
          :allocations="[...model.allocations]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import OrderDetailsHeader from '@/presentation/components/orders/OrderDetailsHeader.vue';
import OrderDetailsLineItems from '@/presentation/components/orders/OrderDetailsLineItems.vue';
import OrderDetailsTimeline from '@/presentation/components/orders/OrderDetailsTimeline.vue';
import OrderDetailsMoneyAllocations from '@/presentation/components/orders/OrderDetailsMoneyAllocations.vue';

import { useOrderDetails } from '@/presentation/composables/order/useOrderDetails';

const props = defineProps<{ id: string }>();

const { model } = useOrderDetails(props.id);
</script>

<style scoped></style>