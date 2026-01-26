<template>
  <v-chip 
    variant="outlined" 
    color="indigo"
    :prepend-icon="getPaymentMethodIcon(method)"
  >
    {{ getPaymentMethodString(method, tCap) }}
  </v-chip>
</template>

<script setup lang="ts">
import type { PaymentMethod } from '@/domain/payment/MoneyMovementTypes';

import { getPaymentMethodString, getPaymentMethodIcon } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ method: PaymentMethod }>();
</script>
