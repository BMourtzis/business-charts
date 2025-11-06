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
        :text="`${tCap('common.add')} ${label}`"
        prepend-icon="mdi-plus"
        variant="flat"
      />
      <v-btn
        v-if="mini"
        v-bind="activatorProps"
        color="indigo"
        icon="mdi-plus"
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
                v-model="form.value"
                :label="label"
                type="email"
                :rules="[rule]"
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
                :label="primaryTitle"
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
          @click="saveContact"
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
import { reactive, defineProps, computed } from 'vue';

import { usePartners } from '@/presentation/composables/usePartners';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { emailFormat, maxLength, phoneFormat, rangeLength, required } from '@/presentation/utils/validation';

const { addAddressCommand, addEmailCommand, addPhoneCommand } = usePartners();

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  partnerId: string;
  contactType: "email" | "phone" | "address";
  mini: boolean;
}>();

const label = computed(() => {
  switch (props.contactType) {
    case "email":
      return tCap('partner.email');
    case "phone":
      return tCap('partner.phone');
    case "address":
      return tCap('partner.address');
    default:
      return "";
    }
});

const rule = computed(() => {
  switch (props.contactType) {
    case "email":
      return emailFormat;
    case "phone":
      return phoneFormat;
    case "address":
      return rangeLength(3, 50);
    default:
      return required;
    }
});

const dialogTitle = computed(() => {
  switch (props.contactType) {
    case "email":
      return tCap('partner.addEmail');
    case "phone":
      return tCap('partner.addPhone');
    case "address":
      return tCap('partner.addAddress');
    default:
      return "";
    }
});

const primaryTitle = computed(() => {
  if(props.contactType === "address")
    return tCap('common.primary_gen');
  return tCap('common.primary');
});


const form = reactive({
  name: '',
  value: '',
  isPrimary: false
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

async function saveContact() {
  await submit(async (form) => {
    switch (props.contactType) {
        case "email":
            await addEmailCommand(props.partnerId, form.value, form.name, form.isPrimary);
            break;
        case "phone":
            await addPhoneCommand(props.partnerId, form.value, form.name, form.isPrimary);
            break;
        case "address":
            await addAddressCommand(props.partnerId, form.value, form.name, form.isPrimary);
            break;
        default:
            return;
        }
  });
}
</script>

<style scoped>
</style>