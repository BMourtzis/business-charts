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
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rIndex) in rows" :key="rIndex">
        <td v-if="hideRowIndex !== true">{{ rIndex + 1 }}</td>
        <template v-for="(cell, cIndex) in row.cells" :key="cIndex">
          <editable-cell
            v-model="cell.value"
            :focused="false"
            :hasEditor="hasEditor(cIndex)"
            :width="tableColumns[cIndex].width"
          >
            <template 
              #display="slot" 
              v-if="tableColumns[cIndex].rendererType"
            >
              <component
                :is="rendererMap[tableColumns[cIndex].rendererType]"
                :model-value="getDisplayValue(row, tableColumns[cIndex], slot.value)"
                :width="slot.width"
                :focused="slot.focused"
                :readonly="true"
                @update:model-value="slot.onUpdate"
                @blur="slot.onBlur"
                @navigate="slot.onNavigate"
              />
            </template>
          </editable-cell>
        </template>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import EditableCell from "./EditableCell.vue";
import { ref, watch } from "vue";

import { type TableColumn, type InternalRow, type TableRow, toInternal, toPublic } from "@/presentation/composables/editableTable/useEditableTable";
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

function hasEditor(columnIndex: number) {
  return props.tableColumns[columnIndex].editorType !== undefined;
}

function hasRenderer(columnIndex: number) {
  return props.tableColumns[columnIndex].rendererType !== undefined;
}

</script>

<style lang="css" scoped>
  .editable-table td {
    padding: 0px 7px !important;
  }
</style>