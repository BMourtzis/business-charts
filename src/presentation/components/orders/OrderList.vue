<template>
  <v-data-table
    :headers="headers"
    :items="data"
  >
    <!-- Custom column slot -->
    <template #[`item.actions`]="{ item }">
      <v-btn
        color="primary"
        variant="text"
        density="compact"
        icon="mdi-account-details"
        :to="`/partner/${item.id}`"
      />
    </template>
    <template #[`item.partner`]="{ item }">
      <v-btn 
        v-if="item.partner !== undefined"
        variant="text" 
        @click.stop="() => router.push(`/partner/${item.partner?.id}`)"
      >
        {{ getPartnerName(item.partner) }}
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useRouter } from 'vue-router';

import { Order } from '@/domain/order/models/order';
import { Partner } from '@/domain/partner/models/partner';

import { useOrderTable } from '@/presentation/composables/order/useOrdersTable';


const router = useRouter();

const props = defineProps < {
  orders: Order[] | undefined;
} > ();

const { data, headers } = useOrderTable(toRef(props, "orders"));

function getPartnerName(partner: Partner) {
  return partner.businessName
            ? `${partner.businessName} (${partner.contactName})`
            : partner.contactName;
}
</script>

<style scoped></style>