<template>
<v-expansion-panel>
    <v-expansion-panel-title hide-actions v-slot="{ expanded }">
      <v-row no-gutters>
        <v-col class="d-flex justify-start" cols="4">
          {{ orderItemVM.name || "no name" }}
          <!-- {{ variationsNames }} -->
        </v-col>
        <v-col
          class="text--secondary"
          cols="8"
        >
          <v-fade-transition leave-absolute>
            <!-- <v-row
              style="width: 100%"
              no-gutters
            >
              <v-spacer/>
              <v-col cols="3">
                {{ tCap("order.variation", 2) }}: <strong>{{ variationNumber }}</strong>
              </v-col>
              <v-col cols="3">
                {{ tCap("order.productQuantity") }}: <strong>{{ totalQuantity }}</strong>
              </v-col>
              <v-col cols="3">
                {{ tCap("order.productSum") }}: <strong>{{ totalLineAmount.toFixed(2) }}€</strong>
              </v-col>
            </v-row> -->
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <!-- <v-row
        justify="space-around"
        no-gutters
      >
        <v-col cols="6">
          <v-text-field
            v-model="localItem.name"
            @blur="commitChanges"
            :label="tCap('order.product')"
          />
        </v-col>
      </v-row> -->
      <!-- <editable-table 
        v-if="tableRows.length > 0"
        v-model="tableRows" 
        :tableColumns="shoesVariationLayout"
      /> -->
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type { OrderItem } from '@/domain/order/models/orderItem';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { mapOrderItemToVM } from '@/presentation/mappers/orderMapper';
import { computed } from 'vue';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{ item: OrderItem }>();

const orderItemVM = computed(() => mapOrderItemToVM(props.item));

const variationsNames = computed(() => {

});

const variationNumber = computed(() => {

});

const totalQuantity = computed(() => {

});

const totalLineAmount = computed(() => {

});

</script>

<style lang="css" scoped></style>