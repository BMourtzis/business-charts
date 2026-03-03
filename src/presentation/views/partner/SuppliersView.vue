<template>
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
      <AddSupplierModal />
    </div>
    <PartnersList :partners="suppliers" />
  </v-card>
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
.v-card {
  border-radius: 16px;
}
</style>
