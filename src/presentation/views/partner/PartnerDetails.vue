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
    <v-row>
      <h3>{{ tCap('contact.email', 2) }}</h3>
      <ContactModal 
        :owner-id="partnerModel.id"
        owner-type="partner"
        :contact-type="ContactType.Email" 
        mini
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="email in partnerModel.emails" 
          :key="email.id"
        >
          <span v-if="email.name">{{ email.name }}: </span> 
          <strong>{{ email.value }}</strong> 
          <span v-if="email.isPrimary"> - {{ tCap('common.primary') }}</span>
          <ContactModal
            :owner-id="props.id"
            :contact="email"
            owner-type="partner"
            :contact-type="ContactType.Email" 
            mini
          />
          <ConfirmDeleteModal
            :name="email.value"
            :action-fn="() => removeEmailCommandHandler.handle({partnerId: props.id, emailId: email.id})"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>{{ tCap('contact.phone', 2) }}</h3>
      <ContactModal 
        :owner-id="partnerModel.id"
        owner-type="partner"
        :contact-type="ContactType.Phone" 
        mini
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="phone in partnerModel.phones" 
          :key="phone.id"
        >
          <span v-if="phone.name">{{ phone.name }}: </span> 
          <strong>{{ phone.value }}</strong> 
          <span v-if="phone.isPrimary"> - {{ tCap('common.primary') }}</span>
          <ContactModal
            :owner-id="props.id"
            :contact="phone"
            owner-type="partner"
            :contact-type="ContactType.Phone" 
            mini
          />
          <ConfirmDeleteModal
            :name="phone.value"
            :action-fn="() => removePhoneCommandHandler.handle({partnerId: props.id, phoneId: phone.id})"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>{{ tCap('address.address', 2) }}</h3>
      <AddressModal
        :partner-id="partnerModel.id" 
        owner-type="partner"
        mini
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="address in partnerModel.addresses" 
          :key="address.id"
        >
          <span v-if="address.name">{{ address.name }}: </span> 
          <strong>{{ address.value }}</strong> 
          <span v-if="address.isPrimary"> - {{ tCap('common.primary_gen') }}</span>
          <AddressModal
            :address="address"
            owner-type="partner"
            :partner-id="props.id"
            mini
          />
          <ConfirmDeleteModal
            :name="address.value"
            :action-fn="() => removeAddressCommandHandler.handle({partnerId: props.id, addressId: address.id})"
            mini
          />
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRouter } from 'vue-router';

import { isB2BCustomer, isSupplier } from "@/domain/partner/typeGuards";
import { ContactType } from "@/domain/contact/contactTypes";

import { usePartners } from "@/presentation/composables/partner/usePartners";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { usePartnerDetails } from "@/presentation/composables/partner/usePartnerDetails";
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";

import EditPartnerModal from "@/presentation/components/partner/EditPartnerModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import AddressModal from "@/presentation/components/contact/AddressModal.vue";
import ContactModal from "@/presentation/components/contact/ContactModal.vue";
import AddressLink from "@/presentation/components/contact/AddressLink.vue";

const props = defineProps<{ id: string }>();

const { tCap, t } = useLocalizationHelpers()

const { 
  removeEmailCommandHandler,
  removePhoneCommandHandler,
  removeAddressCommandHandler,
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
