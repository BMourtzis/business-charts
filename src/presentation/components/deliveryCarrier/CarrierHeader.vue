<template>
  <div class="d-flex justify-space-between align-start flex-wrap">
    <div class="d-flex align-center flex-wrap">
      <h1 class="text-h4 font-weight-bold mr-2">
        {{ carrier.name }}
      </h1>

      <v-chip 
        color="primary"
        size="small"
      >
        {{ tCap('deliveryCarrier.carrier') }}
      </v-chip>
    </div>

    <div class="d-flex align-center mt-2 mt-md-0">
      <CarrierModal 
        :carrier="carrier" 
        mini
      />
      <ConfirmDeleteModal
        :name="carrier.name"
        :action-fn="() => deleteCarrier()"
        mini
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { useDeliveryCarriers } from "@/presentation/composables/deliveryCarrier/useDeliveryCarriers";

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import CarrierModal from "./CarrierModal.vue";

const props = defineProps<{
  carrier: DeliveryCarrier;
}>();

const { deleteDeliveryCarrierCommandHandler } = useDeliveryCarriers();

const { tCap } = useLocalizationHelpers();

const router = useRouter();

function deleteCarrier() {
  router.back();
  deleteDeliveryCarrierCommandHandler.handle({id: props.carrier.id});
}
</script>