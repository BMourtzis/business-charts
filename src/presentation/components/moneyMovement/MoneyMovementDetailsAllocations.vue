<template>
  <v-card>
    <v-card-title>{{ tCap("order.moneyAllocation", 2) }}</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="data"
        class="text-start"
        hide-default-footer
        density="comfortable"
        :items-per-page="-1"
        hover
        @click:row="rowClick"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { MoneyMovement } from '@/domain/payment/models/moneyMovement';

import type { VDataTableRow } from '@/presentation/types/types';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import { useRouter } from 'vue-router';
import { useMoneyMovementAllocationsTable } from '@/presentation/composables/moneyMovement/useMoneyMovementAllocationsTable';
import { toRef } from 'vue';

const router = useRouter();

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  moneyMovement: MoneyMovement
}>();

const { data, headers } = useMoneyMovementAllocationsTable(toRef(props, "moneyMovement"));

function rowClick(_: MouseEvent, row: VDataTableRow<{orderId: string}>) {
  router.push(`/order/${row.item.orderId}`);
}

</script>

<style lang="css" scoped></style>