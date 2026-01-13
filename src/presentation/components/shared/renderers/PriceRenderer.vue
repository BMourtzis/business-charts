<template>
    <span>{{ formattedPrice }}</span>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const formattedPrice = computed(() => {
    const price = parseFloat(props.modelValue);
    if(isNaN(price)) {
        return "0.00 €";
    }
    return `${price.toFixed(2)} €`;
});
</script>