<template>
  <v-container v-if="partner">
    <v-row>
      <h1>{{ partner.businessName }} <span style="font-weight: 100;">({{ partner.type }})</span></h1>
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
      <p>VAT Number: <strong>{{ partner.vatNumber }}</strong></p>
    </v-row>
    <v-row>
      <h3>Emails</h3>
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
          {{ email.name }}: <strong>{{ email.value }}</strong> <span v-if="email.isPrimary"> - Primary</span>
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
      <h3>Phones</h3>
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
          {{ phone.name }}: <strong>{{ phone.value }}</strong> <span v-if="phone.isPrimary"> - Primary</span>
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
      <h3>Addresses</h3>
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
          {{ address.name }}: <strong>{{ address.value }}</strong> <span v-if="address.isPrimary"> - Primary</span>
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
import { usePartners } from "../composables/usePartners";
import { defineProps } from "vue";
import EditPartnerModal from "../components/EditPartnerModal.vue";
import AddContactModal from "../components/AddContactModal.vue";
import EditContactModal from "../components/EditContactModal.vue";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ id: string }>();

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
