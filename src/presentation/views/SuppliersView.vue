<template>
  <v-container>
    <h1>Suppliers</h1>
    <AddSupplierModal />
    <PartnersList :partners="suppliers" />
  </v-container>
</template>

<script setup>
import PartnersList from '@/presentation/components/PartnerList.vue';
import { usePartners } from '../composables/usePartners';
import AddSupplierModal from '../components/AddSupplierModal.vue';

const { suppliers } = usePartners();

</script>

<style scoped>
</style>