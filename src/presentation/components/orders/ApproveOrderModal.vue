<template>
  <v-dialog v-model="isOpen" max-width="420">
    <v-card>
      <v-card-title>{{ tCap('order.approveOrderTitle') }}</v-card-title>

      <v-card-text>
        <v-text-field 
          v-model.number="amount" 
          :label="tCap('order.deposit')" 
          type="number" 
          :min="0" 
          step="0.01"
          inputmode="decimal" 
          :suffix="getMonetarySign()" 
          autofocus 
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">
          {{ tCap('common.cancel') }}
        </v-btn>
        <v-btn color="indigo" @click="confirm">
          {{ tCap('order.approveBtn') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { ApproveOrderInput } from './OrderDetailsHeaderStatus.vue';

import { ref } from 'vue';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { getMonetarySign } from '@/utlis/priceUtils';

const { tCap } = useLocalizationHelpers();

const isOpen = ref(false);
const amount = ref<number>(0);

let onConfirm: ((input: ApproveOrderInput) => void) | null = null;

function open(options: {
  initialInput?: Partial<ApproveOrderInput>;
  onConfirm: (input: ApproveOrderInput) => void;
}) {
  onConfirm = options.onConfirm;

  amount.value = options.initialInput?.amount ?? 0;

  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function confirm() {
  onConfirm?.({ amount: amount.value });
  close();
}

defineExpose({ open });
</script>
