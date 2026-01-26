<template>
  <v-chip 
    variant="outlined" 
    :color="getMoneyDirectionColour(direction)"
    :prepend-icon="getMoneyDirectionIcon(direction)"
  >
    {{ getMovementReasonString(reason, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { MoneyDirection, MoneyMovementReason } from '@/domain/payment/MoneyMovementTypes';

import { getMoneyDirectionColour, getMovementReasonString, getMoneyDirectionIcon } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  reason: MoneyMovementReason,
  direction: MoneyDirection
}>();
</script>
