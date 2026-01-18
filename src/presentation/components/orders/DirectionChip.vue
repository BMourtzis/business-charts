<template>
  <v-chip 
    variant="outlined" 
    size="small"
  >
    {{ getDirectionString(direction, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { OrderDirection } from '@/domain/order/orderTypes';

import { getDirectionString } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ direction: OrderDirection }>();
</script>

<style lang="css" scoped></style>