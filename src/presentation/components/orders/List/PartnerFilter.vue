<template>
  <v-autocomplete
    v-model="selectedPartners"
    :items="sortedPartners"
    item-title="businessName"
    item-value="id"
    clearable
    multiple
    :return-object="false"
    density="compact"
    :placeholder="tCap('partner.partner', 2)"
    prepend-inner-icon="mdi-magnify"
    width="400"
    flat
    variant="solo"
    hide-details
    single-line
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
import { usePartners, sortPartnerDTOs } from '@/presentation/composables/partner/usePartners';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { computed } from 'vue';

const { partners } = usePartners();

const sortedPartners = computed(() => {
  const res = sortPartnerDTOs(partners.value);
  console.log(res);
  return res;
});

const { tCap } = useLocalizationHelpers();

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