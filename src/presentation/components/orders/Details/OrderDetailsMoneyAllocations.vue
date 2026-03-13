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
        show-expand
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
        <template #[`item.method`]="{ item: row }">
          <payment-method-chip :method="row.method" />
        </template>
        <template #[`item.reason`]="{ item: row }">
          <movement-reason-chip :reason="row.reason" :direction="row.direction" />
        </template>
        <template #[`item.actions`] = "{ item: row }">
          <refund-money-allocation-modal
            v-if="getRemainingAllocatedAmount(orderId, row.id) > 0"
            :allocation-id="row.id"
            :order-id="orderId"
          />
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
import type { VDataTableRow } from "@/presentation/types/types";
import { useRouter } from "vue-router";
import RefundMoneyAllocationModal from "../../shared/RefundMoneyAllocationModal.vue";
import { getRemainingAllocatedAmount } from "@/presentation/composables/order/useOrderDetails";

const router = useRouter();

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  allocations: MoneyAllocation[];
  orderId: string;
}>();

const { 
  data, headers, reversalHeaders 
} = useOrderAllocationsTable(toRef(props, "allocations"));

function rowClick(_: MouseEvent, row: VDataTableRow<MoneyAllocation>) {
  router.push(`/moneyMovements/${row.item.moneyMovementId}`);
}

</script>