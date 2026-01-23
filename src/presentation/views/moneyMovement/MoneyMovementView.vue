<template>
    <v-container class="py-6">
    <v-card 
      class="pa-4"
    >
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h6">
          {{ tCap('moneyMovement.moneyMovement', 2) }}
        </h2>
        <!-- <AddOrderModal /> -->
        <!-- Filters (optional) -->
        <!-- <div class="d-flex gap-3 mb-4">
          <v-text-field
            v-model="search"
            density="compact"
            prepend-icon="mdi-magnify"
            placeholder="Search partners..."
            variant="solo-filled"
            hide-details
          />
        </div> -->
      </div>
      <MoneyMovementList :money-movements="allMoneyMovements" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import MoneyMovementList from '@/presentation/components/moneyMovement/MoneyMovementList.vue';
import { useMoneyMovements } from '@/presentation/composables/moneyMovement/useMoneyMovements';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const { allMoneyMovements } = useMoneyMovements();

</script>

<style scoped></style>