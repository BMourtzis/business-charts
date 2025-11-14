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
          ({{ t('partner.customer', 2) }})
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
    <v-row>
      <h3>{{ tCap('partner.email', 2) }}</h3>
      <ContactModal 
        contact-type="email" 
        :partner-id="partnerModel.id" 
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
            :partner-id="props.id"
            :contact="email"
            contact-type="email"
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
      <h3>{{ tCap('partner.phone', 2) }}</h3>
      <ContactModal 
        contact-type="phone" 
        :partner-id="partnerModel.id"
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
            :partner-id="props.id"
            :contact="phone"
            contact-type="phone"
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
      <h3>{{ tCap('partner.address', 2) }}</h3>
      <AddressModal 
        :partner-id="partnerModel.id" 
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

import EditPartnerModal from "@/presentation/components/partner/EditPartnerModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import AddressModal from "@/presentation/components/AddressModal.vue";
import ContactModal from "@/presentation/components/ContactModal.vue";

import { usePartners } from "@/presentation/composables/usePartners";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { usePartnerDetails } from "@/presentation/composables/usePartnerDetails";
import { isB2BCustomer, isSupplier } from "@/domain/partner/typeGuards";

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


// const b2bCustomer = computed(() =>
//   partnerModel.value && isB2BCustomer(partnerModel.value)
//     ? partnerModel.value
//     : undefined
// );

function deletePartner() {
  router.back();
  deletePartnerCommandHandler.handle({id: props.id});
}

</script>

<style scoped></style>
