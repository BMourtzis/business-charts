<template>
  <v-data-table
    :headers="headers"
    :items="props.partners"
  >
    <!-- Custom column slot -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        color="primary"
        variant="tonal"
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
  { title: "Name", key: "name" },
  { title: "Actions", key: "actions"}
]


</script>

<style scoped></style>s