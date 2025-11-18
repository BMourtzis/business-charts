<template>
  <v-container>
    <h1>{{ tCap('partner.supplier', 2) }}</h1>
    <AddSupplierModal />
    <PartnersList :partners="suppliers" />
  </v-container>
</template>

<script setup lang="ts">
import PartnersList from '@/presentation/components/partner/PartnerList.vue';
import AddSupplierModal from '@/presentation/components/partner/AddSupplierModal.vue';

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';


const { suppliers } = usePartners();
const { tCap } = useLocalizationHelpers()

</script>

<style scoped>
</style>