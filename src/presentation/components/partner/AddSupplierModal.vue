<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="indigo"
        :text="tCap('partner.addSupplierTitle')"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>
    <v-card :title="tCap('partner.addSupplierTitle')">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container
            class="pa-0" 
            fluid
          >
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="form.contactName"
                  :label="tCap('partner.contactName')"
                  :rules="[required, rangeLength(3, 50)]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.businessName"
                  :label="tCap('partner.businessName')"
                  :rules="[maxLength(50)]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.activity"
                  :label="tCap('partner.activity')"
                  :rules="[required, maxLength(50)]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  :label="tCap('contact.mainEmailField')"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  :rules="[emailFormat]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.phone"
                  :label="tCap('contact.mainPhoneField')"
                  placeholder="21080212345"
                  type="tel"
                  :rules="[phoneFormat]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.street"
                  :label="tCap('address.street')"
                  :rules="[maxLength(50)]"
                />
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.city"
                  :label="tCap('address.city')"
                  :rules="[maxLength(50)]"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="form.zip"
                  :label="tCap('address.zip')"
                  :rules="[maxLength(50)]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.country"
                  :label="tCap('address.country')"
                  :rules="[maxLength(50)]"
                />
              </v-col>
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
          :text="tCap('common.save')"
          :loading="loading"
          :disabled="!validForm || loading"
          @click="saveSupplier"
        />
        <v-btn
          :text="tCap('common.cancel')"
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

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { emailFormat, maxLength, phoneFormat, rangeLength, required } from '@/presentation/utils/validation';
import { AddressDTO } from '@/application/dto/contactDTO';

const { createSupplierCommandHandler } = usePartners();

const { tCap } = useLocalizationHelpers();

const form = reactive({
  businessName: '',
  contactName: '',
  activity: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  zip: '',
  country: ''
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
    let address = {} as AddressDTO;
    if(form.street && form.city) {
      address = {
        id: "",
        isPrimary: true,
        street: form.street,
        city: form.city,
        zip: form.zip,
        country: form.country
      };
    }

    createSupplierCommandHandler.handle({
      contactName: form.contactName, 
      activity: form.activity, 
      businessName: form.businessName, 
      email: form.email, 
      phone: form.phone, 
      address
    });
  });
}
</script>

<style scoped>
</style>