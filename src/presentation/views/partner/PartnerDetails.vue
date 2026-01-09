<template>
  <v-container v-if="partnerModel">
    <SupplierHeader
      v-if="supplier"
      :supplier="supplier"
    />
    <B2BCustomerHeader 
      v-if="b2bCustomer"
      :b2b-customer="b2bCustomer"
    />
    <v-row
      class="mt-6"
      align="start"
    >
      <v-col 
        cols="12" 
        md="8"
        xl="10"
      >
        <v-card>
          <v-card-title>
            Orders
          </v-card-title>

          <v-divider />

          <v-card-text>data</v-card-text>
        </v-card>
      </v-col>
      <v-col 
        cols="12" 
        md="4"
        xl="2"
      >
        <ContactInfo
          :contact-info="partnerModel"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { isB2BCustomer, isSupplier } from "@/domain/partner/typeGuards";

import { usePartnerDetails } from "@/presentation/composables/partner/usePartnerDetails";

import ContactInfo from "@/presentation/components/contact/ContactInfo.vue";
import SupplierHeader from "@/presentation/components/partner/SupplierHeader.vue";
import B2BCustomerHeader from "@/presentation/components/partner/B2BCustomerHeader.vue";

const props = defineProps<{ id: string }>();

const { model: partnerModel} = usePartnerDetails(props.id);

const supplier = computed(() =>
  partnerModel.value && isSupplier(partnerModel.value)
    ? partnerModel.value
    : undefined
);

const b2bCustomer = computed(() =>
  partnerModel.value && isB2BCustomer(partnerModel.value)
    ? partnerModel.value
    : undefined
);

</script>

<style scoped></style>
