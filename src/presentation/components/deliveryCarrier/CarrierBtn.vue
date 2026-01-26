<template>
  <v-btn 
    v-if="carrier"
    variant="text" 
    @click.stop="() => router.push(`/carrier/${carrier?.id}`)"
  >
    {{ carrier.name }}
  </v-btn>
</template>

<script setup lang="ts">
import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
  carrier: DeliveryCarrier | undefined
}>();
</script>