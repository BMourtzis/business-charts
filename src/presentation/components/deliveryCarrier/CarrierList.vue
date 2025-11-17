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
        :to="`/carrier/${item.id}`"
      />
      <CarrierModal 
        :carrier="item.value" 
        mini 
      />
      <ConfirmDeleteModal
        :name="item.name"
        :action-fn="() => deleteDeliveryCarrierCommandHandler.handle({id: item.id})"
        mini
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue';

import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import PhoneLink from '../PhoneLink.vue';
import AddressLink from '../AddressLink.vue';
import CarrierModal from './CarrierModal.vue';

import { useDeliveryCarriers } from '@/presentation/composables/useDeliveryCarriers';
import { useDeliveryCarrierTable } from '@/presentation/composables/useCarrierTable';


const { deleteDeliveryCarrierCommandHandler } = useDeliveryCarriers();

const props = defineProps < {
  carriers: DeliveryCarrier[] | undefined;
} > ();

const { data, headers } = useDeliveryCarrierTable(toRef(props, "carriers"));

</script>

<style scoped></style>