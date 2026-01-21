<template>
  <display-table 
    :tableRows="rows"
    :table-columns="shoesVariationLayout"
  />
</template>

<script setup lang="ts">
import DisplayTable from '../editableTable/renderers/DisplayTable.vue';

import type { OrderLineItem } from '@/domain/order/models/orderLineItem';

import { useVariationTableMapper } from '@/presentation/composables/editableTable/useVariationTableMapper';

import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';
import { computed } from 'vue';
import { shoesVariationLayout } from '@/presentation/composables/order/useProductVariation';

const { vmToRows } = useVariationTableMapper(shoesVariationLayout);

const props = defineProps<{ items: OrderLineItem[] }>();

const rows = computed(() => {
  const lineItems = mapOrderLineItemsToVM(props.items);
  return vmToRows(lineItems);
});

</script>

<style lang="css" scoped></style>