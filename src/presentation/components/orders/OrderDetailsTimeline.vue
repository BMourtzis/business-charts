<template>
  <v-card>
    <v-card-title>{{ tCap("common.timeline") }}</v-card-title>
    <v-divider />
    <v-card-text>
      <v-timeline align="start" side="end" direction="horizontal">
        <template v-for="timelineItem in timelineItems">
          <v-timeline-item
            :dot-color="timelineItem.colour"
            size="small"
          >
            <template #opposite>
              <div> {{ timelineItem.name }}</div>
            </template>
            <div class="d-flex">
              <strong v-if="timelineItem.date" class="me-4">{{ getDate(timelineItem.date) }}</strong>
            </div>
          </v-timeline-item>
        </template>

      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Order } from '@/domain/order/models/order';
import { OrderStatus } from '@/domain/order/orderTypes';

import { getDate } from '@/presentation/composables/order/useOrderDetails';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { computed } from 'vue';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ order: Order }>();

const timelineItems = computed(() => buildOrderTimeline(props.order));

type TimelineStep = {
  name: string
  getDate: (o: Order) => Date | undefined
  isCancelled?: boolean
};

const TIMELINE_STEPS: TimelineStep[] = [
  {
    name: tCap('order.createdDate'),
    getDate: o => o.createdDate
  },
  {
    name: tCap('order.approvedDate'),
    getDate: o => o.approvedDate
  },
  {
    name: tCap('order.shippedDate'),
    getDate: o => o.shippedDate
  },
  {
    name: tCap('order.completedDate'),
    getDate: o => o.completedDate
  }
];

const CANCELLED_STEP: TimelineStep = {
  name: tCap('order.cancelledDate'),
  getDate: o => o.cancelledDate,
  isCancelled: true
};

export type TimelineItem = {
  name: string
  date?: Date
  colour: "cyan" | "indigo" | "red" | "grey"
}

function buildOrderTimeline(order: Order): TimelineItem[] {
  const baseSteps = [...TIMELINE_STEPS]

  // Add cancelled only if it happened
  if (order.status === OrderStatus.Cancelled) {
    baseSteps.push(CANCELLED_STEP)
  }

  const withDates = baseSteps.map(step => ({
    name: step.name,
    date: step.getDate(order)
  }))

  // Find last step that has a date
  const lastDatedIndex = withDates
    .map(s => s.date)
    .findLastIndex(d => d !== undefined)

  return withDates.map((step, index) => {
    // Cancelled terminal step
    if (
      order.status === OrderStatus.Cancelled &&
      step.name === "Cancelled"
    ) {
      return {
        ...step,
        colour: "red"
      }
    }

    // Pending (no date yet)
    if (!step.date) {
      return {
        ...step,
        colour: "grey"
      }
    }

    // Done vs current
    return {
      ...step,
      colour: index === lastDatedIndex ? "indigo" : "cyan"
    }
  })
}

</script>

<style lang="css" scoped></style>