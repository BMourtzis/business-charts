<template>
  <v-container v-if="partner">
    <v-row>
      <h1>{{ partner.businessName }} <span style="font-weight: 100;">({{ partner.type }})</span></h1>
    </v-row>
    <v-row>
      <p>{{ partner.contactName }}</p>
    </v-row>
    <v-row>
      <p>VAT Number: <strong>{{ partner.vatNumber }}</strong></p>
    </v-row>
    <v-row>
      <h3>Emails</h3>
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="email in partner.emails" 
          :key="email.id"
        >
          <p><strong>{{ email.value }}</strong> <span v-if="email.isPrimary"> - Primary</span></p>
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>Phones</h3>
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="phone in partner.phones" 
          :key="phone.id"
        >
          <p><strong>{{ phone.value }}</strong> <span v-if="phone.isPrimary"> - Primary</span></p>
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>Addresses</h3>
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="address in partner.addresses" 
          :key="address.id"
        >
          <p><strong>{{ address.value }}</strong> <span v-if="address.isPrimary"> - Primary</span></p>
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { usePartners } from "../composables/usePartners";
import { defineProps } from "vue";

const props = defineProps<{ id: string }>();

const { getPartnerById } = usePartners();

const partner = getPartnerById(props.id);
</script>

<style scoped></style>
