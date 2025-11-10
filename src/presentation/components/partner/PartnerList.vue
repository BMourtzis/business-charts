<template>
  <v-data-table
    :headers="headers"
    :items="props.partners"
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
        :partner="item" 
        :mini="true" 
      />
      <ConfirmDeleteModal
        :name="item.businessName"
        :action-fn="() => deletePartnerCommand(item.id)"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { PartnerDTO } from '@/application/dto/partnerDTO';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import EditPartnerModal from "./EditPartnerModal.vue";

import { usePartners } from '@/presentation/composables/usePartners';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const { deletePartnerCommand } = usePartners();

const props = defineProps < {
  partners: PartnerDTO[];
} > ();

const headers = [
  { title: tCap('partner.businessName'), key: "businessName" },
  { title: tCap('partner.contactName'), key: "contactName" },
  { title: tCap('partner.vatNumber'), key: "vatNumber" },  
  { title: tCap('common.action', 2), key: "actions"}
]


</script>

<style scoped></style>