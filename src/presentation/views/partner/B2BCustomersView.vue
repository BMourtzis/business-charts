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
          <AddB2BCustomerModal mini/>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pt-2">
      <PartnersList 
        :partners="b2bCustomers" 
        :search-term="searchTerm" 
        />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import PartnersList from '@/presentation/components/partner/PartnerList.vue';
import AddB2BCustomerModal from '@/presentation/components/partner/AddB2BCustomerModal.vue';

import { ref } from 'vue';

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { b2bCustomers } = usePartners();
const { tCap } = useLocalizationHelpers();

const searchTerm = ref("");

</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>