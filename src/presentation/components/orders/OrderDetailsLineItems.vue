<template>
  <v-card>
    <v-card-title>
      <v-list-item>
        <template #title>
          <h3>{{ tCap('order.items', 2) }}</h3>
        </template>
        <template #append>
          <v-chip size="small">{{ order.items.length }}</v-chip>
        </template>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <order-details-line-item-details 
        :items="[...order.items]"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Order } from '@/domain/order/models/order';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import OrderDetailsLineItemDetails from './OrderDetailsLineItemDetails.vue';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ order: Order }>();

</script>

<style lang="css" scoped></style>