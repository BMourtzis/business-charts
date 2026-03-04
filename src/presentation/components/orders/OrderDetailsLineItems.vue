<template>
  <v-card
    :title="tCap('order.items', 2)"
  >
    <template #append>
              <EditOrderLinesModal 
          v-if="order.status === OrderStatus.Draft"
          :order="order" 
          mini 
        />
    </template>
    <v-card-text>
      <display-table 
        :tableRows="rows"
        :table-columns="shoesVariationLayout"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import EditOrderLinesModal from '@/presentation/components/orders/EditOrderLinesModal.vue';
import DisplayTable from '../editableTable/DisplayTable.vue';

import { computed } from 'vue';

import { Order } from '@/domain/order/models/order';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { shoesVariationLayout } from '@/presentation/composables/order/useProductVariation';
import { useVariationTableMapper } from '@/presentation/composables/editableTable/useVariationTableMapper';
import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';
import { OrderStatus } from '@/domain/order/orderTypes';

const { tCap } = useLocalizationHelpers();

const { vmToRows } = useVariationTableMapper(shoesVariationLayout);

const props = defineProps<{ order: Order }>();

const rows = computed(() => {
  const lineItems = mapOrderLineItemsToVM([...props.order.items]);
  return vmToRows(lineItems);
});

</script>

<style lang="css" scoped></style>