<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
    hide-default-footer
    density="comfortable"
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
    <template #[`item.actions`]="{ item }">
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
import { toRef } from 'vue';
import { useRouter } from 'vue-router';

import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier';

import { useDeliveryCarriers } from '@/presentation/composables/deliveryCarrier/useDeliveryCarriers';
import { useDeliveryCarrierTable } from '@/presentation/composables/deliveryCarrier/useCarrierTable';
import { VDataTableRow } from '@/presentation/types/types';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import PhoneLink from '@/presentation/components/contact/PhoneLink.vue';
import AddressLink from '@/presentation/components/contact/AddressLink.vue';
import CarrierModal from '@/presentation/components/deliveryCarrier/CarrierModal.vue';


const { deleteDeliveryCarrierCommandHandler } = useDeliveryCarriers();

const router = useRouter();

const props = defineProps < {
  carriers: DeliveryCarrier[] | undefined;
} > ();

const { data, headers } = useDeliveryCarrierTable(toRef(props, "carriers"));

function rowClick(_: MouseEvent, row: VDataTableRow<DeliveryCarrier>) {
  router.push(`/carrier/${row.item.id}`);
}

</script>

<style scoped></style>