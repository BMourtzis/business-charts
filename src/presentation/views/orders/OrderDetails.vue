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
        md="8"
        xl="10"
      >
        <order-details-line-items
          :order="model"
        />
      </v-col>
      <v-col 
        cols="12" 
        md="4"
        xl="2"
      >
        <order-details-timeline
          :order="model"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import OrderDetailsHeader from './OrderDetailsHeader.vue';
import OrderDetailsLineItems from './OrderDetailsLineItems.vue';
import OrderDetailsTimeline from './OrderDetailsTimeline.vue';

import { useOrderDetails } from '@/presentation/composables/order/useOrderDetails';

const props = defineProps<{ id: string }>();

const { model } = useOrderDetails(props.id);
</script>

<style scoped></style>