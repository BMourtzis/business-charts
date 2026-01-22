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
        <th 
          v-for="(columnLayout, cIndex) in tableColumns" 
          :key="cIndex"
        >
          {{ columnLayout.title }}
        </th>
        <th v-if="$slots.actions"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in modelValue" :key="rIndex">
        <td v-if="hideRowIndex !== true">{{ rIndex + 1 }}</td>
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <slot
            name="cell"
            :row="row"
            :column="tableColumns[cIndex]"
            :cell="cell"
            :rowIndex="rIndex"
            :colIndex="cIndex"
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
        <td v-if="$slots.actions">
          <slot
            name="actions"
            :row="row"
            :rowIndex="rIndex"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { type TableColumn, type InternalRow, type TableRow } from "@/presentation/composables/editableTable/useEditableTable";
import { rendererMap } from "./renderers/rendererMap";

const props = defineProps<{
  modelValue: InternalRow[],
  tableColumns: TableColumn[],
  hideRowIndex?: boolean
}>();

function getDisplayValue(row: InternalRow, column: TableColumn, celValue: string) {
  if(column.calculate) {
    return column.calculate(row);
  }
  return celValue;
}

// TODO: refactor common functions into a composable to clear this up

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