<template>
  <v-expansion-panel>
    <v-expansion-panel-title hide-actions v-slot="{ expanded }">
      <v-row no-gutters>
        <v-col class="d-flex justify-start" cols="4">
          {{ item.name || "no name" }}
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
              <!-- <v-col class="d-flex justify-start" cols="6">
                Start date: {{ trip.start || 'Not set' }}
              </v-col> -->
              <v-spacer/>
              <v-col cols="3">
                Total Quantity: {{ totalQuantity }}
              </v-col>
              <v-col cols="3">
                Sum: {{ lineAmount }}€
              </v-col>
              <v-col cols="1" >
                <v-btn
                  size="medium"
                  icon="mdi-trash-can"
                  color="error"
                  variant="text"
                  @click.stop="removeItem(item.id)"
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
            v-model="item.name"
            :label="tCap('order.product')"
            :rules="[required, maxLength(50)]"
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="item.basePrice"
            :label="tCap('order.basePrice')"
            :rules="[required, numeric]"
            type="number"
            min="0"
            step="0.01"
            suffix="€"
          />
        </v-col>
        <v-col cols="1">
          <v-text-field
            :model-value="item.vatRate * 100"
            @update:model-value="val => item.vatRate = Number(val) / 100"
            type="number"
            :label="tCap('order.vatRate')"
            :rules="[required, numeric]"
            min="0"
            max="100"
            step="1"
            suffix="%"
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

      <!-- TODO: Make into an editable table -->
      <v-table density="compact">
  <thead>
    <tr>
      <th>Colour</th>
      <th>Sole</th>
      <th v-for="size in sizes" :key="size">
        {{ size }}
      </th>
      <th>Total pairs</th>
      <th></th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="(variation, vIndex) in item.variations" :key="vIndex">
      <!-- Attributes -->
      <td style="width: 100px">
        <v-text-field
          v-model="variation.attributes.colour"
          density="compact"
          variant="underlined"
          hide-details
        />
      </td>
      <td>
        <v-text-field
          v-model="variation.attributes.sole"
          density="compact"
          variant="underlined"
          hide-details
          style="width: 100px"
        />
      </td>

      <!-- Sizes -->
      <td v-for="size in sizes" :key="size">
        <v-text-field
          min="0"
          density="compact"
          variant="underlined"
          hide-details
          style="width: 30px"
        />
      </td>

      <!-- Row total -->
      <td>
        <!-- {{
          Object.values(variation.sizing).reduce((a, b) => a + b, 0)
        }} -->
      </td>

      <!-- Delete -->
      <td>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="error"
          @click="removeVariation(vIndex)"
        />
      </td>
    </tr>
  </tbody>
</v-table>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { OrderItemDTO } from "@/application/dto/orderDTO";

import { useValidationRules } from '@/presentation/composables/useValidationRules';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { computed, ref } from "vue";

const { tCap } = useLocalizationHelpers();

const { 
  maxLength, 
  required, 
  numeric
} = useValidationRules();

const sizes = Array.from({ length: 47 - 35 + 1 }, (_, i) => i + 35);

const props = defineProps<{
  item: OrderItemDTO
}>();

function removeItem(id: string) {
  //TODO: emit to parent component
}

const lineAmount = computed(() => {
  return (props.item.basePrice * (1 + props.item.vatRate)).toFixed(2);
})

const totalQuantity = computed(() => {
  return props.item.variations.reduce((sum, item) => sum + item.quantity, 0);
})

function addVariation() {
  props.item.variations.push({
    attributes: {},
    quantity: 0
  });
}

function removeVariation(index: number) {
  //TODO
}

type VariationViewModel = {
  attributes: Record<string, string>,
  sizing: Record<string, number>
}


</script>

<style scoped>

</style>