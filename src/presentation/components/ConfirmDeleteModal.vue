<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-if="showButton"
        v-bind="activatorProps"
        color="red"
        :text="tCap('common.delete')"
        prepend-icon="mdi-trash-can"
        variant="flat"
      />
      <v-btn
        v-if="showIcon"
        v-bind="activatorProps"
        color="red"
        icon="mdi-trash-can"
        variant="text"
        density="compact"
      />
    </template>

    <v-card :title="`${tCap('common.delete')} ${name}`">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <h2>{{ tCap('common.confirmDeleteMessage') }} {{ name }}</h2>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="red"
          :text="tCap('common.delete')"
          :loading="loading"
          :disabled="loading"
          @click="confirmAction"
        />
        <v-btn
          :text="tCap('common.cancel')"
          :disabled="loading"
          @click="close"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from 'vue';

import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const props = defineProps<{
  modelValue?: boolean;
  name: string;
  actionFn: () => void;
  mini?: boolean;
  hide?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const { tCap } = useLocalizationHelpers();

const form = ref();

const {
  dialog,
  formRef,
  validForm,
  loading,
  close,
} = useFormDialog(form);

watch(
  () => props.modelValue,
  (value) => {
    if(value !== undefined) {
      dialog.value = value;
    }
  }
);

watch(dialog, (value) => {
  emit('update:modelValue', value);
});

async function confirmAction() {
  loading.value = true;
  close();
  await nextTick();
  try {
    await props.actionFn();
  } finally {
    loading.value = false;
  }
}

const showButton = computed(() => {
  if(props.hide) return false;
  return !props.mini;
});

const showIcon = computed(() => {
  if(props.hide) return false;
  return props.mini;
});
</script>

<style lang="css" scoped>
</style>