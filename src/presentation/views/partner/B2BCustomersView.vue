<template>
  <v-container>
    <h1>{{ tCap('partner.b2bCustomer', 2) }}</h1>
    <AddB2BCustomerModal />
    <PartnersList :partners="b2bCustomers" />
  </v-container>
</template>

<script setup lang="ts">
import PartnersList from '@/presentation/components/partner/PartnerList.vue';
import AddB2BCustomerModal from '@/presentation/components/partner/AddB2BCustomerModal.vue';

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { b2bCustomers } = usePartners();
const { tCap } = useLocalizationHelpers()

</script>

<style scoped>
</style>