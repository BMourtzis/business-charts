<template>
  <base-table
    :modelValue="rows"
    :table-columns="tableColumns"
    selectable
    :selected-keys="selectedKeys"
    :row-key="rowKey"
    @toggle-row="toggleRow"
    @toggle-all="toggleAll"
  />
</template>

<script setup lang="ts">
import { toInternal, type InternalRow, type TableColumn, type TableRow } from '@/presentation/composables/editableTable/useEditableTable';
import BaseTable from './BaseTable.vue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  tableRows: TableRow[];
  tableColumns: TableColumn[],
  allSelected?: boolean
}>();

const rows = computed(() => toInternal(props.tableRows));

const emit = defineEmits<{
  (e: 'update:selected', value: TableRow[]): void
}>();

const selectedKeys = ref<Set<string>>(new Set());

onMounted(() => {
  if(props.allSelected === true) {
    toggleAll();
  }
})

function rowKey(row: TableRow | InternalRow) {
  return row.id ?? "";
}

function toggleRow(key: string) {
  selectedKeys.value.has(key)
    ? selectedKeys.value.delete(key)
    : selectedKeys.value.add(key)

  emitSelected();
}

function toggleAll() {
  if(selectedKeys.value.size === props.tableRows.length) {
    selectedKeys.value.clear();
  } else {
    props.tableRows.forEach(r => selectedKeys.value.add(rowKey(r)));
  }

  emitSelected();
}

function emitSelected() {
  emit(
    "update:selected", 
    props.tableRows.filter(r => selectedKeys.value.has(rowKey(r)))
  );
}

</script>