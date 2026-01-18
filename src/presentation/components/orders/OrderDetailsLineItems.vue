<template>
  <v-card>
    <v-card-title>
      <v-list-item>
        <template #title>
          <h3>{{ tCap('order.items') }}</h3>
        </template>
        <template #append>
          <v-chip size="small">{{ order.items.length }}</v-chip>
        </template>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <v-expansion-panels v-model="openPanels" multiple>
        <order-details-line-item-details 
          v-for="orderItem in order.items"
          :key="orderItem.id"
          :item="orderItem"
        />
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Order } from '@/domain/order/models/order';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { ref } from 'vue';
import OrderDetailsLineItemDetails from './OrderDetailsLineItemDetails.vue';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ order: Order }>();

const openPanels = ref<number[]>([]);

</script>

<style lang="css" scoped></style>