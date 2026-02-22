<template>
  <v-card>
    <v-card-title>
      {{ tCap("options.import") }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row justify="center">
        <v-col cols="auto">
          <v-switch 
            v-model="importPartners" 
            :label="tCap('partner.partner', 2)"
            color="primary"
          />
        </v-col>

        <v-col cols="auto">
          <v-switch 
            v-model="importCarriers" 
            :label="tCap('deliveryCarrier.carrier', 2)"
            color="primary"
          />
        </v-col>

        <v-col cols="auto">
          <v-switch 
            v-model="importOrders" 
            :label="tCap('order.order', 2)"
            color="primary"
          />
        </v-col>
        <v-col cols="auto">
          <v-switch 
            v-model="importMovements" 
            :label="tCap('moneyMovement.moneyMovement', 2)"
            color="primary"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-file-input
          v-model="selectedFile"
          label="JSON file"
          accept="application/json"
        />
      </v-row>
      <v-row justify="center">
        <v-btn
          color="primary"
          :disabled="!selectedFile"
          @click="importData"
        >
          {{ tCap("options.importJson") }}
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useDataManagement } from '@/presentation/composables/useDataManagement';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { importDataCommandHandler } = useDataManagement();
const { tCap } = useLocalizationHelpers();

const importPartners = ref(false);
const importCarriers = ref(false);
const importOrders = ref(false);
const importMovements = ref(false);

let selectedFile = ref<File | null>(null);

function importData() {
    if (!selectedFile.value) return;
    
    importDataCommandHandler.handle({
        file: selectedFile.value,
        includePartners: importPartners.value,
        includeCarriers: importCarriers.value,
        includeOrders: importOrders.value,
        includeMovements: importMovements.value
    });
}

</script>

<style scoped>
</style>