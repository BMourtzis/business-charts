<template>
  <base-table
    :modelValue="rows"
    :table-columns="tableColumns"
    :hide-row-index="hideRowIndex"
  />
</template>

<script setup lang="ts">
import { toInternal, type TableColumn, type TableRow } from '@/presentation/composables/editableTable/useEditableTable';
import { computed } from 'vue';
import BaseTable from './BaseTable.vue';

const props = defineProps<{
  tableRows: TableRow[],
  tableColumns: TableColumn[],
  hideRowIndex?: boolean
}>();

const rows = computed(() => toInternal(props.tableRows));
</script>