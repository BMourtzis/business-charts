<template>
  <v-dialog v-model="isOpen" max-width="420">
    <v-card>
      <v-card-title>
        Approve Order
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model.number="amount"
          label="Amount"
          type="number"
          autofocus
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="indigo" @click="confirm">
          Approve
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ApproveOrderInput } from './OrderDetailsHeaderStatus.vue';

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
