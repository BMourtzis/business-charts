<template>
  <v-dialog 
    v-model="dialog" 
    max-width="800"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn 
        v-if="!mini" 
        v-bind="activatorProps" 
        color="surface-variant" 
        :text="tCap('order.editOrderTitle')"
        prepend-icon="mdi-pencil" 
        variant="flat" 
      />
      <v-btn 
        v-if="mini" 
        v-bind="activatorProps" 
        color="surface-variant" 
        icon="mdi-pencil"
        variant="text" 
        density="compact" 
      />
    </template>
    <v-card :title="tCap('order.editOrderTitle')">
      <v-card-text>
        <v-form
          ref="formRef"
          v-model="validForm"
        >
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
                <date-picker
                  v-model="form.dueDate"
                  :title="tCap('order.dueDate')"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.notes"
                  :label="tCap('order.notes')"
                  :rules="[maxLength(1000)]"
                  rows="4"
                  counter="1000"
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
          @click="editOrder"
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
import type { Order } from '@/domain/order/models/order';
import { useOrders } from '@/presentation/composables/order/useOrders';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useValidationRules } from '@/presentation/composables/useValidationRules';
import type { OrderEditVM } from '@/presentation/viewModels/orderVM';
import { reactive } from 'vue';
import DatePicker from '../shared/DatePicker.vue';

const { 
  maxLength
} = useValidationRules();

const props = defineProps<{
  order: Order;
  mini: boolean;
}>();

const { editOrderCommandHandler } = useOrders();

const { tCap } = useLocalizationHelpers();

const form = reactive({
    id: props.order.id,
    type: 'Sales',
    partnerId: '',
    vatRate: .24,
    dueDate: props.order.dueDate,
    notes: props.order.notes,
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

async function editOrder() {
  await submit(async (form) => {
    editOrderCommandHandler.handle({
      orderId: form.id ?? "",
      dueDate: form.dueDate ?? undefined,
      notes: form.notes
    });

    reset();
  });
}


</script>

<style lang="css" scoped></style>