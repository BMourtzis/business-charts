<template>
  <v-chip 
    variant="outlined" 
  >
    {{ getOrderTypeString(type, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { OrderType } from '@/domain/order/orderTypes';

import { getOrderTypeString } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ type: OrderType }>();
</script>

<style lang="css" scoped></style>