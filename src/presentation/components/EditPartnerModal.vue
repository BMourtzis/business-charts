<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-if="!mini"
        v-bind="activatorProps"
        color="surface-variant"
        text="Edit Partner"
        prepend-icon="mdi-pencil"
        variant="flat"
      />
      <v-btn
        v-if="mini"
        v-bind="activatorProps"
        color="surface-variant"
        icon="mdi-pencil"
        variant="text"
        density="compact"
      />
    </template>

    <v-card :title="`Edit ${form.businessName}`">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <v-text-field
                v-model="form.businessName"
                label="Business Name"
                :rules="[required, rangeLength(3, 50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.contactName"
                label="Contact Name"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.vatNumber"
                label="VAT Number"
                :rules="[numeric, rangeLength(8, 8)]"
              />
            </v-row>
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-2"
            >
              {{ errorMessage }}
            </v-alert>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="indigo"
          text="Save"
          :loading="loading"
          :disabled="!validForm || loading"
          @click="saveSupplier"
        />
        <v-btn
          text="Cancel"
          color="red"
          :disabled="loading"
          @click="close"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, watch, defineProps } from 'vue';
import { usePartners } from '../composables/usePartners';
import { createAddress, createEmail, createPhone } from '@/domain/models/contact';
import { maxLength, numeric, rangeLength, required } from '../utils/validation';
import { useFormDialog } from '../composables/useFormDialog';
import { PartnerDTO } from '@/domain/models/partner';

const { editPartnerCommand } = usePartners();

const props = defineProps<{
  partner: PartnerDTO | null;
  mini: boolean;
}>();


const form = reactive({
  businessName: '',
  contactName: '',
  vatNumber: '',
  email: '',
  phone: '',
  address: ''
});

const {
  dialog, 
  formRef, 
  validForm,
  loading,
  errorMessage,
  close,
  submit
} = useFormDialog(form);

watch(dialog, (open) => {
    if(open && props.partner) {
      form.businessName = props.partner.businessName ?? "";
      form.contactName = props.partner.contactName;
      form.vatNumber = props.partner.vatNumber ?? "";

      const primaryEmail = props.partner.emails.find(e => e.isPrimary);
      form.email = primaryEmail ? primaryEmail.value : '';

      const primaryPhone = props.partner.phones.find(p => p.isPrimary);
      form.phone = primaryPhone ? primaryPhone.value : '';

      const primaryAddress = props.partner.addresses.find(a => a.isPrimary);
      form.address = primaryAddress ? primaryAddress.value : '';
    }
});

async function saveSupplier() {
  await submit(async (form) => {
    let emailList = [];
    if (form.email.trim() !== '') {
      emailList.push(createEmail(form.email, true));
    }

    let phoneList = [];
    if (form.phone.trim() !== '') {
      phoneList.push(createPhone(form.phone, true));
    }

    let addressList = [];
    if (form.address.trim() !== '') {
      addressList.push(createAddress(form.address, true));
    }

    editPartnerCommand(props.partner?.id ?? '', form.contactName, form.businessName, form.vatNumber);
  });
}
</script>

<style scoped>
</style>