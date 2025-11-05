<template>
  <v-container>
    <h1>{{ tCap('partner.supplier', 2) }}</h1>
    <AddSupplierModal />
    <PartnersList :partners="suppliers" />
  </v-container>
</template>

<script setup>
import PartnersList from '@/presentation/components/PartnerList.vue';
import { usePartners } from '../composables/usePartners';
import AddSupplierModal from '../components/AddSupplierModal.vue';
import { useLocalizationHelpers } from '../composables/useLocalization'


const { suppliers } = usePartners();
const { tCap } = useLocalizationHelpers()

</script>

<style scoped>
</style>