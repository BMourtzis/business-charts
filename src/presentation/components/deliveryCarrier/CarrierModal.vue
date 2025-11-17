<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn 
        v-if="!mini"
        v-bind="activatorProps"
        :color="'indigo'"
        :text="label"
        :prepend-icon="modeIcon"
        variant="flat"
      />
      <v-btn 
        v-if="mini"
        v-bind="activatorProps"
        :color="'indigo'"
        :icon="modeIcon"
        variant="text"
        density="compact"
      />
    </template>

    <v-card :title="dialogTitle">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <v-text-field
                v-model="form.name"
                :label="tCap('common.name')"
                :rules="[required, rangeLength(3, 50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.street"
                :label="tCap('partner.street')"
                :rules="[required, rangeLength(3, 50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.city"
                :label="tCap('partner.city')"
                :rules="[required, rangeLength(3, 50)]"
              />
              <v-text-field
                v-model="form.zip"
                :label="tCap('partner.zip')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.country"
                :label="tCap('partner.country')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-2"
            >
              {{ errorMessage }}
            </v-alert>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="indigo"
          :text="tCap('common.save')"
          :loading="loading"
          :disabled="!validForm || loading"
          @click="saveCarrier"
        />
        <v-btn
          :text="tCap('common.cancel')"
          color="red"
          :disabled="loading"
          @click="close"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, computed, reactive } from 'vue';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { maxLength, rangeLength, required } from '@/presentation/utils/validation';
import { useDeliveryCarriers } from '@/presentation/composables/useDeliveryCarriers';

const { createDeliveryCarrierCommandHandler } = useDeliveryCarriers();

const { tCap } = useLocalizationHelpers();

defineProps({
  mini: {
    type: Boolean,
    required: false,
    default: false
  }
});

const label = computed(() => {
  return `${tCap('common.add')} ${tCap('partner.address')}`;
});

const dialogTitle = computed(() => {
  return tCap('partner.addAddress');
});

const modeIcon = computed(() => {
  return "mdi-plus";
});

const form = reactive({
  name: '',
  street: '',
  city: '',
  zip: '',
  country: ''
});


const {
  dialog, 
  formRef, 
  validForm,
  loading,
  errorMessage,
  close,
  submit
} = useFormDialog(form);

async function saveCarrier() {
  await submit(async (form) => {
    await createDeliveryCarrierCommandHandler.handle({ 
        name: form.name,
        address: {
          id: "",
          isPrimary: true,
          street: form.street,
          city: form.city,
          zip: form.zip,
          country: form.country
        }

    });
  });
}

</script>

<style scoped>
</style>