<template>
    <span
        class="price-renderer"
        :style="{ width: width || '2vw'}"
    >
        {{ formattedPrice }}
    </span>
</template>
<script setup lang="ts">
import { stringPriceToGreekFormatLocale } from '@/utlis/priceUtils';
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
    width?: string;
}>();

const formattedPrice = computed(() => stringPriceToGreekFormatLocale(props.modelValue));
</script>

<style scoped>
  .price-renderer {
    display: inline-block;
  }
</style>