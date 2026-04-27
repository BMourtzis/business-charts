<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-tooltip
        :text="tCap('order.title.addAllocation')"
        location="bottom"
      >
        <template #activator="{props}">
          <v-btn
            v-bind="{...activatorProps, ...props}"
            color="indigo"
            icon="mdi-plus"
            variant="text"
            density="compact"
          />
        </template>
      </v-tooltip>
    </template>
    <v-card
      :title="tCap('order.title.addAllocation')"
    >
      <v-card-text>
        <v-form
          ref="formRef"
          v-model="validForm"
        >
          <v-row dense>
            <v-col cols="12">
              <v-switch 
                v-model="existingMovement" 
                :label="tCap('order.title.existingMovement')"
                color="primary"
              />
            </v-col>
            <v-col cols="12" v-if="existingMovement">
              <v-select
                v-model="form.movementId"
                :label="tCap('order.title.selectMovement')"
                :items="[]"
                :item-props="itemProps"
              />
            </v-col>
            <v-col cols="6" v-if="!existingMovement">
              <v-text-field 
                v-model.number="form.movementAmount" 
                :label="tCap('order.moneyMovementAmount')" 
                type="number" 
                :min="0" 
                step="0.01"
                inputmode="decimal" 
                :suffix="getMonetarySign()" 
                :rules="[required]"
                autofocus 
              />
            </v-col>
            <v-col cols="6" v-if="!existingMovement">
              <v-select
                v-model="form.movementMethod"
                :label="tCap('moneyMovement.method')"
                :items="paymentMethodTypes"
                item-title="title"
                item-value="value"
                :rules="[required]"
                :item-props="item => ({prependIcon: item.icon})"
              >
                <template #selection="{ item }">
                  <v-icon class="mr-2">{{ item.raw.icon }}</v-icon>
                  {{ item.raw.title }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field 
                v-model.number="form.movementAmount" 
                :label="tCap('order.allocatoinAmount')" 
                type="number" 
                :min="0" 
                step="0.01"
                inputmode="decimal" 
                :suffix="getMonetarySign()" 
                :rules="[required]"
                autofocus 
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
          @click="saveAllocation"
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
import type { MoneyMovement } from '@/domain/payment/models/moneyMovement';
import { useMoneyMovementTypes } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { getDate } from '@/presentation/composables/useUtils';
import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { getMonetarySign } from '@/utlis/priceUtils';
import { reactive, ref } from 'vue';


const { tCap } = useLocalizationHelpers();

const { 
  required
} = useValidationRules();

const { paymentMethodTypes } = useMoneyMovementTypes();

const props = defineProps<{
  partnerId: string;
  movementId?: string;
}>();

const existingMovement = ref(false);

const form = reactive({
  movementId: null,
  movementAmount: 0,
  movementMethod: null,
  allocationAmount: 0,
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

function itemProps(item: MoneyMovement) {
    return {
        title: item.movementNumber,
        value: item.id,
        subtitle: getDate(item.createdDate)
    }
}

async function saveAllocation() {
  await submit(async (form) => {

  });
}

</script>