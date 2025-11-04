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
        :text="`Add ${label}`"
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

    <v-card :title="`Add ${label}`">
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
                label="Name"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-switch 
                v-model="form.isPrimary"
                label="Is Primary"
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
          @click="saveContact"
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
import { reactive, defineProps, computed } from 'vue';
import { usePartners } from '../composables/usePartners';
import { emailFormat, maxLength, phoneFormat, rangeLength, required } from '../utils/validation';
import { useFormDialog } from '../composables/useFormDialog';

const { addAddressCommand, addEmailCommand, addPhoneCommand } = usePartners();

const props = defineProps<{
  partnerId: string;
  contactType: "email" | "phone" | "address";
  mini: boolean;
}>();

const label = computed(() => {
  switch (props.contactType) {
    case "email":
      return "Email";
    case "phone":
      return "Phone";
    case "address":
      return "Address";
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