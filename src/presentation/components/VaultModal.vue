<template>
  <v-dialog 
    v-model="isLocked" 
    max-width="500"
  >
    <v-card>
      <v-card-title>
        {{ tCap('vault.enterPassword') }}
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
                  v-model="form.password"
                  :label="tCap('common.password')"
                  :rules="[required]"
                  type="password"
                />
              </v-col>
            </v-row>
            <v-row 
              v-if="isInitialSetup" 
              dense
            >
              <v-col cols="12">
                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  :rules="[required, sameAs(() => form.password, 'validation.passwordsDoNotMatch')]"
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
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="primary"
          :text="tCap('vault.unlock')"
          :loading="loading"
          :disabled="loading"
          @click="tryUnlock"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useVault } from '@/presentation/composables/useVault';

const { required, sameAs } = useValidationRules();

const { isLocked, unlock, isInitialSetup } = useVault();

const { tCap } = useLocalizationHelpers();

const errorMessage = ref("");

const form = ref({
  password: "",
  confirmPassword: ""
});

const {
  formRef,
  validForm,
  loading,
  submit
} = useFormDialog(form); 

async function tryUnlock() {
  await submit (async (form) => {
    try {
      await unlock(form.value.password);
      form.value.password = "";
      form.value.confirmPassword = "";
      errorMessage.value = "";
    }
    catch(e) {
      console.log(e);
      errorMessage.value = tCap('vault.decryptionError')
    }
  });
}
</script>

<style lang="css" scoped>
</style>