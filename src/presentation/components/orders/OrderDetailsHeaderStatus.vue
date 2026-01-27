<template>
  <BtnWithOptions 
    :main-btn-options="mainBtnOptions.mainBtnOptions" 
    :menu-options="mainBtnOptions.menuOptions" 
    class="mr-2"
  />
  <v-btn 
    v-if="canComplete"
    color="grey" 
    variant="flat" 
    size="small"
    :text="tCap('order.completedBtn')"
    class="mr-2"
  />
  <v-btn 
    v-if="canCancel"
    color="red"
    variant="flat" 
    size="small"
    :text="tCap('order.cancelledBtn')"
  />
</template>

<script setup lang="ts">
import BtnWithOptions from '../shared/BtnWithOptions.vue';

import type { Order } from '@/domain/order/models/order';
import { useOrderStatus } from '@/presentation/composables/order/useOrderStatus';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const props = defineProps<{
  order: Order;
}>();

const { tCap } = useLocalizationHelpers();

const { mainBtnOptions, canCancel, canComplete } = useOrderStatus(props.order);

</script>

<style lang="css" scoped></style>