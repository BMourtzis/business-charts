<template>
  <v-card>
    <v-card-title>
      {{ tCap("options.export") }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row justify="center">
        <v-col cols="auto">
          <v-switch 
            v-model="exportPartners" 
            :label="tCap('partner.partner', 2)"
            color="primary"
          />
        </v-col>

        <v-col cols="auto">
          <v-switch 
            v-model="exportCarriers" 
            :label="tCap('deliveryCarrier.carrier', 2)"
            color="primary"
          />
        </v-col>
        <v-col cols="auto">
          <v-switch 
            v-model="exportOrders" 
            :label="tCap('order.order', 2)"
            color="primary"
          />
        </v-col>
        <v-col cols="auto">
          <v-switch 
            v-model="exportMovements" 
            :label="tCap('moneyMovement.moneyMovement', 2)"
            color="primary"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          color="warning"
          @click="exportData"
        >
          {{ tCap("options.exportJson") }}
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useDataManagement } from '@/presentation/composables/useDataManagement';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { exportDataCommandHandler } = useDataManagement();
const { tCap } = useLocalizationHelpers();

const exportPartners = ref(false);
const exportCarriers = ref(false);
const exportOrders = ref(false);
const exportMovements = ref(false);

function exportData() {
  exportDataCommandHandler.handle({
    includePartners: exportPartners.value,
    includeCarriers: exportCarriers.value,
    includeOrders: exportOrders.value,
    includeMovements: exportMovements.value
  });
}

</script>

<style scoped>
</style>