<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Add Supplier"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>

    <v-card title="Add Supplier">
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
            <v-row>
              <v-text-field
                v-model="form.email"
                label="Primary Email"
                placeholder="johndoe@gmail.com"
                type="email"
                :rules="[emailFormat]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.phone"
                label="Primary Phone"
                placeholder="21080212345"
                type="tel"
                :rules="[phoneFormat]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.address"
                label="Primary Address"
                :rules="[maxLength(50)]"
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
import { reactive } from 'vue';
import { usePartners } from '../composables/usePartners';
import { createAddress, createEmail, createPhone } from '@/domain/models/contact';
import { emailFormat, maxLength, numeric, phoneFormat, rangeLength, required } from '../utils/validation';
import { useFormDialog } from '../composables/useFormDialog';

const { createSupplierCommand } = usePartners();

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

    createSupplierCommand(form.contactName, emailList, phoneList, addressList, form.businessName, form.vatNumber);
  });
}
</script>

<style scoped>
</style>