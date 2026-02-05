<template>
  <v-table 
    class="base-table"
    v-if="tableColumns.length > 0"
    density="compact"
    striped="even"
  >
    <thead>
      <tr>
        <th v-if="selectable">
          <v-checkbox
            density="compact"
            hide-details
            :model-value="allSelected"
            :indeterminate="someSelected"
            @update:model-value="emit('toggle-all')"
          />
        </th>
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
      <tr v-for="(row, rIndex) in modelValue" :key="rowKey ? rowKey(row) : rIndex">
        <td v-if="selectable">
          <v-checkbox
            density="compact"
            hide-details
            :model-value="selectedKeys?.has(rowKey!(row))"
            @update:model-value="emit('toggle-row', rowKey!(row))"
          />
        </td>
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
                :focus-key="0"
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
import { type TableColumn, type InternalRow } from "@/presentation/composables/editableTable/useEditableTable";
import { rendererMap } from "./renderers/rendererMap";
import { computed } from "vue";

const props = defineProps<{
  modelValue: InternalRow[];
  tableColumns: TableColumn[];
  hideRowIndex?: boolean;

  selectable?: boolean;
  selectedKeys?: Set<string>;
  rowKey?: (row: InternalRow) => string
}>();

const emit = defineEmits<{
  (e: 'toggle-row', key: string): void;
  (e: 'toggle-all'): void
}>();

function getDisplayValue(row: InternalRow, column: TableColumn, celValue: string) {
  if(column.calculate) {
    return column.calculate(row);
  }
  return celValue;
}

const allSelected = computed(() =>
  props.selectedKeys &&
  props.modelValue.length > 0 &&
  props.selectedKeys.size === props.modelValue.length
);

const someSelected = computed(() =>
  props.selectedKeys &&
  props.selectedKeys.size > 0 &&
  props.selectedKeys.size < props.modelValue.length
);

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