<template>
  <h1>Data Transfer</h1>
  <h2>Export</h2>
  <v-btn 
    color="warning"
    @click="exportData"
  >
    Export JSON
  </v-btn>
  <h2>Import</h2>
  <v-file-input
    label="JSON file"
    type="file"
    accept="application/json"
    @change="onImport" 
  />
  <h2>Delete all data</h2>
  <ConfirmDeleteModal
    name="All Data"
    :action-fn="() => deleteAllData()"
    :mini="false"
  />
</template>

<script setup lang="ts">
import ConfirmDeleteModal from '@/presentation/components/ConfirmDeleteModal.vue';
import { useDataManagement } from '@/presentation/composables/useDataManagement';

const { exportData, importData, deleteAllData } = useDataManagement()

function onImport(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) importData(file)
}
</script>

<style scoped></style>s