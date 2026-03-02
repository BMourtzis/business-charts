<template>
  <v-container class="py-6">
    <v-card 
      class="pa-4"
    >
      <div class="d-flex justify-space-between align-center mb-4">
        <div></div>
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
        <CarrierModal />
      </div>
      <CarrierList :carriers="carriers" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import CarrierModal from '@/presentation/components/deliveryCarrier/CarrierModal.vue';
import CarrierList from '@/presentation/components/deliveryCarrier/CarrierList.vue';

import { useDeliveryCarriers } from '@/presentation/composables/deliveryCarrier/useDeliveryCarriers';

const { carriers } = useDeliveryCarriers();

</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>