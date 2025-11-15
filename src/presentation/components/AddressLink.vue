<template>
  <div v-if="props.address">
    <v-icon 
      icon="mdi-map-marker" 
      size="16" 
      class="mr-1 text-grey" 
    />
    <a
      :href="googleMapsUrl(props.address.value)"
      target="_blank"
      rel="noopener noreferrer"
      class="text-decoration-none text-body-2"
    >
      <span v-if="format === 'full'">{{ props.address.value }}</span>
      <span v-if="format === 'street'">{{ props.address.street }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { Address } from '@/domain/contact/models/address';
import { defineProps } from 'vue';

const props = defineProps<{
  address: Address | undefined;
  format: "full" | "street"
}>();

function googleMapsUrl(address: string) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
</script>

<style scoped></style>