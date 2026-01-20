<template>
  <div v-if="address">
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
      @click.stop
    >
      <span v-if="format === 'full'">{{ address.value }}</span>
      <span v-if="format === 'street'">{{ address.street }}</span>
      <span v-if="format === 'city'">{{ address.city }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { Address } from '@/domain/contact/models/address';

defineProps<{
  address: Address | undefined;
  format: "full" | "street" | "city"
}>();

function googleMapsUrl(address: string) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
</script>

<style scoped></style>