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
      <display-table 
        :tableRows="rows"
        :table-columns="shoesVariationLayout"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import DisplayTable from '../editableTable/DisplayTable.vue';

import { computed } from 'vue';

import { Order } from '@/domain/order/models/order';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { shoesVariationLayout } from '@/presentation/composables/order/useProductVariation';
import { useVariationTableMapper } from '@/presentation/composables/editableTable/useVariationTableMapper';
import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';

const { tCap } = useLocalizationHelpers();

const { vmToRows } = useVariationTableMapper(shoesVariationLayout);

const props = defineProps<{ order: Order }>();

const rows = computed(() => {
  const lineItems = mapOrderLineItemsToVM([...props.order.items]);
  return vmToRows(lineItems);
});

</script>

<style lang="css" scoped></style>