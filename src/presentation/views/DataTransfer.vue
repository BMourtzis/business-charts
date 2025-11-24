<template>
  <v-row justify="center">
    <h1>{{ tCap('options.dataTransfer') }}</h1>
  </v-row>
  <v-row 
    justify="center"
    class="mt-6"
  >
    <v-col cols="auto">
      <ExportData />
    </v-col>
  </v-row>
  <v-row 
    justify="center"
    class="mt-6"
  >
    <v-col cols="auto">
      <ImportData />
    </v-col>
  </v-row>
  <v-row 
    justify="center"
    class="mt-6"
  >
    <v-col cols="auto">
      <DeleteData />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import ExportData from '@/presentation/components/options/ExportData.vue';
import ImportData from '@/presentation/components/options/ImportData.vue';
import DeleteData from '@/presentation/components/options/DeleteData.vue';

const { tCap } = useLocalizationHelpers();
</script>

<style scoped></style>