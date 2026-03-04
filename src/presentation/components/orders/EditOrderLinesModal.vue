<template>
  <v-dialog 
    v-model="dialog" 
    max-width="1800"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-if="!mini"
        v-bind="activatorProps"
        color="surface-variant"
        :text="tCap('order.editOrderLineItemsTitle')"
        prepend-icon="mdi-invoice-text-edit-outline"
        variant="flat"
      />
      <v-btn
        v-if="mini"
        v-bind="activatorProps"
        color="surface-variant"
        icon="mdi-invoice-text-edit-outline"
        variant="text"
        density="compact"
      />
    </template>
    <v-card :title="tCap('order.editOrderLineItemsTitle')">
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

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { reactive } from 'vue';
import type { OrderEditVM } from '@/presentation/viewModels/orderVM';
import { useOrders } from '@/presentation/composables/order/useOrders';

import { orderVmToEditCmd } from '@/presentation/mappers/orderItemMapper';
import type { Order } from '@/domain/order/models/order';
import { mapOrderLineItemsToVM } from '@/presentation/mappers/orderMapper';
import OrderItemEdit from './OrderItemEdit.vue';

const props = defineProps<{
  order: Order;
  mini: boolean;
}>();

const { editOrderLinesCommandHandler } = useOrders();

const { tCap } = useLocalizationHelpers();

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