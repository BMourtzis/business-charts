<template>
  <div class="d-flex justify-space-between align-start flex-wrap">
    <div class="left-block">
      <div class="d-flex align-center flex-wrap mb-1">
        <h1 class="text-h4 font-weight-bold mr-2">
          <template v-if="b2bCustomer.businessName">
            {{ b2bCustomer.businessName }}
          </template>
          <template v-else>
            {{ b2bCustomer.contactName }}
          </template>
        </h1>

        <v-chip 
          color="primary"
          size="small"
        >
          {{ tCap('partner.b2bCustomer') }}
        </v-chip>
      </div>
      <div
        v-if="b2bCustomer.businessName"
        class="text-subtitle-1 text-grey-darken-1"
      >
        {{ b2bCustomer.contactName }}
      </div>

      <div
        v-if="carrier" 
        class="text-subtitle-1 text-grey-darken-1"
      >
        {{ tCap('deliveryCarrier.carrier') }}:
        <v-btn 
          variant="text" 
          :to="`/carrier/${carrier.id}`"
        >
          {{ carrier.name }}
        </v-btn> -
        <AddressLink 
          :address="carrier.primaryLocation" 
          format="full" 
        />
      </div>
    </div>


    <div class="d-flex align-center mt-2 mt-md-0">
      <EditPartnerModal 
        :partner="b2bCustomer" 
        mini
      />
      <ConfirmDeleteModal
        :name="b2bCustomer.businessName"
        :action-fn="() => deletePartner()"
        mini
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from 'vue-router';

import { B2BCustomer } from "@/domain/partner/models/b2bCustomer";

import { usePartners } from "@/presentation/composables/partner/usePartners";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";

import EditPartnerModal from "@/presentation/components/partner/EditPartnerModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import AddressLink from "../contact/AddressLink.vue";

const props = defineProps<{
  b2bCustomer: B2BCustomer;
}>();

const { tCap } = useLocalizationHelpers();

const { deletePartnerCommandHandler } = usePartners();

const router = useRouter();

const carrier = computed(() => getCarrierDetails(props.b2bCustomer.deliveryCarrierId));

function deletePartner() {
  router.back();
  deletePartnerCommandHandler.handle({id: props.b2bCustomer.id});
}

</script>

<style scoped>
.left-block {
  text-align: left;
}
</style>