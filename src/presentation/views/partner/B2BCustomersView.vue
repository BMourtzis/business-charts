<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-row dense>
        <v-col cols="3">
          <v-text-field 
            v-model="searchTerm" 
            label="search"
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
          <AddB2BCustomerModal />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-text>
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

const { b2bCustomers } = usePartners();

const searchTerm = ref("");

</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>