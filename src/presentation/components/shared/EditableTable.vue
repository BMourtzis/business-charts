<template>
  <v-table density="compact" v-if="variations.length > 0">
    <thead>
      <tr>
        <th>Colour</th>
        <th>Sole</th>
        <th v-for="size in sizes" :key="size">
          {{ size }}
        </th>
        <th>Total pairs</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <editable-cell 
            v-model="cell.value" 
            :editing="isEditCell(rIndex, cIndex)" 
            @request-edit="startEditingCell(rIndex, cIndex)"
            @request-close="stopEditingCell()"
            @request-move-cell="(moveAmount) => {moveEditingCellByCell(moveAmount)}"
            @request-move-row="(moveAmount) => {moveEditingCellByRow(moveAmount)}"
          />
        </template>
        <!-- Row total -->
        <!-- <editable-cell :item="Object.values(variation.sizing).reduce((a, b) => a + b, 0)" /> -->
        <td>
          <!-- {{
            Object.values(variation.sizing).reduce((a, b) => a + b, 0)
          }} -->
        </td>

        <!-- Delete -->
        <td>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="error"
            @click="removeVariation(rIndex)"
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
  console.log(diff);
  if(diff > 0) {
    for(let i  = 0; i < diff; i++) {
      addRow();
    }
    
  } else if(diff < 0) {
    for(let i = 0; i > diff; i--) {
      removeRow();
    }
  }

  console.log(rows);
});


const sizes = Array.from({ length: 47 - 35 + 1 }, (_, i) => i + 35);

const editableRowCount = 2 + sizes.length;

type Row = {
  cells: Cell[]
};

type Cell = {
  value: string
}

const rows = reactive([] as Row[]);

function addRow() {
  rows.push(createRow());
}

function removeRow() {
  rows.splice(rows.length, 0);
}

function createRow(): Row {
  return {
    cells: [...Array(editableRowCount)].map(() => ({ value: "" }))
  };
}

function removeVariation(index: number) {
  //TODO
}

function startEditingCell(rIndex: number, cIndex: number) {
  editingCellId.value = getRowId(rIndex) + cIndex
}

function stopEditingCell() {
  editingCellId.value = null;
}

function moveEditingCellByCell(moveAmount: number) {
  if(editingCellId.value) {
    editingCellId.value += moveAmount;
  }
}

function moveEditingCellByRow(moveAmount: number) {
  if(editingCellId.value) {
    editingCellId.value += getRowId(moveAmount);
  }
  
}

function getRowId(rIndex: number) {
  return rIndex * editableRowCount;
}

function isEditCell(rIndex: number, cIndex: number) {
  return getRowId(rIndex) + cIndex === editingCellId.value;
}

</script>

<style lang="css" scoped></style>