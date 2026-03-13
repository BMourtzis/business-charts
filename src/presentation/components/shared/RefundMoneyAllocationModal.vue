<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <template #activator="{props: activatorProps }">
      <v-tooltip
        :text="tCap('order.title.reserveAllocation')"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="{...activatorProps, ...props }"
            color="indigo"
            icon="mdi-arrow-u-left-bottom"
            variant="text"
            density="compact"
          />
        </template>
      </v-tooltip>
    </template>
    <v-card :title="tCap('order.title.reserveAllocation')">
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
                  :max="remainingAmount"
                  step="0.01"
                  inputmode="decimal"
                  :suffix="getMonetarySign()"
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
          @click="saveAllocationRefund"
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
import { getRemainingAllocatedAmount } from '@/presentation/composables/order/useOrderDetails';
import { useOrders } from '@/presentation/composables/order/useOrders';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { getMonetarySign } from '@/utlis/priceUtils';
import { computed, reactive } from 'vue';

const {
  refundAllocationCommandHandler 
} = useOrders();

const props = defineProps<{
  allocationId: string,
  orderId: string,
}>();

const { 
  required
} = useValidationRules();

const { tCap } = useLocalizationHelpers();

const remainingAmount = computed(() =>  
  getRemainingAllocatedAmount(props.orderId, props.allocationId)
);

const form = reactive({
  amount: getRemainingAllocatedAmount(props.orderId, props.allocationId)
});

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

async function saveAllocationRefund() {
  await submit(async (form) => {
    if(!form.amount) return;
    
    if(form.amount > remainingAmount.value) {
      validForm.value = false;
      errorMessage.value = "amount larger than remaining amount"
      return;
    }

    await refundAllocationCommandHandler.handle({
      orderId: props.orderId,
      refundAmount: Number(form.amount),
      allocationId: props.allocationId
    });
    reset();
  });
}
</script>