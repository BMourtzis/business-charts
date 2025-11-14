<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
  >
    <template #[`item.phones`]="{ item }">
      <div class="d-flex flex-column gap-1">
        <div 
          v-for="(phone, i) in item.phones" 
          :key="i" 
          class="d-flex align-center"
        >
          <v-icon 
            icon="mdi-phone" 
            size="16" 
            class="mr-1 text-grey" 
          />
          <a 
            :href="`tel:${phone}`" 
            class="text-decoration-none text-body-2"
          >
            {{ phone }}
          </a>
        </div>
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

  //TODO: make these into componets
  
  // <!-- 📞 Phones -->
  // <template #item.phone="{ item }">
  //   <div class="d-flex flex-column gap-1">
  //     <div v-for="(phone, i) in item.phone" :key="i" class="d-flex align-center">
  //       <v-icon icon="mdi-phone" size="16" class="mr-1 text-grey" />
  //       <a
  //         :href="`tel:${phone}`"
  //         class="text-decoration-none text-body-2"
  //       >
  //         {{ phone }}
  //       </a>
  //     </div>
  //   </div>
  // </template>

  // <!-- ✉️ Emails -->
  // <template #item.email="{ item }">
  //   <div class="d-flex flex-column gap-1">
  //     <div v-for="(email, i) in item.email" :key="i" class="d-flex align-center">
  //       <v-icon icon="mdi-email" size="16" class="mr-1 text-grey" />
  //       <a
  //         :href="`mailto:${email}`"
  //         class="text-decoration-none text-body-2"
  //       >
  //         {{ email }}
  //       </a>
  //     </div>
  //   </div>
  // </template>

  //   <!-- 📍 Address -->
  // <template #item.address="{ item }">
  //   <div class="d-flex flex-column gap-1">
  //     <div
  //       v-for="(addr, i) in item.address"
  //       :key="i"
  //       class="d-flex align-center"
  //     >
  //       <v-icon icon="mdi-map-marker" size="16" class="mr-1 text-grey" />
  //       <a
  //         :href="googleMapsUrl(addr)"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         class="text-decoration-none text-body-2"
  //       >
  //         {{ addr }}
  //       </a>
  //     </div>
  //   </div>
  // </template>

// function googleMapsUrl(address: string) {
//   const query = encodeURIComponent(address);
//   return `https://www.google.com/maps/search/?api=1&query=${query}`;
// }

</script>

<style scoped></style>