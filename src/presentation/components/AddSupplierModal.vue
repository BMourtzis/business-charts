<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        :text="`${tCap('common.add')} ${tCap('partner.supplier')}`"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>
    <!-- κλήση προμηθευτή -->
    <v-card :title="`${tCap('common.add')} ${tCap('partner.supplier')}`">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <v-text-field
                v-model="form.businessName"
                :label="tCap('partner.businessName')"
                :rules="[required, rangeLength(3, 50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.contactName"
                :label="tCap('partner.contactName')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.vatNumber"
                :label="tCap('partner.vatNumber')"
                :rules="[numeric, rangeLength(8, 8)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.email"
                :label="`${tCap('common.primary')} ${t('partner.email')}`"
                placeholder="johndoe@gmail.com"
                type="email"
                :rules="[emailFormat]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.phone"
                :label="`${tCap('common.primary')} ${t('partner.phone')}`"
                placeholder="21080212345"
                type="tel"
                :rules="[phoneFormat]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.address"
                :label="`${tCap('common.primary')} ${t('partner.address')}`"
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
import { usePartners } from '../composables/usePartners';
import { createAddress, createEmail, createPhone } from '@/domain/models/contact';
import { emailFormat, maxLength, numeric, phoneFormat, rangeLength, required } from '../utils/validation';
import { useFormDialog } from '../composables/useFormDialog';
import { useLocalizationHelpers } from '../composables/useLocalization';

const { createSupplierCommand } = usePartners();

const { tCap, t } = useLocalizationHelpers();

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