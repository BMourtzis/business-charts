<template>
  <v-chip 
    variant="outlined" 
  >
    {{ getMovementReasonString(reason, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { MoneyMovementReason } from '@/domain/payment/MoneyMovementTypes';

import { getMovementReasonString } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ reason: MoneyMovementReason }>();
</script>
