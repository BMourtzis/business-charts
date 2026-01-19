<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
    hide-default-footer
    density="comfortable"
    :items-per-page="-1"
    hover
    @click:row="rowClick"
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
    <template #[`item.deliveryCarrier`]="{ item }">
      <v-btn 
        v-if="item.rowType === 'b2b' && item.deliveryCarrier !== undefined"
        variant="text" 
        @click.stop="() => router.push(`/carrier/${item.deliveryCarrier?.id}`)"
      >
        {{ item.deliveryCarrier.name }}
      </v-btn>
    </template>
    <template #[`item.actions`]="{ item }">
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
import { toRef } from 'vue';
import { useRouter } from 'vue-router';

import { Partner } from '@/domain/partner/models/partner';

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { usePartnerTable } from '@/presentation/composables/partner/usePartnersTable';
import { type VDataTableRow } from '@/presentation/types/types';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import EditPartnerModal from "./EditPartnerModal.vue";
import PhoneLink from '@/presentation/components/contact/PhoneLink.vue';
import AddressLink from '@/presentation/components/contact/AddressLink.vue';

const { deletePartnerCommandHandler } = usePartners();
const router = useRouter();

const props = defineProps < {
  partners: Partner[] | undefined;
} > ();

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/partner/${row.item.id}`);
}


const { data, headers } = usePartnerTable(toRef(props, "partners"));

</script>

<style scoped></style>