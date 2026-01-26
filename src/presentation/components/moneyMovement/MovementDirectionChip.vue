<template>
  <v-chip 
    :color="getMoneyDirectionColour(direction)"
    :prepend-icon="getMoneyDirectionIcon(direction)"
  >
    {{ getMoneyDirectionString(direction, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { MoneyDirection } from '@/domain/payment/MoneyMovementTypes';

import { getMoneyDirectionString, getMoneyDirectionIcon, getMoneyDirectionColour } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ direction: MoneyDirection }>();
</script>
