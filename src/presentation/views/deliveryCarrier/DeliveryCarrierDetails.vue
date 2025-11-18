<template>
  <v-container v-if="carrierModel">
    <v-row>
      <h1>
        {{ carrierModel.name }} 
        <span 
          style="font-weight: 100;"
        >
          ({{ t('deliveryCarrier.carrier') }})
        </span>
      </h1>
      <CarrierModal 
        :carrier="carrierModel" 
        mini
      />
      <ConfirmDeleteModal
        :name="carrierModel.name"
        :action-fn="() => deleteCarrier()"
        mini
      />
    </v-row>
    <v-row
      class="mt-6"
      align="start"
    >
      <v-col 
        cols="12" 
        md="8"
        xl="10"
      >
        <v-card>
          <v-card-title>
            Customers
          </v-card-title>

          <v-divider />

          <v-card-text>data</v-card-text>
        </v-card>
      </v-col>
      <v-col 
        cols="12" 
        md="4"
        xl="2"
      >
        <ContactInfo
          :contact-info="carrierModel"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from 'vue-router';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";
import { useDeliveryCarriers } from "@/presentation/composables/deliveryCarrier/useDeliveryCarriers";

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import CarrierModal from "@/presentation/components/deliveryCarrier/CarrierModal.vue";
import ContactInfo from "@/presentation/components/contact/ContactInfo.vue";

const props = defineProps<{ id: string }>();

const { t } = useLocalizationHelpers()

const { 
  deleteDeliveryCarrierCommandHandler 
} = useDeliveryCarriers();

const router = useRouter();

const carrierModel = getCarrierDetails(props.id);

function deleteCarrier() {
  router.back();
  deleteDeliveryCarrierCommandHandler.handle({id: props.id});
}

</script>

<style scoped></style>