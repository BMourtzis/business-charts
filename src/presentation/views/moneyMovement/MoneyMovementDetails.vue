<template>
  <v-container v-if="model">
    <money-movement-details-header :money-movement="model" />
    <v-row
      class="mt-6"
      align="start"
    >
      <v-spacer/>
      <v-col 
        cols="8"
        lg="6"
        xl="4"
      >
        <money-movement-details-allocations :money-movement="model" />
      </v-col>
    </v-row>
  </v-container>
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