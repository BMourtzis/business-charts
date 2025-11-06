<template>
  <v-container v-if="partner">
    <v-row>
      <h1>
        {{ partner.businessName }} 
        <span 
          v-if="partner.type === 'supplier'" 
          style="font-weight: 100;"
        >
          ({{ t('partner.supplier') }})
        </span>
        <span 
          v-if="partner.type === 'customer'" 
          style="font-weight: 100;"
        >
          ({{ t('partner.customer', 2) }})
        </span>
      </h1>
      <EditPartnerModal 
        :partner="partner" 
        :mini="true" 
      />
      <ConfirmDeleteModal
        :name="partner.businessName"
        :action-fn="() => deletePartner()"
        :mini="true"
      />
    </v-row>
    <v-row>
      <p>{{ partner.contactName }}</p>
    </v-row>
    <v-row>
      <p>{{ tCap('partner.vatNumber') }}: <strong>{{ partner.vatNumber }}</strong></p>
    </v-row>
    <v-row>
      <h3>{{ tCap('partner.email', 2) }}</h3>
      <AddContactModal 
        contact-type="email" 
        :partner-id="partner.id" 
        :mini="true"
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="email in partner.emails" 
          :key="email.id"
        >
          <span v-if="email.name">{{ email.name }}:</span> 
          <strong>{{ email.value }}</strong> 
          <span v-if="email.isPrimary"> - {{ tCap('common.primary') }}</span>
          <EditContactModal
            :partner-id="props.id"
            :contact="email"
            contact-type="email"
            :mini="true"
          />
          <ConfirmDeleteModal
            :name="email.value"
            :action-fn="() => removeEmailCommand(props.id, email.id)"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>{{ tCap('partner.phone', 2) }}</h3>
      <AddContactModal 
        contact-type="phone" 
        :partner-id="partner.id"
        :mini="true"
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="phone in partner.phones" 
          :key="phone.id"
        >
          <span v-if="phone.name">{{ phone.name }}:</span> 
          <strong>{{ phone.value }}</strong> 
          <span v-if="phone.isPrimary"> - {{ tCap('common.primary') }}</span>
          <EditContactModal
            :partner-id="props.id"
            :contact="phone"
            contact-type="phone"
            :mini="true"
          />
          <ConfirmDeleteModal
            :name="phone.value"
            :action-fn="() => removePhoneCommand(props.id, phone.id)"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
    <v-row>
      <h3>{{ tCap('partner.address', 2) }}</h3>
      <AddContactModal 
        contact-type="address" 
        :partner-id="partner.id" 
        :mini="true"
      />
    </v-row>
    <v-row>
      <ul>
        <li 
          v-for="address in partner.addresses" 
          :key="address.id"
        >
          <span v-if="address.name">{{ address.name }}:</span> 
          <strong>{{ address.value }}</strong> 
          <span v-if="address.isPrimary"> - {{ tCap('common.primary_gen') }}</span>
          <EditContactModal
            :partner-id="props.id"
            :contact="address"
            contact-type="address"
            :mini="true"
          />
          <ConfirmDeleteModal
            :name="address.value"
            :action-fn="() => removeAddressCommand(props.id, address.id)"
            :mini="true"
          />
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from 'vue-router';

import EditPartnerModal from "@/presentation/components/Partners/EditPartnerModal.vue";
import AddContactModal from "@/presentation/components/Partners/AddContactModal.vue";
import EditContactModal from "@/presentation/components/Partners/EditContactModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";

import { usePartners } from "@/presentation/composables/usePartners";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'

const props = defineProps<{ id: string }>();

const { tCap, t } = useLocalizationHelpers()

const { 
  getPartnerById,
  removeEmailCommand,
  removePhoneCommand,
  removeAddressCommand,
  deletePartnerCommand 
} = usePartners();

const router = useRouter();

const partner = getPartnerById(props.id);

function deletePartner() {
  router.back();
  deletePartnerCommand(props.id);
}

</script>

<style scoped></style>
