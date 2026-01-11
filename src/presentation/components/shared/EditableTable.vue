<template>
  <v-table density="compact" v-if="tableColumns.length > 0">
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
            v-if="isEditableType(tableColumns[cIndex].editorType)"
            v-model="cell.value"
            :editing="isEditCell(rIndex, cIndex)"
            :canEdit="tableColumns[cIndex].editableRow"
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
                :items="tableColumns[cIndex].list"
                @blur="slot.onBlur"
                @keydown="slot.onKeydown"
              />
            </template>
            <template 
              #display="slot" 
              v-if="tableColumns[cIndex].rendererType"
            >
              <component
                :is="rendererMap[tableColumns[cIndex].rendererType]"
                :value="slot.value"
              />
            </template>
          </editable-cell>
          <td v-if="tableColumns[cIndex].editorType === 'calculated' && tableColumns[cIndex].calculate">
            <span>{{ tableColumns[cIndex].calculate(row, context) }}</span>
          </td>
        </template>

        <!-- Delete -->
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

import { TableColumn, InternalRow, TableRow, toInternal, toPublic, CalculateContext } from "@/presentation/composables/shared/useEditableTable";
import { useTableCellEditing } from "@/presentation/composables/shared/useTableCellEditing";
import { editorMap } from "./editors/editorMap";
import { rendererMap } from "./renderers/rendererMap";

const props = defineProps<{
  modelValue: TableRow[],
  tableColumns: TableColumn[],
  context?: CalculateContext,
  hideRowIndex?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TableRow[]): void
}>();

const rows = ref<InternalRow[]>([]);

const { 
  startEditingCell,
  isEditCell,
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

function commitChanges() {
  emit("update:modelValue", toPublic(rows.value));
}

function isEditableType(type: TableColumn['editorType']) {
  return editorMap[type] !== undefined;
}

function removeRow(index: number) {
  stopEditingCell();
  rows.value.splice(index, 1);
  commitChanges();
}
</script>

<style lang="css" scoped></style>