<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
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
        :to="`/carrier/${item.id}`"
      />
      <!-- <EditPartnerModal 
        :partner="item.value" 
        :mini="true" 
      /> -->
      <ConfirmDeleteModal
        :name="item.name"
        :action-fn="() => deleteDeliveryCarrierCommandHandler.handle({id: item.id})"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { DataTableHeader } from 'vuetify';

import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier';
import { ContactType } from "@/domain/contact/contactTypes";

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import PhoneLink from '../PhoneLink.vue';
import AddressLink from '../AddressLink.vue';

import { useDeliveryCarriers } from '@/presentation/composables/useDeliveryCarriers';
import { useLocalizationHelpers } from "@/presentation/composables/useLocalization";

const { deleteDeliveryCarrierCommandHandler } = useDeliveryCarriers();

const { tCap } = useLocalizationHelpers();

const props = defineProps < {
  carriers: DeliveryCarrier[] | undefined;
} > ();

const headers = [
    { title: tCap('common.name'), key: "name", align: 'start' },
    { title: tCap('partner.city'), key: "city", align: 'start' },  
    { title: tCap('partner.street'), key: "address", align: 'start' },  
    { title: tCap('partner.phone', 2), key: "phones", align: 'start' },  
    { title: tCap('common.action', 2), key: "actions", align: 'start' }
] satisfies DataTableHeader[];

const data = props.carriers?.map(getTableData);

function getTableData(carrier: DeliveryCarrier) {
    const phones = carrier.phones
        .filter(p => p.type === ContactType.Phone)
        .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
        .slice(0, 3);

    return {
        id: carrier.id,
        name: carrier.name,
        city: carrier.primaryLocation?.city ?? "",
        address: carrier.primaryLocation,
        phones,
        value: carrier
    };
}

</script>

<style scoped></style>