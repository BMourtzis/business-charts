<template>
  <v-chip 
    :color="statusColor(status)" 
  >
    {{ getStatusString(status, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { OrderStatus } from '@/domain/order/orderTypes';

import { statusColor, getStatusString } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ status: OrderStatus }>();
</script>

<style lang="css" scoped></style>