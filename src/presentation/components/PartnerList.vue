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
      <ConfirmDeleteModal
        :name="item.businessName"
        :action-fn="() => deletePartnerCommand(item.id)"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { Partner } from '@/domain/models/partner';
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";
import { defineProps } from 'vue';
import { usePartners } from '../composables/usePartners';
import { useLocalizationHelpers } from '../composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const { deletePartnerCommand } = usePartners();

const props = defineProps < {
  partners: Partner[];
} > ();

const headers = [
  { title: tCap('partner.businessName'), key: "businessName" },
  { title: tCap('partner.contactName'), key: "contactName" },
  { title: tCap('partner.vatNumber'), key: "vatNumber" },  
  { title: tCap('common.action', 2), key: "actions"}
]


</script>

<style scoped></style>