<template>
  <v-dialog 
    v-model="dialog" 
    max-width="1200"
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
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.partnerId"
                  :item-props="partnersToItemProps"
                  :label="tCap('partner.partner')"
                  :items="partners"
                  :rules="[required]"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.direction"
                  :label="tCap('order.direction')"
                  :items="directions"
                  :rules="[required]"
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
            <v-row 
              v-for="(orderItem, index) in form.items"
              dense
            >
              <v-col cols="5">
                <v-text-field
                  v-model="orderItem.name"
                  :label="tCap('order.product')"
                  :rules="[required, maxLength(50)]"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="orderItem.basePrice"
                  :label="tCap('order.basePrice')"
                  :rules="[required, numeric]"
                  min="0"
                  step="0.01"
                  suffix="€"
                />
              </v-col>
              <v-col cols="1">
                <v-text-field
                  v-model="orderItem.quantity"
                  :label="tCap('order.quantity')"
                  :rules="[required, numeric]"
                  min="0"
                  step="1"
                />
              </v-col>
              <v-col cols="1">
                <v-text-field
                  :model-value="orderItem.vatRate * 100"
                  @update:model-value="val => orderItem.vatRate = Number(val) / 100"
                  type="number"
                  :label="tCap('order.vatRate')"
                  :rules="[required, numeric]"
                  min="0"
                  max="100"
                  step="1"
                  suffix="%"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  readonly
                  :value="lineAmount(orderItem)"
                  :label="tCap('order.total')"
                  suffix="€"
                />
              </v-col>
              <v-col cols="1" class="button-alignement" align-self="center">
                <v-btn
                  class="justify-end"
                  icon="mdi-trash-can"
                  color="error"
                  variant="text"
                  @click="removeItem(orderItem.id)"
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
import { reactive } from 'vue';
import { v4 as uuidv4 } from "uuid";

import { OrderItemDTO } from "@/application/dto/orderDTO";

import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';

import { useValidationRules } from '@/presentation/composables/useValidationRules';

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
    items: [] as OrderItemDTO[]
});

const {
  dialog, 
  validForm,
  loading,
  errorMessage,
  close,
  submit
} = useFormDialog(form);

function addItem() {
  form.items.push({
    id: uuidv4(),
    name: "",
    quantity: 1,
    basePrice: 0.00,
    vatRate: .24
  });
}

function lineAmount(item: OrderItemDTO) {
  const amount = (item.basePrice * item.quantity * (1 + item.vatRate)).toFixed(2);
  console.log(amount);
  return (item.basePrice * item.quantity * (1 + item.vatRate)).toFixed(2);
}
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