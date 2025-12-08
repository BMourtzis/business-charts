<template>
  <v-progress-linear
    v-model="strength.percent"
    :color="strength.color"
    height="20"
    chunk-count="5"
    chunk-gap="3"
  >
    <small class="text-center font-weight-bold mt-1">
      {{ strength.label }}
    </small>
  </v-progress-linear>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVault } from '@/presentation/composables/useVault';

const { calculatePasswordStrength } = useVault();

const props = defineProps<{
  password: string
}>();

const strength = computed(() => calculatePasswordStrength(props.password));
</script>

<style scoped>
.v-progress-linear {
  transition: all 0.3s ease;
}
</style>