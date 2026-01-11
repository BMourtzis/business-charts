<template>
    <v-autocomplete
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :items="items"
        density="compact"
        hide-details
        autofocus
        @blur="$emit('blur')"
        @keydown="$emit('keydown', $event)"
        style="width: 100px"
    />
</template>
<script setup lang="ts">
defineProps<{
  modelValue: string;
  items: string[];
}>();
const emit = defineEmits([
    'update:modelValue',
    'blur',
    "keydown"
]);
</script>
<style scoped></style>