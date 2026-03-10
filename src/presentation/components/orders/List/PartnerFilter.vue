<template>
  <v-autocomplete
    v-model="selectedPartners"
    :items="partners"
    item-title="businessName"
    item-value="id"
    clearable
    multiple
    :return-object="false"
    density="compact"
    placeholder="partners"
  >
    <template #selection="{ item, index }">
      <span v-if="selectedPartners.length > 1 && index === 0">
        {{ selectedPartners.length }} partners selected
      </span>

      <span v-if="selectedPartners.length === 1">
        {{ item.title }}
      </span>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { usePartners } from '@/presentation/composables/partner/usePartners';
import { computed } from 'vue';

const { partners } = usePartners();

const props = defineProps<{
  modelValue: string[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]):void;
}>();

const selectedPartners = computed({
  get: () => props.modelValue,
  set: (v: string[]) => emits("update:modelValue", v)
});

</script>