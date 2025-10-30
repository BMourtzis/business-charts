<template>
  <v-data-table
    :headers="headers"
    :items="props.partners"
  />
</template>

<script setup lang="ts">
import { Partner } from '@/domain/models/partner';
import { defineProps } from 'vue';

const props = defineProps < {
  partners: Partner[];
} > ();

const headers = [
  { title: "Name", key: "name" }
]


</script>

<style scoped></style>s