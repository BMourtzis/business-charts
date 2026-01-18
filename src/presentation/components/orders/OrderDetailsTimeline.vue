<template>
  <v-card>
    <v-card-title>{{ tCap("common.timeline") }}</v-card-title>
    <v-divider />
    <v-card-text>
      <v-timeline align="start" side="end">
        <v-timeline-item
          dot-color="indigo"
          size="small"
        >
          <template #opposite>
            <div> {{ tCap('order.createdDate') }}</div>
          </template>
          <div class="d-flex">
            <strong class="me-4">{{ getDate(order.createdDate) }}</strong>
          </div>
        </v-timeline-item>
        <v-timeline-item
          dot-color="indigo"
          size="small"
           v-if="order.approvedDate"
        >
          <template #opposite>
            <div> {{ tCap('order.approvedDate') }}</div>
          </template>
          <div class="d-flex">
            <strong class="me-4">{{ getDate(order.approvedDate) }}</strong>
          </div>
        </v-timeline-item>
        <v-timeline-item
          dot-color="indigo"
          size="small"
           v-if="order.shippedDate"
        >
          <template #opposite>
            <div> {{ tCap('order.shippedDate') }}</div>
          </template>
          <div class="d-flex">
            <strong class="me-4">{{ getDate(order.shippedDate) }}</strong>
          </div>
        </v-timeline-item>
        <v-timeline-item
          dot-color="grey"
          size="small"
           v-if="order.completedDate"
        >
          <template #opposite>
            <div> {{ tCap('order.completedDate') }}</div>
          </template>
          <div class="d-flex">
            <strong class="me-4">{{ getDate(order.completedDate) }}</strong>
          </div>
        </v-timeline-item>
        <v-timeline-item
          dot-color="red"
          size="small"
           v-if="order.cancelledDate"
        >
          <template #opposite>
            <div> {{ tCap('order.cancelledDate') }}</div>
          </template>
          <div class="d-flex">
            <strong class="me-4">{{ getDate(order.cancelledDate) }}</strong>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Order } from '@/domain/order/models/order';

import { getDate } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ order: Order }>();

</script>

<style lang="css" scoped></style>