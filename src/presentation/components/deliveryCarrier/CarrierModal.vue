<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn 
        v-if="!mini"
        v-bind="activatorProps"
        color="indigo"
        :text="dialogTitle"
        :prepend-icon="modeIcon"
        variant="flat"
      />
      <v-btn 
        v-if="mini"
        v-bind="activatorProps"
        color="surface-variant"
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
          <v-container
            class="pa-0" 
            fluid
          >
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  :label="tCap('common.name')"
                  :rules="[required, rangeLength(3, 50)]"
                />
              </v-col>
              <template v-if="!isEditMode">
                <v-col cols="12">
                  <v-text-field
                    v-model="form.street"
                    :label="tCap('address.street')"
                    :rules="[required, rangeLength(3, 50)]"
                  />
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="form.city"
                    :label="tCap('address.city')"
                    :rules="[required, rangeLength(3, 50)]"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.zip"
                    :label="tCap('address.zip')"
                    :rules="[maxLength(50)]"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.country"
                    :label="tCap('address.country')"
                    :rules="[maxLength(50)]"
                  />
                </v-col>
              </template>
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
import { defineProps, computed, reactive, watch } from 'vue';

import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useDeliveryCarriers } from '@/presentation/composables/deliveryCarrier/useDeliveryCarriers';
import { useValidationRules } from '@/presentation/composables/useValidationRules';

const { maxLength, required, rangeLength } = useValidationRules();

const { createDeliveryCarrierCommandHandler, editDeliveryCarrierCommandHandler } = useDeliveryCarriers();

const { tCap } = useLocalizationHelpers();

const props = defineProps({
  carrier: {
    type: DeliveryCarrier,
    required: false,
    default: null
  },
  mini: {
    type: Boolean,
    required: false,
    default: false
  }
});

const isEditMode = computed(() => !!props.carrier);

const dialogTitle = computed(() => {
  if(isEditMode.value) {
    return tCap('deliveryCarrier.editCarrier');
  }
  return tCap('deliveryCarrier.addCarrier');
});

const modeIcon = computed(() => {
  if(isEditMode.value) {
    return "mdi-pencil";
  }
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

watch(dialog, (open) => {
  if(open && props.carrier) {
    form.name = props.carrier.name;
  }
});

async function saveCarrier() {
  await submit(async (form) => {
    if(isEditMode.value) {
      await editDeliveryCarrierCommandHandler.handle({ 
        id: props.carrier.id,
        name: form.name
      });
    } else {
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
    }
  });
}

</script>

<style scoped>
</style>