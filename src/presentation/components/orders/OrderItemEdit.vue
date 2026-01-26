<template>
  <editable-table 
    v-if="tableRows.length > 0"
    v-model="tableRows" 
    :tableColumns="shoesVariationLayout"
  />
</template>

<script setup lang="ts">
import EditableTable from "@/presentation/components/editableTable/EditableTable.vue";

import { computed, ref, toRaw, watch } from "vue";

import type { OrderLineItemVM } from "@/presentation/viewModels/orderVM";

import { shoesVariationLayout } from "@/presentation/composables/order/useProductVariation";
import { useVariationTableMapper } from "@/presentation/composables/editableTable/useVariationTableMapper";


const props = defineProps<{
  modelValue: OrderLineItemVM[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: OrderLineItemVM[]): void;
  (e: 'remove-item', id: string): void;
}>();

const localItem = ref<OrderLineItemVM[]>(
  structuredClone(toRaw(props.modelValue))
);

watch(
  () => props.modelValue,
  v =>  {
    localItem.value = structuredClone(toRaw(v))
  },
  { deep: true }
);

function commitChanges() {
  emit("update:modelValue", structuredClone(toRaw(localItem.value)));
}

const { vmToRows, rowsToVm } = useVariationTableMapper(shoesVariationLayout);

const tableRows = computed({
  get: () => {
    const rows = vmToRows(localItem.value);
    return rows;
  },
  set: rows => {
    localItem.value = rowsToVm(rows);
    commitChanges();
  }
});

</script>

<style scoped>

</style>