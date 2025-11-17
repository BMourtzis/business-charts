<template>
  <span v-if="address?.street">
    <v-icon 
      icon="mdi-map-marker" 
      size="16" 
      class="mr-1 text-grey" 
    />
    <a
      :href="googleMapsUrl(address.value)"
      target="_blank"
      rel="noopener noreferrer"
      class="text-decoration-none text-body-2"
    >
      <span v-if="format === 'full'">{{ address.value }}</span>
      <span v-if="format === 'street'">{{ address.street }}</span>
    </a>
  </span>
</template>

<script setup lang="ts">
import { Address } from '@/domain/contact/models/address';
import { defineProps } from 'vue';

defineProps<{
  address: Address | undefined;
  format: "full" | "street"
}>();

function googleMapsUrl(address: string) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
</script>

<style scoped></style>