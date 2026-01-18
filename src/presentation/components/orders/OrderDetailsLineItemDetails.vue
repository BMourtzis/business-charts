<template>
<v-expansion-panel>
    <v-expansion-panel-title hide-actions v-slot="{ expanded }">
      <v-row no-gutters>
        <v-col class="d-flex justify-start" cols="4">
          {{ orderItemVM.name || "no name" }}
          {{ variationsNames }}
        </v-col>
        <v-col
          class="text--secondary"
          cols="8"
        >
          <v-fade-transition leave-absolute>
            <v-row
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
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <base-table 
        :model-value="rows"
        :table-columns="shoesVariationLayout"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import BaseTable from '../editableTable/BaseTable.vue';

import type { OrderItem } from '@/domain/order/models/orderItem';
import { sumSizing, useVariationTableMapper } from '@/presentation/composables/editableTable/useVariationTableMapper';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { mapOrderItemToVM } from '@/presentation/mappers/orderMapper';
import { computed } from 'vue';
import { shoesVariationLayout } from '@/presentation/composables/order/useProductVariation';


const { tCap } = useLocalizationHelpers();

const { regVmToRows } = useVariationTableMapper(shoesVariationLayout);

const props = defineProps<{ item: OrderItem }>();

const orderItemVM = computed(() => mapOrderItemToVM(props.item));

const rows = computed(() => regVmToRows(orderItemVM.value.variations));

const variationsNames = computed(() => {
  const names = orderItemVM.value.variations.reduce((acc, v) => {
    const attrs = Object.values(v.attributes).filter(val => val).join(" ");
    return acc ? acc + ", " + attrs : attrs;
  }, "");

  return names ? `(${names})` : "";
});

const variationNumber = computed(() => orderItemVM.value.variations.length);

const totalQuantity = computed(() => 
  orderItemVM.value.variations.reduce((sum, v) => sum + sumSizing(v), 0)
);

const totalLineAmount = computed(() => 
  orderItemVM.value.variations.reduce((sum, v) => sum + (sumSizing(v) * v.price), 0)
);

</script>

<style lang="css" scoped></style>