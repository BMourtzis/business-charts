<template>
  <v-expansion-panel>
    <v-expansion-panel-title hide-actions v-slot="{ expanded }">
      <v-row no-gutters>
        <v-col class="d-flex justify-start" cols="4">
          {{ localItem.name || "no name" }}
        </v-col>
        <v-col
          class="text--secondary"
          cols="8"
        >
          <v-fade-transition leave-absolute>
            <v-row
              style="width: 100%"
              no-gutters
            >
              <v-spacer/>
              <v-col cols="3">
                Variations: {{ variationNumber }}
              </v-col>
              <v-col cols="3">
                Total Quantity: {{ totalQuantity }}
              </v-col>
              <v-col cols="3">
                Sum: {{ totalAmount }}€
              </v-col>
              <v-col cols="1" >
                <v-btn
                  size="medium"
                  icon="mdi-trash-can"
                  color="error"
                  variant="text"
                  @click.stop="removeItem(localItem.id)"
                />
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row
        justify="space-around"
        no-gutters
      >
        <v-col cols="6">
          <v-text-field
            v-model="localItem.name"
            @blur="commitChanges"
            :label="tCap('order.product')"
            :rules="[required, maxLength(50)]"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="localItem.basePrice"
            @blur="commitChanges"
            :label="tCap('order.basePrice')"
            :rules="[required, numeric]"
            type="number"
            min="0"
            step="0.01"
            suffix="€"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            color="success"
            text="Add Variation"
            prepend-icon="mdi-plus"
            variant="text"
            @click="addVariation"
          />
        </v-col>
      </v-row>
      <editable-table 
        v-model="tableRows" 
        :tableColumns="shoesVariationLayout"
        :context="calculateContext"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { computed, ref, toRaw, watch } from "vue";

import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import EditableTable from "../shared/EditableTable.vue";
import { shoesVariationLayout } from "@/presentation/composables/order/useProductVariation";
import { OrderItemEditVM } from "@/presentation/viewModels/orderItemEditVM";
import { userVariationTableMapper } from "@/presentation/composables/shared/useVariationTableMapper";

const { tCap } = useLocalizationHelpers();

const { 
  maxLength, 
  required, 
  numeric
} = useValidationRules();

const props = defineProps<{
  modelValue: OrderItemEditVM
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: OrderItemEditVM): void;
  (e: 'remove-item', id: string): void;
}>();

const localItem = ref<OrderItemEditVM>(
  structuredClone(toRaw(props.modelValue))
);

watch(
  () => props.modelValue,
  v => localItem.value = structuredClone(toRaw(v)),
  { deep: true }
);

function commitChanges() {
  emit("update:modelValue", structuredClone(toRaw(localItem.value)));
}

const {vmToRows, rowsToVm, sumSizing } = userVariationTableMapper(shoesVariationLayout);

const tableRows = computed({
  get: () => vmToRows(localItem.value.variations),
  set: rows => {
    localItem.value.variations = rowsToVm(rows);
    commitChanges();
  }
});

const variationNumber = computed(() => localItem.value.variations.length);

const totalQuantity = computed(() => 
  localItem.value.variations.reduce((sum, v) => sum + sumSizing(v), 0)
);

const totalAmount = computed(() => 
  (totalQuantity.value * localItem.value.basePrice).toFixed(2)
);

const calculateContext = computed(() => ({
  itemPrice: localItem.value.basePrice
}));


function addVariation() {
  localItem.value.variations.push({
    attributes: Object.fromEntries(
      shoesVariationLayout.slice(0, 2).map(c => [c.name, ''])
    ),
    sizing: Object.fromEntries(
      shoesVariationLayout.slice(2).map(c => [c.name, 0])
    )
  });

  commitChanges();
}

function removeItem(id: string) {
  emit('remove-item', localItem.value.id);
}
</script>

<style scoped>

</style>