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
        :text="dialogTitle" 
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
              <v-col cols="12">
                <v-text-field 
                  v-model="form.value" 
                  :label="contactTypLabel" 
                  type="email" 
                  :rules="[rule]" 
                />
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  v-model="form.name" 
                  :label="tCap('common.name')" 
                  :rules="[maxLength(50)]" 
                />
              </v-col>
              <v-col cols="12">
                <v-switch 
                  v-model="form.isPrimary" 
                  :label="tCap('common.primary_gen')" 
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
import { computed, watch, type PropType } from 'vue';

import { Contact } from '@/domain/contact/models/contact';
import { ContactType } from '@/domain/contact/contactTypes';

import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useContactForm } from '@/presentation/composables/contact/useContactForm';
import { type AddressOwnerType } from '@/presentation/composables/contact/useAddressHandlers';
import { useContactHandlers } from '@/presentation/composables/contact/useContactHandlers';
import { useValidationRules } from '@/presentation/composables/useValidationRules';

const { maxLength, required, emailFormat, phoneFormat } = useValidationRules();

const { tCap } = useLocalizationHelpers();

const props = defineProps({
  ownerId: {
    type: String,
    required: true
  },
  contactType: {
    type: String as PropType<ContactType>,
    required: true,
    validator: (value: ContactType) =>
      Object.values(ContactType).includes(value)
  },
  ownerType: {
    type: String as PropType<AddressOwnerType>,
    required: true
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
    case ContactType.Email:
      return emailFormat;
    case ContactType.Phone:
      return phoneFormat;
    default:
      return required;
  }
});

const contactTypLabel = computed(() => {
  if (props.contactType === ContactType.Phone) {
    return tCap('contact.phone');
  }
  return tCap('contact.email');
})

const dialogTitle = computed(() => {
  if(props.contactType === ContactType.Email) {
    if (isEditMode.value) {
      return tCap('contact.editEmail');
  }
    return tCap('contact.addEmail');
  }

  if (isEditMode.value) {
    return tCap('contact.editPhone');
  }
  return tCap('contact.addPhone');
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

const { add, edit } = useContactHandlers(props.ownerType, props.contactType);

async function saveContact() {
  await submit(async (form) => {
    if (props.contact) {
      await edit({
        ownerId: props.ownerId,
        contactId: props.contact.id,
        value: form.value,
        name: form.name,
        isPrimary: form.isPrimary
      });
    } else {
      await add({
        ownerId: props.ownerId,
        value: form.value,
        name: form.name,
        isPrimary: form.isPrimary
      });
    }
  });
}
</script>

<style scoped></style>