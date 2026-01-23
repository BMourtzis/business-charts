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
import { toRef } from 'vue';

import { Order } from '@/domain/order/models/order';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { getDate } from '@/presentation/composables/useUtils';
import { useOrderTimeline } from '@/presentation/composables/order/useOrderTimeline';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ order: Order }>();

const { timelineItems } = useOrderTimeline(toRef(props, "order"));

</script>

<style lang="css" scoped></style>