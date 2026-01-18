<template>
  <v-table 
    class="base-table"
    v-if="tableColumns.length > 0"
    density="compact"
    striped="even"
  >
    <thead>
      <tr>
        <th v-if="hideRowIndex !== true">#</th>
        <th v-for="(columnLayout, cIndex) in tableColumns" :key="cIndex">{{ columnLayout.title }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <td v-if="hideRowIndex !== true">{{ rIndex + 1 }}</td>
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <slot
            name="cell"
            :row="row"
            :column="tableColumns[cIndex]"
            :cell="cell"
            :rowIndex="rIndex"
            :cellIndex="cIndex"
          >
            <td 
              v-if="tableColumns[cIndex].rendererType"
              :key="cIndex"
            >
              <component
                :is="rendererMap[tableColumns[cIndex].rendererType]"
                :model-value="getDisplayValue(row, tableColumns[cIndex], cell.value)"
                :width="tableColumns[cIndex].width"
                :readonly="true"
              />
            </td>
          </slot>
        </template>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { type TableColumn, type InternalRow, type TableRow, toInternal, toPublic } from "@/presentation/composables/editableTable/useEditableTable";
import { rendererMap } from "./renderers/rendererMap";

const props = defineProps<{
  tableRows: TableRow[],
  tableColumns: TableColumn[],
  hideRowIndex?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TableRow[]): void
}>();

const rows = computed(() => toInternal(props.tableRows));

function getDisplayValue(row: InternalRow, column: TableColumn, celValue: string) {
  if(column.calculate) {
    return column.calculate(row);
  }
  return celValue;
}

// function hasEditor(columnIndex: number) {
//   return props.tableColumns[columnIndex].editorType !== undefined;
// }

// function hasRenderer(columnIndex: number) {
//   return props.tableColumns[columnIndex].rendererType !== undefined;
// }

</script>

<style lang="css" scoped>
  .base-table td {
    padding: 0px 7px !important;
  }
</style>