<template>
  <v-data-table
    :headers="headers"
    :items="props.partners"
  >
    <!-- Custom column slot -->
    <template #[`item.actions`]="{ item }">
      <v-btn
        color="primary"
        variant="plain"
        size="small"
        icon="mdi-account-details"
        :to="`/partner/${item.id}`"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { Partner } from '@/domain/models/partner';
import { defineProps } from 'vue';

const props = defineProps < {
  partners: Partner[];
} > ();

const headers = [
  { title: "Business Name", key: "businessName" },
  { title: "Contact Name", key: "contactName" },
  { title: "VAT Number", key: "vatNumber" },  
  { title: "Actions", key: "actions"}
]


</script>

<style scoped></style>