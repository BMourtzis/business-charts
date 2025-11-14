<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-if="!mini"
        v-bind="activatorProps"
        color="surface-variant"
        :text="`${tCap('common.edit')} ${t('partner.partner')}`"
        prepend-icon="mdi-pencil"
        variant="flat"
      />
      <v-btn
        v-if="mini"
        v-bind="activatorProps"
        color="surface-variant"
        icon="mdi-pencil"
        variant="text"
        density="compact"
      />
    </template>
    <v-card :title="`${tCap('common.edit')} ${form.businessName}`">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <v-text-field
                v-model="form.contactName"
                :label="tCap('partner.contactName')"
                :rules="[required, rangeLength(3, 50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.businessName"
                :label="tCap('partner.businessName')"
                :rules="[maxLength(50)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.activity"
                :label="tCap('partner.activity')"
                :rules="[required, maxLength(50)]"
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
          @click="saveSupplier"
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
import { reactive, watch, defineProps, computed } from 'vue';

import { usePartners } from '@/presentation/composables/usePartners';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

import { maxLength, rangeLength, required } from '@/presentation/utils/validation';
import { Partner } from '@/domain/partner/models/partner';
import { isSupplier } from '@/domain/partner/typeGuards';

const { editSupplierCommandHandler } = usePartners();

const { tCap, t } = useLocalizationHelpers();

const props = defineProps<{
  partner: Partner;
  mini: boolean;
}>();


const form = reactive({
  businessName: '',
  contactName: '',
  activity: '',
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
  if(open && props.partner) {
    form.businessName = props.partner.businessName ?? "";
    form.contactName = props.partner.contactName;
    if(supplier.value) {
      form.activity = supplier.value.activity ?? "";
    }
  }
});

const supplier = computed(() =>
  props.partner && isSupplier(props.partner)
    ? props.partner
    : undefined
);

async function saveSupplier() {
  await submit(async (form) => {
    editSupplierCommandHandler.handle({
      id: props.partner?.id ?? '', 
      contactName: form.contactName, 
      activity: form.activity, 
      businessName: form.businessName
    });
  });
}
</script>

<style scoped>
</style>