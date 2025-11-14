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
import { defineProps, computed, watch, PropType } from 'vue';

import { Contact } from '@/domain/contact/models/contact';

import { usePartners } from '@/presentation/composables/usePartners';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useContactForm } from '@/presentation/composables/useContactForm';
import { emailFormat, maxLength, phoneFormat, required } from '@/presentation/utils/validation';
const { addEmailCommandHandler, addPhoneCommandHandler, editEmailCommandHandler, editPhoneCommandHandler } = usePartners();

const { tCap } = useLocalizationHelpers();

//TODO: later it will need to be used by deliveryCarrier
const props = defineProps({
  partnerId: {
    type: String,
    required: true
  },
  contactType: {
    type: String as PropType<'email' | 'phone'>,
    required: true,
    validator: (value: string) => ['email', 'phone'].includes(value)
  },
  contact: {
    type: Contact,
    required: false,
    default: null
  },
  mini: {
    type: Boolean,
    required: false,
    default: false
  }
});

const { form } = useContactForm(props.contactType);

const isEditMode = computed(() => !!props.contact)

const rule = computed(() => {
  switch (props.contactType) {
    case "email":
      return emailFormat;
    case "phone":
      return phoneFormat;
    default:
      return required;
  }
});

const label = computed(() => {
  let modeLabel = tCap('common.add');
  if (isEditMode.value) {
    modeLabel = tCap('common.edit');
  }

  let typeLabel = tCap('partner.email');
  if (props.contactType === "phone") {
    typeLabel = tCap('partner.phone');
  }

  return `${modeLabel} ${typeLabel}`;
});

const dialogTitle = computed(() => {
  if(props.contactType === "email") {
    if (isEditMode.value) {
      return tCap('partner.editEmail');
  }
    return tCap('partner.addEmail');
  }

  if (isEditMode.value) {
    return tCap('partner.editPhone');
  }
  return tCap('partner.addPhone');
});

const modeIcon = computed(() => {
  if (isEditMode.value) {
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
  if (open && props.contact) {
    form.value = props.contact.value;
    form.name = props.contact.name ?? "";
    form.isPrimary = props.contact.isPrimary;
  }
});

async function saveContact() {
  await submit(async (form) => {
    if(props.contactType === "email") {
      if (props.contact) {
        await editEmailCommandHandler.handle({
          partnerId: props.partnerId,
          emailId: props.contact.id,
          email: form.value,
          name: form.name,
          isPrimary: form.isPrimary
        });
      } else {
        await addEmailCommandHandler.handle({
          partnerId: props.partnerId,
          email: form.value,
          name: form.name,
          isPrimary: form.isPrimary
        });
      }
    } else {
      if (props.contact) {
        await editPhoneCommandHandler.handle({
          partnerId: props.partnerId,
          phoneId: props.contact.id,
          phone: form.value,
          name: form.name,
          isPrimary: form.isPrimary
        });
      } else {
        await addPhoneCommandHandler.handle({
          partnerId: props.partnerId,
          phone: form.value,
          name: form.name,
          isPrimary: form.isPrimary
        });
      }
    }


  });
}
</script>

<style scoped></style>