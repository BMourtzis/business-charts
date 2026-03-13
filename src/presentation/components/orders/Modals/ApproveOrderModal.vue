<template>
  <v-dialog 
    v-model="isOpen" 
    max-width="420"
  >
    <v-card :title="tCap('order.title.approveOrder')">
      <v-card-text>
        <v-form
          ref="formRef"
          v-model="validForm"
        >
        <v-switch 
          v-model="withPayment" 
          :label="tCap('order.title.withPayment')"
          color="primary"
        />
        <template v-if="withPayment">
          <v-text-field 
            v-model.number="form.amount" 
            :label="tCap('order.deposit')" 
            type="number" 
            :min="0" 
            step="0.01"
            inputmode="decimal" 
            :suffix="getMonetarySign()" 
            :rules="[required]"
            autofocus 
          />
          <v-select
            v-model="form.method"
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
        </template>
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
        <v-btn variant="text" @click="close" color="red">
          {{ tCap('common.cancel') }}
        </v-btn>
        <v-btn 
          color="indigo" 
          :loading="isExecuting"
          @click="confirm"
        >
          {{ tCap('order.title.approve') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

import { ref, reactive } from 'vue';

import { getMonetarySign } from '@/utlis/priceUtils';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useMoneyMovementTypes } from '@/presentation/composables/moneyMovement/useMoneyMovementDetails';
import type { ApproveOrderInput } from '@/presentation/components/orders/Details/OrderDetailsHeaderStatus.vue';

import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useFormDialog } from '@/presentation/composables/useFormDialog';

const { tCap } = useLocalizationHelpers();
const { paymentMethodTypes } = useMoneyMovementTypes();

const isOpen = ref(false);
const isExecuting = ref(false);
const withPayment = ref(true);

const { 
  required
} = useValidationRules();

const form = reactive({
  amount: 0,
  method: null
});

const {
  formRef,
  validForm,
  errorMessage,
  reset,
  submit
} = useFormDialog(form, {autoReset: false});

let onConfirm: ((input: ApproveOrderInput) => Promise<void>) | null = null;

function open(options: {
  initialInput?: Partial<ApproveOrderInput>;
  onConfirm: (input: ApproveOrderInput) => Promise<void>;
}) {
  
  const inputAmount = options.initialInput?.amount ?? 0;
  form.amount = Number(inputAmount.toFixed(2));
  onConfirm = options.onConfirm;
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

async function confirm() {
  console.log("here")
  await submit(async(form) => {
      if(!onConfirm) return;
      isExecuting.value = true;

      try {
        console.log("here", form.amount, form.method);
        await onConfirm({ 
          amount: form.amount, 
          method: form.method 
        });

        close();
        reset();
      } catch(e) {
        if(e instanceof Error) {
          errorMessage.value = e.message;
        }
      } finally {
        isExecuting.value = false;
      }
  });
}

defineExpose({ open });
</script>
