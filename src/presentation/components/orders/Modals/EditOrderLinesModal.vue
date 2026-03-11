<template>
  <v-dialog 
    v-model="dialog" 
    max-width="1800"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-if="!mini"
        v-bind="activatorProps"
        color="indigo"
        :text="tCap('order.title.editOrderLineItems')"
        prepend-icon="mdi-invoice-text-edit-outline"
        variant="flat"
      />
      <v-btn
        v-if="mini"
        v-bind="activatorProps"
        color="indigo"
        icon="mdi-invoice-text-edit-outline"
        variant="text"
        density="compact"
      />
    </template>
    <v-card :title="tCap('order.title.editOrderLineItems')">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" class="d-flex justify-space-between align-center mb-4">
              <div></div>
              <v-btn
                color="indigo"
                :text="tCap('order.title.addOrderItem')"
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
          <v-row dense align="center">
            <v-col cols="1"></v-col>
            <v-spacer />
            <v-col cols="3">  
              <vat-calculator-field
                v-model="form.vatRate"
                :base-amount="totalAmountAllItems"
              />
            </v-col>
            <v-col cols="2">
              {{ tCap('order.amountAfterTax') }} 
              <strong>{{ numberPriceToGreekFormatLocale(totalAmountAllItemsWithTax) }}</strong>
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
          @click="editLineItems"
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
import vatCalculatorField from '@/presentation/components/shared/vatCalculatorField.vue';
import OrderItemEdit from './OrderItemEdit.vue';

import { computed, reactive } from 'vue';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import type { OrderEditVM } from '@/presentation/viewModels/orderVM';
import { useOrders } from '@/presentation/composables/order/useOrders';

import { orderVmToEditCmd } from '@/presentation/mappers/orderItemMapper';
import type { Order } from '@/domain/order/models/order';
import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';
import { OrderStatus } from '@/domain/order/orderTypes';
import { numberPriceToGreekFormatLocale } from '@/utlis/priceUtils';

const props = defineProps<{
  order: Order;
  mini: boolean;
}>();

const { editOrderLinesCommandHandler } = useOrders();

const { tCap } = useLocalizationHelpers();

const canEditLineItems = computed(() => 
  props.order.status === OrderStatus.Draft || props.order.status === OrderStatus.Approved
);

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

const totalQuantityAllItems = computed(() => {
  return form.items.reduce((sum, item) => {
    const itemQty = Object.values(item.sizing).reduce((a, b) => a + b, 0) ?? 0;
    return sum + itemQty;
  }, 0)
});

const form = reactive({
    id: props.order.id,
    type: 'Sales',
    partnerId: '',
    vatRate: .24,
    dueDate: null,
    notes: '',
    depositAmount: 0,
    discountAmount: 0,
    items: mapOrderLineItemsToVM([...props.order.items])
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

function addItem() {
  form.items.push({
      name: "",
      derivedSku: "",
      unitPrice: 0,
      productCode: "",
      variationSnapshot: {},
      sizing: {}
    });
}

async function editLineItems() {
  await submit(async (form) => {
    editOrderLinesCommandHandler.handle(orderVmToEditCmd(form));

    reset();
  });
}

</script>

<style lang="css" scoped></style>