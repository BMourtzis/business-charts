<template>
  <v-container>
    <h1>{{ tCap('partner.carrier', 2) }}</h1>
    <CarrierModal />
    <CarrierList :carriers="carriers" />
  </v-container>
</template>

<script setup lang="ts">
import CarrierModal from '@/presentation/components/deliveryCarrier/CarrierModal.vue';
import CarrierList from '@/presentation/components/deliveryCarrier/CarrierList.vue';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useDeliveryCarriers } from '@/presentation/composables/useDeliveryCarriers';



const { carriers } = useDeliveryCarriers();
const { tCap } = useLocalizationHelpers()

</script>

<style scoped>
</style>