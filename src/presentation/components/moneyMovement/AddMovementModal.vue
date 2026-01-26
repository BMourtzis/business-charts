<template>
  <v-dialog 
    v-model="dialog" 
    max-width="800"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="indigo"
        :text="tCap('moneyMovement.addMoneyMovement')"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>
        <v-card :title="tCap('moneyMovement.addMoneyMovement')">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container fluid>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="form.amount"
                  type="number"
                  :label="tCap('moneyMovement.amount')"
                  :rules="[required]"
                  :min="0"
                  step="0.01"
                  inputmode="decimal"
                  :suffix="getMonetarySign()"
                />
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="form.partnerId"
                  :item-props="partnersToItemProps"
                  :label="tCap('partner.partner')"
                  :items="partners"
                  :rules="[required]"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.method"
                  :label="tCap('moneyMovement.method')"
                  :items="paymentMethodTypes"
                  :rules="[required]"
                  item-title="title"
                  item-value="value"
                  :item-props="item => ({prependIcon: item.icon})"
                >
                  <template #selection="{ item }">
                    <v-icon class="mr-2">{{ item.raw.icon }}</v-icon>
                    {{ item.raw.title }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.reason"
                  :label="tCap('moneyMovement.reason')"
                  :items="movementReasonTypes"
                  :rules="[required]"
                  item-title="title"
                  item-value="value"
                >
                </v-select>
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
        <v-btn
          variant="tonal"
          color="warning"
          :text="tCap('common.clear')"
          @click="reset"
        />
        <v-spacer />
        <v-btn
          variant="tonal"
          color="indigo"
          :text="tCap('common.save')"
          :loading="loading"
          :disabled="!validForm || loading"
          @click="saveMoneyMovement"
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

import type { MoneyMovementEditVM } from '@/presentation/viewModels/moneyMovementVM';
import { getMonetarySign } from '@/utlis/priceUtils';

import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useMoneyMovementDetails } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import { useMoneyMovements } from '@/presentation/composables/moneyMovement/useMoneyMovements';
import { usePartners } from '@/presentation/composables/partner/usePartners';

const { partners, partnersToItemProps } = usePartners();

const { createMoneyMovementCommandHandler } = useMoneyMovements();

const { paymentMethodTypes, movementReasonTypes } = useMoneyMovementDetails()

const { 
  required
} = useValidationRules();

const { tCap } = useLocalizationHelpers();

const form = reactive({
  amount: null,
  partnerId: null,
  method: null,
  reason: null
} as MoneyMovementEditVM);

const {
  dialog, 
  formRef, 
  validForm,
  loading,
  errorMessage,
  close,
  reset,
  submit
} = useFormDialog(form);

//TODO: handle adjustment with the correct direction
async function saveMoneyMovement() {
  await submit(async (form) => {
    if(!form.amount || !form.partnerId || !form.method || !form.reason) return;

    await createMoneyMovementCommandHandler.handle({
      partnerId: form.partnerId,
      amount: Number(form.amount),
      method: form.method,
      reason: form.reason
    });
    reset();
  });
}
</script>

<style scoped>
</style>
