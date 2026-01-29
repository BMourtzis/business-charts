<template>
    <v-row align="start" justify="space-between" dense>
    <v-col cols="5" class="d-flex" justify="start">
      <h1 class="mr-2">
        {{ getOrderNumberName() }}
      </h1>
      <movement-reason-chip 
        :reason="moneyMovement.reason" 
        :direction="moneyMovement.direction" 
        class="ml-2 mt-2" 
      />
      <payment-method-chip :method="moneyMovement.method" class="ml-2 mt-2"/>
    </v-col>

    <v-col cols="1" class="d-flex flex-row justify-end">
      <!-- <EditPartnerModal :partner="supplier" mini /> -->
    </v-col>
  </v-row>
  <v-row align="start" justify="space-between" dense>
    <v-col cols="3" class="text-md-left">
      <div
        v-if="partner" 
        class="text-subtitle-1 text-grey-darken-1 order-details-line"
      >
        <strong>{{ tCap('partner.customer') }}</strong>:
        <partner-btn :partner="partner" />
      </div>
      <div 
        class="text-subtitle-1 text-grey-darken-1 order-details-line"
      >
        <strong>{{ tCap("moneyMovement.createdDate") }}</strong>
        : {{ getDate(moneyMovement.createdDate) }}
      </div>
    </v-col>

    <v-col cols="4" md="5" class="text-md-right">
      <span> {{ tCap("moneyMovement.amount") }}</span>
      <div class="text-h5 font-weight-bold">{{ getAmount(moneyMovement.amount) }}</div>
      <div>
        {{ tCap("moneyMovement.allocatedAmount") }} <strong>{{ getAmount(allocatedAmount) }} </strong>
        · {{ tCap("moneyMovement.remainingAmount") }} <strong>{{ getAmount(remainingAmount) }} </strong>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import PartnerBtn from '../partner/PartnerBtn.vue';
import MovementReasonChip from '@/presentation/components/moneyMovement/MovementReasonChip.vue';
import PaymentMethodChip from './PaymentMethodChip.vue';

import { computed } from 'vue';

import type { MoneyMovement } from '@/domain/payment/models/moneyMovement';

import { getPartnerDetails } from '@/presentation/composables/partner/usePartnerDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { getAmount, getDate } from '@/presentation/composables/useUtils';
import { getMoneyMovementAllocatedAmount } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  moneyMovement: MoneyMovement;
}>();

const partner = computed(() => getPartnerDetails(props.moneyMovement.partnerId));

const allocatedAmount = 
  getMoneyMovementAllocatedAmount(props.moneyMovement.id, props.moneyMovement.partnerId);

const remainingAmount = computed(() => props.moneyMovement.amount - allocatedAmount.value);

function getOrderNumberName() {
  return `#${ props.moneyMovement.movementNumber }`;
}

</script>

<style lang="css" scoped>
  .left-block {
    text-align: left;
  }

</style>