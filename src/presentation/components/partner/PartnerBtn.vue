<template>
  <v-btn 
    v-if="partner !== undefined"
    variant="text" 
    @click.stop="() => router.push(`/partner/${partner?.id}`)"
  >
    {{ getPartnerName(partner) }}
  </v-btn>
</template>

<script setup lang="ts">
import { Partner } from '@/domain/partner/models/partner';
import { getPartnerName } from '@/presentation/composables/partner/usePartnerDetails';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
  partner: Partner | undefined
}>();
</script>