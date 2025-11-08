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
</template>

<script setup lang="ts">
import { useDataManagement } from '@/presentation/composables/useDataManagement'

const { exportData, importData } = useDataManagement()

function onImport(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) importData(file)
}
</script>

<style scoped></style>