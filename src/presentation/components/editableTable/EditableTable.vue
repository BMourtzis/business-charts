<template>
  <v-table 
    class="editable-table"
    v-if="tableColumns.length > 0"
    density="compact"
    striped="even"
  >
    <thead>
      <tr>
        <th v-if="hideRowIndex !== true">#</th>
        <th v-for="(columnLayout, cIndex) in tableColumns" :key="cIndex">{{ columnLayout.title }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <td v-if="hideRowIndex !== true">{{ rIndex + 1 }}</td>
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <editable-cell
            v-model="cell.value"
            :focused="isCellFocused(rIndex, cIndex)"
            :hasEditor="hasEditor(cIndex)"
            :width="tableColumns[cIndex].width"
            @request-edit="startEditingCell(rIndex, cIndex)"
            @request-close="stopEditingCell"
            @request-move-cell="moveEditingCellByCell"
            @request-move-row="moveEditingCellByRow"
          >
            <template #editor="slot" v-if="tableColumns[cIndex].editorType">
              <component
                :is="editorMap[tableColumns[cIndex].editorType]"
                :model-value="slot.value"
                @update:model-value="slot.onUpdate"
                :width="slot.width"
                :items="tableColumns[cIndex].list"
                @blur="slot.onBlur"
                @navigate="slot.onNavigate"
              />
            </template>
            <template 
              #display="slot" 
              v-if="tableColumns[cIndex].rendererType"
            >
              <component
                :is="rendererMap[tableColumns[cIndex].rendererType]"
                :model-value="getDisplayValue(row, tableColumns[cIndex], slot.value)"
                :width="slot.width"
                :focused="slot.focused"
                @update:model-value="slot.onUpdate"
                @blur="slot.onBlur"
                @navigate="slot.onNavigate"
              />
            </template>
          </editable-cell>
        </template>
        <td>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="error"
            @click="removeRow(rIndex)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import EditableCell from "./EditableCell.vue";

import { type TableColumn, type InternalRow, type TableRow, toInternal, toPublic } from "@/presentation/composables/editableTable/useEditableTable";
import { useTableCellEditing } from "@/presentation/composables/editableTable/useTableCellEditing";
import { editorMap } from "./editors/editorMap";
import { rendererMap } from "./renderers/rendererMap";

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