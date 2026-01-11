<template>
    <span>{{ formattedPrice }}</span>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    value: string;
}>();

const formattedPrice = computed(() => {
    const price = parseFloat(props.value);
    if(isNaN(price)) {
        return "0.00 €";
    }
    return `${price.toFixed(2)} €`;
});
</script>