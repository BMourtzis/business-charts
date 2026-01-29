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
      >
        <template #[`item.method`]="{ item: row }">
          <payment-method-chip :method="row.method" />
        </template>
        <template #[`item.reason`]="{ item: row }">
          <movement-reason-chip :reason="row.reason" :direction="row.direction" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import PaymentMethodChip from "@/presentation/components/moneyMovement/PaymentMethodChip.vue";
import MovementReasonChip from "@/presentation/components/moneyMovement/MovementReasonChip.vue";

import { toRef } from 'vue';

import type { MoneyAllocation } from '@/domain/order/models/moneyAllocation';
import { useOrderAllocationsTable } from '@/presentation/composables/order/useOrderAllocationsTable';

import { useLocalizationHelpers } from "@/presentation/composables/useLocalization";

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  allocations: MoneyAllocation[];
}>();

const { data, headers } = useOrderAllocationsTable(toRef(props, "allocations"));

// function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
//   router.push(`/order/${row.item.id}`);
// }

</script>