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
                Sum: {{ totalAmount }}€
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
        :key="tableRows.length"
        v-model="tableRows" 
        :tableColumns="shoesVariationLayout"
        :context="calculateContext"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
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

const variations = computed(() => rowsToVm(tableRows.value));
const tableRows = ref<TableRow[]>([]);

//Removes orderItem
function removeItem(id: string) {
  //TODO: emit to parent component
}

const calculateContext = computed(() => ({
  itemPrice: props.item.basePrice
}));

const totalAmount = computed(() => 
  // return props.item.basePrice.toFixed(2);
  (totalQuantity.value * props.item.basePrice).toFixed(2)
);

const totalQuantity = computed(() => 
  variations.value.reduce((sum, vm) => sum + sumSizing(vm), 0)
);

function addVariation() {
  const vm: VariationViewModel = {
    attributes: {
      [shoesVariationLayout[0].name]: "",
      [shoesVariationLayout[1].name]: "",
    },
    sizing: Object.fromEntries(
      shoesVariationLayout
        .slice(2)
        .map(c => [c.name, 0])
    )
  }

  tableRows.value = [...tableRows.value, ...vmToRows([vm])];
}

function vmToRows(vms: VariationViewModel[]): TableRow[] {
  return vms.map(vm => ({
    cells: shoesVariationLayout.map(layout => {
      if(layout.name.includes('shoe')) {
        return sizeQtyToString(vm.sizing[layout.name]);
      }

      return vm.attributes[layout.name];
    })
  }));
}

function rowsToVm(rows: TableRow[]): VariationViewModel[] {
  return rows.map(row => ({
    attributes: {
      [shoesVariationLayout[0].name]: row.cells[0],
      [shoesVariationLayout[1].name]: row.cells[1],
    },
    sizing: {
      [shoesVariationLayout[2].name]: getNumber(row.cells[2]),
      [shoesVariationLayout[3].name]: getNumber(row.cells[3]),
      [shoesVariationLayout[4].name]: getNumber(row.cells[4]),
      [shoesVariationLayout[5].name]: getNumber(row.cells[5]),
      [shoesVariationLayout[6].name]: getNumber(row.cells[6]),
      [shoesVariationLayout[7].name]: getNumber(row.cells[7]),
      [shoesVariationLayout[8].name]: getNumber(row.cells[8]),
      [shoesVariationLayout[9].name]: getNumber(row.cells[9]),
      [shoesVariationLayout[10].name]: getNumber(row.cells[10]),
      [shoesVariationLayout[11].name]: getNumber(row.cells[11]),
      [shoesVariationLayout[12].name]: getNumber(row.cells[12]),
      [shoesVariationLayout[13].name]: getNumber(row.cells[13]),
      [shoesVariationLayout[14].name]: getNumber(row.cells[14])
    }
  }));
}

function getNumber(value: string) {
  if(value && value !== "") {
    return Number(value);
  }

  return 0;
}

function sizeQtyToString(value: number): string {
  if(value < 1) return "";
  return value.toString();
}

function sumSizing(vm: VariationViewModel): number {
  return vm.sizing[shoesVariationLayout[2].name]
  + vm.sizing[shoesVariationLayout[3].name]
  + vm.sizing[shoesVariationLayout[4].name]
  + vm.sizing[shoesVariationLayout[5].name]
  + vm.sizing[shoesVariationLayout[6].name]
  + vm.sizing[shoesVariationLayout[7].name]
  + vm.sizing[shoesVariationLayout[8].name]
  + vm.sizing[shoesVariationLayout[9].name]
  + vm.sizing[shoesVariationLayout[10].name]
  + vm.sizing[shoesVariationLayout[11].name]
  + vm.sizing[shoesVariationLayout[12].name]
  + vm.sizing[shoesVariationLayout[13].name]
  + vm.sizing[shoesVariationLayout[14].name];
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