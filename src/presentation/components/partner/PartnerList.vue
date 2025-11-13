<template>
  <v-data-table
    :headers="headers"
    :items="data"
  >
    <!-- Custom column slot -->
    <template #[`item.actions`]="{ item }">
      <v-btn
        color="primary"
        variant="text"
        density="compact"
        icon="mdi-account-details"
        :to="`/partner/${item.id}`"
      />
      <EditPartnerModal 
        :partner="item.value" 
        :mini="true" 
      />
      <ConfirmDeleteModal
        :name="item.name"
        :action-fn="() => deletePartnerCommandHandler.handle({id: item.id})"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue';

import { Partner } from '@/domain/models/partner/partner';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import EditPartnerModal from "./EditPartnerModal.vue";

import { usePartners } from '@/presentation/composables/usePartners';
import { usePartnerTable } from '@/presentation/composables/usePartnersTable';

const { deletePartnerCommandHandler } = usePartners();

//TODO: based on the item type add the correct edit modal
const props = defineProps < {
  partners: Partner[] | undefined;
} > ();

const { data, headers } = usePartnerTable(toRef(props, "partners"));

</script>

<style scoped></style>