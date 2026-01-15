<template>
  <div class="date-picker-wrapper">
    <label class="v-label">{{ title }}</label>
    <div class="date-picker-row">
      <v-menu
        v-model="menu"
        transition="scale-transition"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="date-btn"
            variant="text"
            :ripple="false"
            size="large"
            :text="formattedDate"
          />
        </template>

        <v-date-picker
          v-model="date"
          :min="new Date()"
          class="weekdays-primary"
          control-variant="modal"
          elevation="1"
          hide-header
          show-adjacent-months
          @input="menu = false"
          @update:model-value="onUpdate"
        />
      </v-menu>
      <v-btn
        icon="mdi-close"
        color="red"
        size="large"
        variant="text"
        :disabled="!date"
        @click="date = ''"
        title="Clear date"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const { tCap } = useLocalizationHelpers();

const props = defineProps<{
  modelValue: Date | null,
  title: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
}>();

const menu = ref(false)
const date = ref(getDateFormat(props.modelValue));

function onUpdate() {
  if(date.value === "") return;

  const [year, month, day] = date.value.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);

  emit("update:modelValue", dateObj);
}

function getDateFormat(date: Date | null) {
  if(!date) return "";

  return date.toISOString().substring(0, 10);
}

const formattedDate = computed(() => {
  return date.value
    ? new Date(date.value).toLocaleDateString()
    : tCap('common.noDateSelected')
});
</script>

<style scoped>
.date-picker-wrapper {
  display: flex;
  flex-direction: column;
}

.v-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

.date-picker-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.date-btn {
  justify-content: flex-start;
  padding: 0 12px;
  flex: 1;
  font-size: 32px;
}
</style>