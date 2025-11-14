<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn 
        v-if="!mini"
        v-bind="activatorProps"
        :color="isEditMode ? 'indigo' : 'success'"
        :text="label"
        :prepend-icon="modeIcon"
        variant="flat"
      />
      <v-btn 
        v-if="mini"
        v-bind="activatorProps"
        :color="isEditMode ? 'indigo' : 'success'"
        :icon="modeIcon"
        variant="text"
        density="compact"
      />
    </template>

    <v-card :title="dialogTitle">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <v-text-field
                v-model="form.street"
                :label="tCap('partner.street')"
                :rules="[required, maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.city"
                :label="tCap('partner.city')"
                :rules="[required, maxLength(50)]"
              />
              <v-text-field
                v-model="form.zip"
                :label="tCap('partner.zip')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.country"
                :label="tCap('partner.country')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.name"
                :label="tCap('common.name')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-switch 
                v-model="form.isPrimary"
                :label="tCap('common.primary_gen')"
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
          @click="saveAddress"
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
import { defineProps, computed, watch, PropType } from 'vue';

import { Address } from '@/domain/contact/models/address';

import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useAdressForm } from '@/presentation/composables/useContactForm';
import { maxLength, required } from '@/presentation/utils/validation';
import { useAddressHandlers, AddressOwnerType } from '../composables/useAddressHandlers';

const { tCap } = useLocalizationHelpers();

const props = defineProps({
  partnerId: {
    type: String,
    required: true
  },
  ownerType: {
    type: String as PropType<AddressOwnerType>,
    required: true
  },
  address: {
    type: Address,
    required: false,
    default: null
  },
  mini: {
    type: Boolean,
    required: false,
    default: false
  }
})

const { form } = useAdressForm();

const isEditMode = computed(() => !!props.address)

const label = computed(() => {
  let modeLabel = tCap('common.add');
  if(isEditMode.value) {
    modeLabel = tCap('common.edit');
  }
  return `${modeLabel} ${tCap('partner.address')}`;
});

const dialogTitle = computed(() => {
  if(isEditMode.value) {
    return tCap('partner.editAddress');
  }
  return tCap('partner.addAddress');
});

const modeIcon = computed(() => {
  if(isEditMode.value) {
    return "mdi-pencil";
  }
  return "mdi-plus";
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
  if(open && props.address) {
    form.street = props.address.street;
    form.city = props.address.city;
    form.zip = props.address.zip;
    form.country = props.address.country;
    form.name = props.address.name ?? "";
    form.isPrimary = props.address.isPrimary;
  }
});

const { add, edit } = useAddressHandlers(props.ownerType);

async function saveAddress() {
  await submit(async (form) => {
    if(props.address) {
      await edit({
        ownerId: props.partnerId,
        addressId: props.address.id,
        street: form.street,
        city: form.city,
        zip: form.zip,
        country: form.country,
        name: form.name,
        isPrimary: form.isPrimary
      });
    } else {
      await add({ 
          ownerId: props.partnerId, 
          street: form.street,
          city: form.city,
          zip: form.zip,
          country: form.country,
          name: form.name,
          isPrimary: form.isPrimary
      });
    }
  });
}
</script>

<style scoped>
</style>