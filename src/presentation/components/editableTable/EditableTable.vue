<template>
  <base-table
    :table-columns="tableColumns"
    :modelValue="rows"
    :hide-row-index="hideRowIndex"
  >
    <template
      #cell="{ row, rowIndex, column, colIndex, cell}"
    >
      <editable-cell
        v-model="cell.value"
        :hasEditor="hasEditor(colIndex)"
        :width="column.width"
        :position="{row: rowIndex, column: colIndex}"
        :active-cell="activeCell"
        :focus-key="focusKey"
        @request-edit="startEditingCell(rowIndex, colIndex)"
        @request-close="stopEditingCell"
        @request-move-cell="moveEditingCellByCell"
        @request-move-row="moveEditingCellByRow"
      >
        <template #editor="slot" v-if="column.editorType">
          <component
            :is="editorMap[column.editorType]"
            :model-value="slot.value"
            @update:model-value="slot.onUpdate"
            :width="slot.width"
            :focusKey="slot.focusKey"
            :items="column.list"
            @blur="slot.onBlur"
            @navigate="slot.onNavigate"
          />
        </template>
        <template 
          #display="slot" 
          v-if="column.rendererType"
        >
          <component
            :is="rendererMap[column.rendererType]"
            :model-value="getDisplayValue(row, column, slot.value)"
            :width="slot.width"
            :focusKey="slot.focusKey"
            @update:model-value="slot.onUpdate"
            @blur="slot.onBlur"
            @navigate="slot.onNavigate"
          />
        </template>
      </editable-cell>
    </template>
    <template #actions="{row, rowIndex}">
      <v-btn
        icon="mdi-close"
        variant="text"
        color="error"
        @click="removeRow(rowIndex)"
      />
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import EditableCell from "./EditableCell.vue";

import { type TableColumn, type InternalRow, type TableRow, toInternal, toPublic } from "@/presentation/composables/editableTable/useEditableTable";
import { useTableCellEditing } from "@/presentation/composables/editableTable/useTableCellEditing";
import { editorMap } from "./editors/editorMap";
import { rendererMap } from "./renderers/rendererMap";
import BaseTable from "./BaseTable.vue";

const props = defineProps<{
  modelValue: TableRow[],
  tableColumns: TableColumn[],
  hideRowIndex?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TableRow[]): void
}>();

const rows = ref<InternalRow[]>([]);

const { 
  activeCell,
  focusKey,
  startEditingCell,
  isCellFocused,
  stopEditingCell,
  moveEditingCellByCell,
  moveEditingCellByRow
} = useTableCellEditing(rows, props.tableColumns, commitChanges);

watch(
  () => props.modelValue,
  v => {
      rows.value = toInternal(v);
  },
  { immediate: true, deep: true }
);

function getDisplayValue(row: InternalRow, column: TableColumn, celValue: string) {
  if(column.calculate) {
    return column.calculate(row);
  }
  return celValue;
}

function commitChanges() {
  emit("update:modelValue", toPublic(rows.value));
}

function hasEditor(columnIndex: number) {
  return props.tableColumns[columnIndex].editorType !== undefined;
}

function hasRenderer(columnIndex: number) {
  return props.tableColumns[columnIndex].rendererType !== undefined;
}

function removeRow(index: number) {
  stopEditingCell();
  rows.value.splice(index, 1);
  commitChanges();
}
</script>

<style lang="css" scoped>
  .editable-table td {
    padding: 0px 7px !important;
  }
</style>