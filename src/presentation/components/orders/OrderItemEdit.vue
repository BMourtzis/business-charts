<template>
  <v-expansion-panel>
    <v-expansion-panel-title hide-actions v-slot="{ expanded }">
      <v-row no-gutters>
        <v-col class="d-flex justify-start" cols="4">
          {{ item.name || "no name" }}
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
                Total Quantity: {{ totalQuantity }}
              </v-col>
              <v-col cols="3">
                Sum: {{ lineAmount }}€
              </v-col>
              <v-col cols="1" >
                <v-btn
                  size="medium"
                  icon="mdi-trash-can"
                  color="error"
                  variant="text"
                  @click.stop="removeItem(item.id)"
                />
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row
        justify="space-around"
        no-gutters
      >
        <v-col cols="6">
          <v-text-field
            v-model="item.name"
            :label="tCap('order.product')"
            :rules="[required, maxLength(50)]"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="item.basePrice"
            :label="tCap('order.basePrice')"
            :rules="[required, numeric]"
            type="number"
            min="0"
            step="0.01"
            suffix="€"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            color="success"
            text="Add Variation"
            prepend-icon="mdi-plus"
            variant="text"
            @click="addVariation"
          />
        </v-col>
      </v-row>
      <editable-table 
        :modelValue="rows" 
        :tableColumns="shoesVariationLayout"
        @update:model-value="updateModelValue"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { OrderItemDTO } from "@/application/dto/orderDTO";

import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import EditableTable from "../shared/EditableTable.vue";
import { TableRow } from "@/presentation/composables/shared/useEditableTable";
import { shoesVariationLayout } from "@/presentation/composables/order/useProductVariation";

const { tCap } = useLocalizationHelpers();

const { 
  maxLength, 
  required, 
  numeric
} = useValidationRules();

const props = defineProps<{
  item: OrderItemDTO
}>();

const rows = ref<TableRow[]>([]);
const variations = ref<VariationViewModel[]>([]);

//Removes orderItem
function removeItem(id: string) {
  //TODO: emit to parent component
}

function updateModelValue(newRows: TableRow[]) {
  // rows.value = newRows;
}

const lineAmount = computed(() => {
  return props.item.basePrice.toFixed(2);
})

const totalQuantity = computed(() => {
  return props.item.variations.reduce((sum, item) => sum + item.quantity, 0);
})

function addVariation() {
  rows.value.push({
    id: rows.value.length.toString(),
    cells: shoesVariationLayout.map(() => "")
  });
}


function removeVariation(index: number) {
  //TODO
}

type VariationViewModel = {
  attributes: Record<string, string>,
  sizing: Record<string, number>
}
</script>

<style scoped>

</style>