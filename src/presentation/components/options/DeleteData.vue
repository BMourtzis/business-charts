<template>
  <v-card>
    <v-card-title>
      {{ tCap("options.deleteData") }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row justify="center">
        <v-col cols="auto">
          <v-switch 
            v-model="deletePartners" 
            :label="tCap('partner.partner', 2)"
            color="primary"
          />
        </v-col>

        <v-col cols="auto">
          <v-switch 
            v-model="deleteCarriers" 
            :label="tCap('deliveryCarrier.carrier', 2)"
            color="primary"
          />
        </v-col>

        <v-col cols="auto">
          <v-switch 
            v-model="deleteOrders" 
            label="Orders"
            color="primary"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <ConfirmDeleteModal
          name="All Data"
          :action-fn="deleteData"
          :mini="false"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useDataManagement } from '@/presentation/composables/useDataManagement';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import ConfirmDeleteModal from '@/presentation/components/ConfirmDeleteModal.vue';

const { deleteDataCommandHandler } = useDataManagement();
const { tCap } = useLocalizationHelpers();

let deletePartners = ref(false);
let deleteCarriers = ref(false);
let deleteOrders = ref(false);

function deleteData() {
  deleteDataCommandHandler.handle({
    removePartners: deletePartners.value,
    removeCarriers: deleteCarriers.value,
    removeOrders: deleteOrders.value
  });
}

</script>

<style scoped>
</style>