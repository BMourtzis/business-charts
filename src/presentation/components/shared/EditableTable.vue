<template>
  <v-table density="compact" v-if="rows.length > 0">
    <thead>
      <tr>
        <th v-for="(cell, cIndex) in tableColumns" :key="cIndex">{{ cell.title }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <editable-cell 
            v-if="tableColumns[cIndex].type === 'text'"
            v-model="cell.value" 
            :editing="isEditCell(rIndex, cIndex)" 
            @request-edit="startEditingCell(rIndex, cIndex)"
            @request-close="stopEditingCell()"
            @request-move-cell="(moveAmount) => {moveEditingCellByCell(moveAmount)}"
            @request-move-row="(moveAmount) => {moveEditingCellByRow(moveAmount)}"
            :canEdit="tableColumns[cIndex].editableRow"
          />
          <editable-cell 
            v-if="tableColumns[cIndex].type === 'autocomplete'"
            v-model="cell.value" 
            :editing="isEditCell(rIndex, cIndex)" 
            @request-edit="startEditingCell(rIndex, cIndex)"
            @request-close="stopEditingCell()"
            @request-move-cell="(moveAmount) => {moveEditingCellByCell(moveAmount)}"
            @request-move-row="(moveAmount) => {moveEditingCellByRow(moveAmount)}"
            canEdit
          >
            <template #editor="{value, onBlur, onKeydown, onUpdate}">
              <v-autocomplete
                :model-value="value"
                @update:model-value="onUpdate"
                :items="tableColumns[cIndex].list"
                hide-details
                autofocus
                @blur="onBlur"
                @keydown="onKeydown"
                style="width: 100px"
              />
            </template>
          </editable-cell>
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

import { TableColumn, InternalRow, TableRow, toInternal, toPublic } from "@/presentation/composables/shared/useEditableTable";

const props = defineProps<{
  modelValue: TableRow[],
  tableColumns: TableColumn[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TableRow[]): void
}>();

const rows = ref<InternalRow[]>([]);

const editingCellId = ref<number | null>(null);

watch(
  () => props.modelValue,
  v => rows.value = toInternal(v),
  {immediate: true, deep: true}
);

watch(
  rows,
  v => emit("update:modelValue", toPublic(v)),
  { deep: true }
);

function removeRow(index: number) {
  rows.value.splice(index, 1);
}

//Edit cell functionality, move to composable

function startEditingCell(rIndex: number, cIndex: number) {
  editingCellId.value = getRowId(rIndex) + cIndex
}

function stopEditingCell() {
  editingCellId.value = null;
}

function moveEditingCellByCell(moveAmount: number) {
  if(editingCellId.value !== null) {
    moveCell(editingCellId.value + moveAmount);
  }
}

function moveEditingCellByRow(moveAmount: number) {
  if(editingCellId.value !== null) {
    moveCell(editingCellId.value + getRowId(moveAmount));
  }
}

function moveCell(newPosition: number) {
  if(isCellMoveValid(newPosition)) {
    if(isCellEditable(newPosition)) {
      editingCellId.value = newPosition;
    } else {
      moveCell(newPosition + 1);
    }
    
  }
}

function isCellEditable(newPosition: number) {
  const rowIndex = newPosition % props.tableColumns.length;
  const rowLayout = props.tableColumns.find(r => r.order === rowIndex);

  return rowLayout?.editableRow ?? false;
}

function isCellMoveValid(newPosition: number) {
  if(newPosition < 0) return false;
  if(newPosition >= rows.value.length * props.tableColumns.length) return false;
  return true;
};

function getRowId(rIndex: number) {
  return rIndex * props.tableColumns.length;
}

function isEditCell(rIndex: number, cIndex: number) {
  return getRowId(rIndex) + cIndex === editingCellId.value;
}

</script>

<style lang="css" scoped></style>