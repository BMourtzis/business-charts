<template>
  <v-dialog 
    v-model="isLocked" 
    max-width="500"
  >
    <v-card>
      <v-card-title>
        Data is encrypted
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
                  label="Password"
                  :rules="[required]"
                  type="password"
                />
              </v-col>
            </v-row>
            <!-- <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-2"
            >
              {{ errorMessage }}
            </v-alert> -->
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="primary"
          text="unlock"
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

const { required } = useValidationRules();

const { isLocked, unlock } = useVault();

const { tCap } = useLocalizationHelpers();

const form = ref({
  password: ""
});

const {
  formRef,
  validForm,
  loading,
} = useFormDialog(form); 

async function tryUnlock() {
  unlock(form.value.password);
}
</script>

<style lang="css" scoped>
</style>