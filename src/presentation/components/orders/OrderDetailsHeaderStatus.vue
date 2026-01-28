<template>
  <BtnWithOptions 
    v-if="mainBtnOptions.mainBtnOptions"
    :main-btn-options="mainBtnOptions.mainBtnOptions" 
    :menu-options="mainBtnOptions.menuOptions" 
    @action="handleActionClick"
    class="mr-2"
  />
  <v-btn 
    v-if="canComplete"
    color="grey" 
    variant="flat" 
    size="small"
    :text="tCap('order.completedBtn')"
    class="mr-2"
    @click="completeOrder"
  />
  <v-btn 
    v-if="canCancel"
    color="red"
    variant="flat" 
    size="small"
    :text="tCap('order.cancelledBtn')"
    @click="cancelOrder"
  />
  <approve-order-modal ref="dialogRef" />
</template>

<script setup lang="ts">
import { useApproveOrderDialog } from '@/presentation/composables/order/useApproveOrderDialog';
import BtnWithOptions from '../shared/BtnWithOptions.vue';

import type { Order } from '@/domain/order/models/order';
import { useOrderStatus } from '@/presentation/composables/order/useOrderStatus';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import type { ActionDescriptor } from '@/presentation/types/types';
import ApproveOrderModal from './ApproveOrderModal.vue';
import type { PaymentMethod } from '@/domain/payment/MoneyMovementTypes';
import { toRef } from 'vue';
import { CompleteOrderCommandHandler } from '@/application/commands/order/completeOrderCommand';
import { CancelOrderCommandHandler } from '@/application/commands/order/cancelOrderCommand';

const props = defineProps<{
  order: Order;
}>();

const { tCap } = useLocalizationHelpers();
const { mainBtnOptions, canCancel, canComplete } = useOrderStatus(toRef(props, 'order'));
const { dialogRef, openApproveModal } = useApproveOrderDialog();

function handleActionClick(btn: ActionDescriptor<any>) {
  if (btn.id === 'approve') {
    openApproveModal({
      initialInput: { amount: props.order.depositAmount },
      onConfirm: async (input) => {
        btn.execute(input);
      },
    });
    return;
  }

  // default: execute immediately
  btn.execute();
}

async function completeOrder() {
  try {
    await new CompleteOrderCommandHandler().handle({orderId: props.order.id});
  } catch (err) {
    if(err instanceof Error) {
      alert(err.message);
    }
  }
}

async function cancelOrder() {
  try {
    await new CancelOrderCommandHandler().handle({orderId: props.order.id});
  } catch (err) {
    if(err instanceof Error) {
      alert(err.message);
    }
  }
}

export type ApproveOrderInput = {
  amount: number;
  method: PaymentMethod | null
};

</script>

<style lang="css" scoped></style>