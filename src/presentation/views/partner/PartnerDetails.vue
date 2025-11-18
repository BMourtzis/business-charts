<template>
  <v-container v-if="partnerModel">
    <v-row>
      <h1>
        {{ partnerModel.businessName }} 
        <span 
          v-if="supplier" 
          style="font-weight: 100;"
        >
          ({{ t('partner.supplier') }})
        </span>
        <span 
          v-if="isB2BCustomer(partnerModel)" 
          style="font-weight: 100;"
        >
          ({{ t('partner.b2bCustomer') }})
        </span>
      </h1>
      <EditPartnerModal 
        :partner="partnerModel" 
        mini
      />
      <ConfirmDeleteModal
        :name="partnerModel.businessName"
        :action-fn="() => deletePartner()"
        mini
      />
    </v-row>
    <v-row>
      <p>{{ partnerModel.contactName }}</p>
    </v-row>
    <v-row v-if="supplier">
      <p>{{ tCap('partner.activity') }}: <strong>{{ supplier.activity }}</strong></p>
    </v-row>
    <v-row v-if="b2bCustomer && carrier">
      <p>
        {{ tCap('deliveryCarrier.carrier') }}: <strong>{{ carrier.name }}</strong> - 
        <AddressLink 
          :address="carrier.primaryLocation"
          format="full"
        />
      </p>
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
            Orders
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
          :contact-info="partnerModel"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRouter } from 'vue-router';

import { isB2BCustomer, isSupplier } from "@/domain/partner/typeGuards";

import { usePartners } from "@/presentation/composables/partner/usePartners";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { usePartnerDetails } from "@/presentation/composables/partner/usePartnerDetails";
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";

import EditPartnerModal from "@/presentation/components/partner/EditPartnerModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import ContactInfo from "@/presentation/components/contact/ContactInfo.vue";
import AddressLink from "@/presentation/components/contact/AddressLink.vue";

const props = defineProps<{ id: string }>();

const { tCap, t } = useLocalizationHelpers();

const { 
  deletePartnerCommandHandler 
} = usePartners();

const router = useRouter();

const { model: partnerModel} = usePartnerDetails(props.id);

const supplier = computed(() =>
  partnerModel.value && isSupplier(partnerModel.value)
    ? partnerModel.value
    : undefined
);

const b2bCustomer = computed(() =>
  partnerModel.value && isB2BCustomer(partnerModel.value)
    ? partnerModel.value
    : undefined
);

const carrier = b2bCustomer.value ? getCarrierDetails(b2bCustomer.value.deliveryCarrierId) : undefined;

function deletePartner() {
  router.back();
  deletePartnerCommandHandler.handle({id: props.id});
}

</script>

<style scoped></style>
