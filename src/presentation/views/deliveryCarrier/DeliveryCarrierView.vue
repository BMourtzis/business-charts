<template>
  <v-toolbar 
    rounded="lg"
    elevation="2"
    class="mb-2" 
    color="white"
  >
    <div>
      <v-text-field 
        v-model="searchTerm" 
        :placeholder="tCap('common.search')"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        width="300"
        flat
        variant="solo"
        hide-details
        single-line
      />
    </div>
  </v-toolbar>
  <v-card rounded="lg">
    <v-card-title style="background-color: whitesmoke;">
      <v-row dense>
        <v-col cols="3"></v-col>
        <v-spacer />
        <v-col cols="1">
          <CarrierModal mini />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <CarrierList :carriers="carriers" :search-term="searchTerm" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import CarrierModal from '@/presentation/components/deliveryCarrier/CarrierModal.vue';
import CarrierList from '@/presentation/components/deliveryCarrier/CarrierList.vue';

import { useDeliveryCarriers } from '@/presentation/composables/deliveryCarrier/useDeliveryCarriers';
import { ref } from 'vue';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { carriers } = useDeliveryCarriers();

const { tCap } = useLocalizationHelpers();

const searchTerm = ref("");

</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>