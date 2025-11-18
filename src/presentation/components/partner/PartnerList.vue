<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
    hide-default-footer
  >
    <template #[`item.phones`]="{ item }">
      <div class="d-flex flex-column gap-1">
        <PhoneLink 
          v-for="(phone, i) in item.phones" 
          :key="i" 
          class="d-flex align-center"
          :phone="phone"
        />
      </div>
    </template>
    <template #[`item.address`]="{ item }">
      <div class="d-flex flex-column gap-1">
        <AddressLink 
          class="d-flex align-center"
          :address="item.address"
          format="street"
        />
      </div>
    </template>
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

import { Partner } from '@/domain/partner/models/partner';

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { usePartnerTable } from '@/presentation/composables/partner/usePartnersTable';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import EditPartnerModal from "./EditPartnerModal.vue";
import PhoneLink from '@/presentation/components/contact/PhoneLink.vue';
import AddressLink from '@/presentation/components/contact/AddressLink.vue';

const { deletePartnerCommandHandler } = usePartners();

const props = defineProps < {
  partners: Partner[] | undefined;
} > ();

const { data, headers } = usePartnerTable(toRef(props, "partners"));

</script>

<style scoped></style>