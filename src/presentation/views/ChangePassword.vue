<template>
  <v-card>
    <v-card-title>
      {{ tCap('vault.changePassword') }}
    </v-card-title>
    <v-divider />

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
                v-model="form.oldPassword"
                :label="tCap('vault.oldPassword')"
                :rules="[required]"
                type="password"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="form.newPassword"
                :label="tCap('vault.newPassword')"
                :rules="[required]"
                type="password"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <PasswordStrength :password="form.newPassword" />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="form.confirmNewPassword"
                :label="tCap('vault.confirmNewPassword')"
                :rules="[required, sameAs(() => form.newPassword, 'validation.passwordsDoNotMatch')]"
                type="password"
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
          <v-alert
            v-if="successMessage"
            type="success"
            variant="tonal"
            density="compact"
            class="mt-2"
          >
            {{ successMessage }}
          </v-alert>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        variant="tonal"
        color="primary"
        :text="tCap('vault.changePassword')"
        :loading="loading"
        :disabled="loading"
        @click="tryChangePassword"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useVault } from '@/presentation/composables/useVault';

import PasswordStrength from '@/presentation/components/PasswordStrength.vue';

const { required, sameAs } = useValidationRules();

const { changePassword } = useVault();

const { tCap } = useLocalizationHelpers();

const errorMessage = ref("");
const successMessage = ref("");

const form = ref({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: ""
});

const {
  formRef,
  validForm,
  loading,
  submit,
  reset
} = useFormDialog(form); 

async function tryChangePassword() {
  await submit (async (form) => {
    errorMessage.value = "";
    try {
      await changePassword(form.value.oldPassword, form.value.newPassword);
      successMessage.value = tCap('vault.passwordChangedSuccess');
      reset();
    }
    catch(e) {
      if(e instanceof DOMException) {
        errorMessage.value = tCap('vault.decryptionError');
      } else {
        errorMessage.value = tCap('vault.wrongPassowrd');
      }
    }
  });
}
</script>

<style lang="css" scoped>
</style>