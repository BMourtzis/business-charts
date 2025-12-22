<template>
  <v-table density="compact" v-if="variations.length > 0">
    <thead>
      <tr>
        <th v-for="(cell, cIndex) in rowsLayout" :key="cIndex">{{ cell.title }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <editable-cell 
            v-if="cell.type === 'text'"
            v-model="cell.value" 
            :editing="isEditCell(rIndex, cIndex)" 
            @request-edit="startEditingCell(rIndex, cIndex)"
            @request-close="stopEditingCell()"
            @request-move-cell="(moveAmount) => {moveEditingCellByCell(moveAmount)}"
            @request-move-row="(moveAmount) => {moveEditingCellByRow(moveAmount)}"
            :canEdit="cell.editableRow"
          />
          <editable-cell 
            v-if="cell.type === 'autocomplete'"
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
                :items="cell.list"
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
import { ref, watch, reactive } from "vue";
import EditableCell from "./EditableCell.vue";

import { OrderItemVariationDTO } from "@/application/dto/orderDTO";

const props = defineProps<{
  variations: OrderItemVariationDTO[]
}>();

const editingCellId = ref<number | null>(null);

watch(props.variations, () => {
  const diff = props.variations.length - rows.length;

  if(diff > 0) {
    for(let i  = 0; i < diff; i++) {
      addRow();
    }
    
  } else if(diff < 0) {
    for(let i = 0; i > diff; i--) {
      removeRow();
    }
  }
});

const colourList = [
  "BLK",
  "BLU",
  "RED"
];

const soleList = [
  "ANATOMIC",
  "SOFT",
  "soft"
];


const sizes = Array.from({ length: 47 - 35 + 1 }, (_, i) => i + 35);

const rowsLayout = [
  {
    order: 0,
    title: "Colour",
    type: "autocomplete",
    list: colourList,
    editableRow: true
  },
  {
    order: 1,
    title: "Sole",
    type: "autocomplete",
    list: soleList,
    editableRow: true
  },
  ...sizes.map((s, sIndex) => ({
    order: sIndex + 2,
    title: s.toString(),
    type: "text" as const,
    editableRow: true
  })),
  {
    order: sizes.length + 2,
    title: "Total",
    type: "text",
    editableRow: false,
  }
];

type Row = {
  cells: (TextCell | DropdownCell)[]
};

type BaseCell = {
  title: string;
  value: string;
  editableRow: boolean;
};

type TextCell = BaseCell & {
  type: "text",
};

type DropdownCell = BaseCell & {
  type: "autocomplete",
  list: string[],
  editableRow: false
};

const rows = reactive([] as Row[]);

function addRow() {
  rows.push(createRow());
  console.log(rows);
}

function removeRow(index = rows.length - 1 ) {
  rows.splice(index, 1);
}

function createRow(): Row {
  return {
    cells: rowsLayout
      .sort((a, b) => a.order - b.order)
      .map(r => {
        if(r.type === "autocomplete") {
          return {
            title: r.title,
            value: "",
            type: "autocomplete",
            list: r.list ? r.list : [],
            editableRow: false
          };
        }
        
        return {
          title: r.title,
          value: "",
          editableRow: r.editableRow ?? true,
          type: "text"
        };
      })
  };
}

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
  const rowIndex = newPosition % rowsLayout.length;
  const rowLayout = rowsLayout.find(r => r.order === rowIndex);

  return rowLayout?.editableRow ?? false;
}

function isCellMoveValid(newPosition: number) {
  if(newPosition < 0) return false;
  if(newPosition >= rows.length * rowsLayout.length) return false;
  return true;
};

function getRowId(rIndex: number) {
  return rIndex * rowsLayout.length;
}

function isEditCell(rIndex: number, cIndex: number) {
  return getRowId(rIndex) + cIndex === editingCellId.value;
}

</script>

<style lang="css" scoped></style>