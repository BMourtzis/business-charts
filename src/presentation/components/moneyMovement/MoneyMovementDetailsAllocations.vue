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
        show-expand
        @click:row="rowClick"
      >
        <template 
          #item.data-table-expand="{ item, internalItem, toggleExpand }"
        >
          <v-btn
            v-if="item.reversals?.length"
            icon
            variant="text"
            size="small"
            @click.stop="toggleExpand(internalItem)"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <template #expanded-row="{columns, item}">
          <tr v-if="item.reversals.length > 0">
            <td :colspan="columns.length">
              <v-data-table
                :headers="reversalHeaders"
                :items="item.reversals"
                density="compact"
                hide-default-footer
              />
            </td>
          </tr>
        </template>
        <template #[`item.actions`] = "{item: row }">
          <refund-money-allocation-modal
            v-if="getRemainingAllocatedAmount(row.orderId, row.allocation.id) > 0"
            :allocation-id="row.allocation.id"
            :order-id="row.orderId"

          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import RefundMoneyAllocationModal from '../shared/RefundMoneyAllocationModal.vue';

import type { MoneyMovement } from '@/domain/payment/models/moneyMovement';

import type { VDataTableRow } from '@/presentation/types/types';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import { useRouter } from 'vue-router';
import { useMoneyMovementAllocationsTable } from '@/presentation/composables/moneyMovement/useMoneyMovementAllocationsTable';
import { toRef } from 'vue';
import { AllocationDirection } from '@/domain/order/allocationTypes';
import { getRemainingAllocatedAmount } from '@/presentation/composables/order/useOrderDetails';

const router = useRouter();

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  moneyMovement: MoneyMovement
}>();

const { data, headers, reversalHeaders } = useMoneyMovementAllocationsTable(toRef(props, "moneyMovement"));

function rowClick(_: MouseEvent, row: VDataTableRow<{orderId: string}>) {
  router.push(`/order/${row.item.orderId}`);
}

</script>

<style lang="css" scoped></style>