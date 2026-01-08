<template>
  <v-table density="compact" v-if="tableColumns.length > 0">
    <thead>
      <tr>
        <th v-for="(columnLayout, cIndex) in tableColumns" :key="cIndex">{{ columnLayout.title }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <editable-cell
            v-if="isEditableType(tableColumns[cIndex].type)"
            v-model="cell.value"
            :editing="isEditCell(rIndex, cIndex)"
            :canEdit="tableColumns[cIndex].editableRow"
            @request-edit="startEditingCell(rIndex, cIndex)"
            @request-close="stopEditingCell"
            @request-move-cell="moveEditingCellByCell"
            @request-move-row="moveEditingCellByRow"
          >
            <template
              v-if="tableColumns[cIndex].type === 'autocomplete'"
              #editor="slot"
            >
              <v-autocomplete
                :model-value="slot.value"
                @update:model-value="slot.onUpdate"
                :items="tableColumns[cIndex].list"
                hide-details
                autofocus
                @blur="slot.onBlur"
                @keydown="slot.onKeydown"
                style="width: 100px"
              />
            </template>
          </editable-cell>
          <td v-if="tableColumns[cIndex].type === 'calculated' && tableColumns[cIndex].calculate">
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

const props = defineProps<{
  modelValue: TableRow[],
  tableColumns: TableColumn[],
  context?: CalculateContext,
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

function isEditableType(type: TableColumn['type']) {
  return type === 'qty' || type === 'autocomplete' || type === 'amount';
}

function removeRow(index: number) {
  stopEditingCell();
  rows.value.splice(index, 1);
  commitChanges();
}
</script>

<style lang="css" scoped></style>