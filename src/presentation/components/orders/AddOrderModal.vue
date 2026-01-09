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
              <v-col cols="2">
                <v-text-field
                  :model-value="form.vatRate * 100"
                  @update:model-value="val => form.vatRate = Number(val) / 100"
                  type="number"
                  :label="tCap('order.vatRate')"
                  :rules="[required, numeric]"
                  min="0"
                  max="100"
                  step="1"
                  suffix="%"
                />
              </v-col>
              <v-col cols="12" class="d-flex justify-space-between align-center mb-4">
                <h3>{{ tCap('order.items') }}</h3>
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
              <v-expansion-panels >
                <order-item-edit 
                  v-for="(orderItem, index) in form.items"
                  :key="orderItem.id"
                  v-model="form.items[index]"
                  @removeItem="removeItem(orderItem.id)"
                />
              </v-expansion-panels>
            </v-row>
            <v-row class="mb-4" justify="end" align="center">
              <v-col cols="auto">
                <strong>{{ tCap('order.totalQuantity') }}:</strong> {{ totalQuantityAllItems }}
              </v-col>
              <v-col cols="auto">
                <strong>{{ tCap('order.totalAmount') }}:</strong> {{ totalAmountAllItems.toFixed(2) }} €
              </v-col>
            </v-row>
            <v-row class="mb-4" justify="end" align="center">
              <strong>{{ tCap('order.taxRate') }}:</strong> {{ taxAmount.toFixed(2) }} €
            </v-row>
            <v-row class="mb-4" justify="end" align="center">
              <strong>{{ tCap('order.totalAmount') }}:</strong> {{ totalAmount.toFixed(2) }} €
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
import { computed, reactive, watch } from 'vue';
import { v4 as uuidv4 } from "uuid";

import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useValidationRules } from '@/presentation/composables/useValidationRules';

import OrderItemEdit from './OrderItemEdit.vue';
import { OrderItemEditVM } from '@/presentation/viewModels/orderItemEditVM';
import { dtoToVM } from '@/presentation/mappers/orderItemMapper';

const { 
  maxLength, 
  required, 
  numeric
} = useValidationRules();

const { createDebitOrderCommand, createCreditOrderCommand, partners, partnersToItemProps } = useOrders();

const { tCap } = useLocalizationHelpers();

const directions = ["Credit", "Debit"];

const form = reactive({
    direction: '',
    partnerId: '',
    vatRate: .24,
    items: [] as OrderItemEditVM[]
});

const {
  dialog, 
  validForm,
  loading,
  errorMessage,
  close,
  submit
} = useFormDialog(form);

watch(
  () => form.items,
  () => {
    console.log("Order items updated", form.items);
  },
  { deep: true }
)

function addItem() {
  form.items.push(
    dtoToVM({
      id: uuidv4(),
      name: "",
      basePrice: 0.00,
      variations: []
    })
  );
}

const totalQuantityAllItems = computed(() => {
  return form.items.reduce((sum, item) => {
    const itemQty = item.variations?.reduce(
      (s, v) => s + Object.values(v.sizing).reduce((a, b) => a + b, 0),
      0
    ) ?? 0;
    return sum + itemQty;
  }, 0)
}
);

// total amount across all items
const totalAmountAllItems = computed(() =>
  form.items.reduce((total, item) => {
    const itemTotal = item.variations?.reduce(
      (sum, variation) => {
        const variationQuantity = Object.values(variation.sizing).reduce((a, b) => a + b, 0);
        return sum + variationQuantity * variation.price;  // variation now has price
      },
      0
    ) ?? 0;

    return total + itemTotal;
  }, 0)
);


const taxAmount = computed(() => {
  const totalWithoutTax = totalAmountAllItems.value;
  return totalWithoutTax * form.vatRate;
});

const totalAmount = computed(() => {
  return totalAmountAllItems.value + taxAmount.value;
});

function removeItem(id: string) {
  const itemIndex = form.items.findIndex(e => e.id === id);

  if(itemIndex == -1) return;

  form.items.splice(itemIndex, 1);
}

async function saveOrder() {
  await submit(async (form) => {
    console.log(form);
    if(form.direction === 'credit') {
        createCreditOrderCommand(form.partnerId);
    } else if (form.direction === 'debit') {
        createDebitOrderCommand(form.partnerId);
    }

  });
}

</script>

<style scoped>
  .button-alignement {
    margin-bottom: 15px;
  }
</style>