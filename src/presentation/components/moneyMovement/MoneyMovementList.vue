<template>
  <v-data-table
    :headers="headers"
    :items="data"
    class="text-start"
    hide-default-footer
    density="comfortable"
    :items-per-page="-1"
    hover
    @click:row="rowClick"
  >
    <template #[`item.partner`]="{ item: row }">
      <partner-btn :partner="row.partner" />
    </template>
    <template #[`item.method`]="{ item: row }">
      <payment-method-chip :method="row.method" />
    </template>
    <template #[`item.reason`]="{ item: row }">
      <movement-reason-chip :reason="row.reason" :direction="row.direction" />
    </template>
    <template #[`item.actions`]="{ item: row }">
      <ConfirmDeleteModal
        :name="row.movementNumber"
        :action-fn="() => ''"
        :mini="true"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import PartnerBtn from "../partner/PartnerBtn.vue";
import PaymentMethodChip from "./PaymentMethodChip.vue";
import MovementDirectionChip from "./MovementDirectionChip.vue";
import MovementReasonChip from "./MovementReasonChip.vue";

import { toRef } from 'vue';
import { useRouter } from 'vue-router';

import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { Partner } from '@/domain/partner/models/partner';

import type { VDataTableRow } from '@/presentation/types/types';
import { useMoneyMovementTable } from "@/presentation/composables/moneyMovement/useMoneyMovementTable";


const router = useRouter();

const props = defineProps < {
  moneyMovements: MoneyMovement[] | undefined;
} > ();

const { data, headers } = useMoneyMovementTable(toRef(props, "moneyMovements"));

function rowClick(_: MouseEvent, row: VDataTableRow<Partner>) {
  router.push(`/moneyMovements/${row.item.id}`);
}

</script>

<style scoped></style>