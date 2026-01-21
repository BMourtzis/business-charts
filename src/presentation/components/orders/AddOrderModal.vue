<template>
  <v-dialog 
    v-model="dialog" 
    max-width="1500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        :text="tCap('order.addOrderTitle')"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>
    <v-card :title="tCap('order.addOrderTitle')">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container fluid>
            <v-row dense>
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
                  v-model="form.direction"
                  :label="tCap('order.direction')"
                  :items="directions"
                  :rules="[required]"
                />
              </v-col>
              <v-col cols="6">
                <date-picker
                  v-model="form.dueDate"
                  :title="tCap('order.dueDate')"
                />
              </v-col>
              <v-col cols="12" class="d-flex justify-space-between align-center mb-4">
                <h3>{{ tCap('order.items', 2) }}</h3>
                <v-btn
                  color="indigo"
                  :text="tCap('order.addOrderItemTitle')"
                  prepend-icon="mdi-plus"
                  variant="text"
                  @click="addItem"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <order-item-edit 
                v-model="form.items"
              />
            </v-row>
            <v-row class="mb-4" justify="end" align="center">
              <v-col cols="auto">
                {{ tCap('order.orderQuantity') }}: <strong>{{ totalQuantityAllItems }}</strong>
              </v-col>
              <v-col cols="auto">
                {{ tCap('order.orderSum') }} 
                <strong>{{ numberPriceToGreekFormatLocale(totalAmountAllItems) }}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-textarea
                  v-model="form.notes"
                  :label="tCap('order.notes')"
                  :rules="[maxLength(1000)]"
                  rows="4"
                  counter="1000"
                />
              </v-col>
              <v-col dense cols="6">
                <v-row class="mb-4" justify="end" align="center">
                  <v-col cols="6">
                    <vat-calculator-field
                      v-model="form.vatRate"
                      :base-amount="totalAmountAllItems"
                    />
                  </v-col>
                  <v-col cols="4">
                    {{ tCap('order.amountAfterTax') }} 
                    <strong>{{ numberPriceToGreekFormatLocale(totalAmountAllItemsWithTax) }}</strong>
                  </v-col>
                </v-row>
                <v-row class="mb-4" justify="end" align="center">
                  <v-col cols="6">
                    <amount-adjustment-field
                      v-model="form.discountAmount"
                      :base-amount="totalAmountAllItemsWithTax"
                      :label="tCap('order.discount')"
                    />
                  </v-col>
                  <v-col cols="4">
                    {{ tCap('order.total') }}: 
                    <strong>{{ numberPriceToGreekFormatLocale(totalAmount) }}</strong>
                  </v-col>
                </v-row>
                <v-row class="mb-4" justify="end" align="center">
                  <v-col cols="6">
                    <amount-adjustment-field
                      v-model="form.depositAmount"
                      :base-amount="totalAmount"
                      :label="tCap('order.deposit')"
                    />
                  </v-col>
                  <v-col cols="4">
                    {{ tCap('order.remainingAmount') }}: 
                    <strong>{{ numberPriceToGreekFormatLocale(totalAmountAfterDeposit) }}</strong>
                  </v-col>
                </v-row>
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
          @click="saveOrder"
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
import { computed, nextTick, reactive, ref } from 'vue';

import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useValidationRules } from '@/presentation/composables/useValidationRules';

import OrderItemEdit from './OrderItemEdit.vue';
import { orderVmToCmd } from '@/presentation/mappers/orderItemMapper';

import AmountAdjustmentField from '../shared/AmountAdjustmentField.vue';
import VatCalculatorField from '../shared/vatCalculatorField.vue';
import DatePicker from '../shared/DatePicker.vue';
import { numberPriceToGreekFormatLocale } from '@/utlis/priceUtils';
import type { OrderEditVM } from '@/presentation/viewModels/orderVM';

const { 
  maxLength, 
  required
} = useValidationRules();

const { createCreditOrderCommmandHandler, partners, partnersToItemProps } = useOrders();

const { tCap } = useLocalizationHelpers();

const directions = ["Credit", "Debit"];

const form = reactive({
    direction: 'Credit',
    partnerId: '',
    vatRate: .24,
    dueDate: null,
    notes: '',
    depositAmount: 0,
    discountAmount: 0,
    items: []
} as OrderEditVM);

const {
  dialog, 
  formRef,
  validForm,
  loading,
  errorMessage,
  close,
  reset,
  submit
} = useFormDialog(form, {autoReset: false});

const openPanels = ref<number[]>([]);

function addItem() {
  form.items.push({
      name: "",
      derivedSku: "",
      unitPrice: 0,
      productCode: "",
      variationSnapshot: {},
      sizing: {}
    });

  nextTick(() => {
    openPanels.value.push(form.items.length -1);
  });
}

const totalQuantityAllItems = computed(() => {
  return form.items.reduce((sum, item) => {
    const itemQty = Object.values(item.sizing).reduce((a, b) => a + b, 0) ?? 0;
    return sum + itemQty;
  }, 0)
});

// total amount across all items
const totalAmountAllItems = computed(() =>
  form.items.reduce((total, item) => {
    const itemQty = Object.values(item.sizing).reduce((a, b) => a + b, 0) ?? 0;
    const itemTotal = itemQty * item.unitPrice;

    return total + itemTotal;
  }, 0)
);


const taxAmount = computed(() => {
  return totalAmountAllItems.value * form.vatRate;
});

const totalAmountAllItemsWithTax = computed(() => {
  return totalAmountAllItems.value + taxAmount.value;
});

const totalAmount = computed(() => {
  return totalAmountAllItemsWithTax.value - form.discountAmount;
});

const totalAmountAfterDeposit = computed(() => {
  return totalAmount.value - form.depositAmount;
});

async function saveOrder() {
  await submit(async (form) => {
    if(form.direction === 'Credit') {
      createCreditOrderCommmandHandler.handle(orderVmToCmd(form));
    }

    reset();
  });
}

</script>

<style scoped>
  .button-alignement {
    margin-bottom: 15px;
  }

  .date-picker-wrapper {
  display: flex;
  flex-direction: column;
}

.v-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}
.date-btn {
  justify-content: flex-start; /* aligns text to left like v-text-field */
  padding: 0;
}
</style>