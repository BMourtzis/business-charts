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
    <v-row>
      <h3>{{ tCap('contact.email', 2) }}</h3>
      <ContactModal 
        :owner-id="carrierModel.id"
        owner-type="deliveryCarrier"
        :contact-type="ContactType.Email" 
        mini
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="email in carrierModel.emails" 
          :key="email.id"
        >
          <span v-if="email.name">{{ email.name }}: </span> 
          <strong>{{ email.value }}</strong> 
          <span v-if="email.isPrimary"> - {{ tCap('common.primary') }}</span>
          <ContactModal
            :owner-id="props.id"
            :contact="email"
            owner-type="deliveryCarrier"
            :contact-type="ContactType.Email" 
            mini
          />
          <ConfirmDeleteModal
            :name="email.value"
            :action-fn="() => removeEmailCommandHandler.handle({carrierId: props.id, emailId: email.id})"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>{{ tCap('contact.phone', 2) }}</h3>
      <ContactModal 
        :owner-id="carrierModel.id"
        owner-type="deliveryCarrier"
        :contact-type="ContactType.Phone" 
        mini
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="phone in carrierModel.phones" 
          :key="phone.id"
        >
          <span v-if="phone.name">{{ phone.name }}: </span> 
          <strong>{{ phone.value }}</strong> 
          <span v-if="phone.isPrimary"> - {{ tCap('common.primary') }}</span>
          <ContactModal
            :owner-id="props.id"
            :contact="phone"
            owner-type="deliveryCarrier"
            :contact-type="ContactType.Phone" 
            mini
          />
          <ConfirmDeleteModal
            :name="phone.value"
            :action-fn="() => removePhoneCommandHandler.handle({carrierId: props.id, phoneId: phone.id})"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>{{ tCap('address.address', 2) }}</h3>
      <AddressModal
        :partner-id="carrierModel.id" 
        owner-type="deliveryCarrier"
        mini
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="address in carrierModel.locations" 
          :key="address.id"
        >
          <span v-if="address.name">{{ address.name }}: </span> 
          <strong>{{ address.value }}</strong> 
          <span v-if="address.isPrimary"> - {{ tCap('common.primary_gen') }}</span>
          <AddressModal
            :address="address"
            owner-type="deliveryCarrier"
            :partner-id="props.id"
            mini
          />
          <ConfirmDeleteModal
            :name="address.value"
            :action-fn="() => removeAddressCommandHandler.handle({carrierId: props.id, addressId: address.id})"
            mini
          />
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from 'vue-router';

import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import AddressModal from "@/presentation/components/AddressModal.vue";
import ContactModal from "@/presentation/components/ContactModal.vue";
import CarrierModal from "@/presentation/components/deliveryCarrier/CarrierModal.vue";

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { ContactType } from "@/domain/contact/contactTypes";
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";
import { useDeliveryCarriers } from "@/presentation/composables/deliveryCarrier/useDeliveryCarriers";

const props = defineProps<{ id: string }>();

const { tCap, t } = useLocalizationHelpers()

const { 
  removeEmailCommandHandler,
  removePhoneCommandHandler,
  removeAddressCommandHandler,
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