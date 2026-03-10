<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-row dense >
        <v-col cols="3">
          <v-text-field 
            v-model="searchTerm" 
            :label="tCap('common.search')"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card class="mb-2">
    <v-card-text>
      <v-row dense>
        <v-col cols="3"></v-col>
        <v-spacer />
        <v-col cols="3">
          <CarrierModal />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card>
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