<template>
  <div v-if="model">
  <!-- <v-container fluid> -->
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
        md="3"
        xl="2"
      >
        <order-details-timeline
          :order="model"
        />
      </v-col>
      <v-spacer/>
      <v-col 
        cols="8" 
        md="9"
        xl="6"
      >
        <order-details-money-allocations
          :allocations="[...model.allocations]"
          :order-id="id"
        />
      </v-col>
    </v-row>
  <!-- </v-container> -->
  </div>
</template>

<script setup lang="ts">
import OrderDetailsHeader from '@/presentation/components/orders/Details/OrderDetailsHeader.vue';
import OrderDetailsLineItems from '@/presentation/components/orders/Details/OrderDetailsLineItems.vue';
import OrderDetailsTimeline from '@/presentation/components/orders/Details/OrderDetailsTimeline.vue';
import OrderDetailsMoneyAllocations from '@/presentation/components/orders/Details/OrderDetailsMoneyAllocations.vue';

import { useOrderDetails } from '@/presentation/composables/order/useOrderDetails';

const props = defineProps<{ id: string }>();

const { model } = useOrderDetails(props.id);
</script>

<style scoped></style>