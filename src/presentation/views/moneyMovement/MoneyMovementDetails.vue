<template>
  <v-container v-if="model">
    <money-movement-details-header :money-movement="model" />
  </v-container>
  <v-row
    class="mt-6"
    align="start"
  >
    <v-col cols="12">
      <money-movement-details-allocations />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import MoneyMovementDetailsHeader from '@/presentation/components/moneyMovement/MoneyMovementDetailsHeader.vue';
import MoneyMovementDetailsAllocations from '@/presentation/components/moneyMovement//MoneyMovementDetailsAllocations.vue';

import { useMoneyMovementDetails } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';

const props = defineProps<{
  id: string
}>();

const { model } = useMoneyMovementDetails(props.id);

</script>

<style lang="css" scoped></style>