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
          <v-container
            class="pa-0" 
            fluid
          >
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="form.contactName"
                  :label="tCap('partner.contactName')"
                  :rules="[required, rangeLength(3, 50)]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.businessName"
                  :label="tCap('partner.businessName')"
                  :rules="[maxLength(50)]"
                />
              </v-col>
              <v-col 
                v-if="supplier" 
                cols="12"
              >
                <v-text-field
                  v-model="form.activity"
                  :label="tCap('partner.activity')"
                  :rules="[required, maxLength(50)]"
                />
              </v-col>
              <v-col 
                v-if="b2bCustomer" 
                cols="12"
              >
                <v-autocomplete
                  v-model="form.deliveryCarrierId"
                  :item-props="itemProps"
                  label="Carrier"
                  :items="carriers"
                >
                  <template #append-inner>
                    <CarrierModal mini />
                  </template>
                </v-autocomplete>
              </v-col>
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

import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier';
import { isB2BCustomer, isSupplier } from '@/domain/partner/typeGuards';
import { Partner } from '@/domain/partner/models/partner';

import { usePartners } from '@/presentation/composables/partner/usePartners';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useDeliveryCarriers } from '@/presentation/composables/deliveryCarrier/useDeliveryCarriers';
import { useValidationRules } from '@/presentation/composables/useValidationRules';

import CarrierModal from '@/presentation/components/deliveryCarrier/CarrierModal.vue'

const { maxLength, required, rangeLength } = useValidationRules();

const { editSupplierCommandHandler, editB2BCustomerCommandHandler } = usePartners();

const { carriers } = useDeliveryCarriers()

const { tCap, t } = useLocalizationHelpers();

const props = defineProps<{
  partner: Partner;
  mini: boolean;
}>();


const form = reactive({
  businessName: '',
  contactName: '',
  activity: '',
  deliveryCarrierId: ''
});

function itemProps(item: DeliveryCarrier) {
    return {
        title: item.name,
        value: item.id,
        subtitle: item.primaryLocation?.value ?? ""
    }
}

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
    if(b2bCustomer.value) {
      form.deliveryCarrierId = b2bCustomer.value.deliveryCarrierId ?? "";
    }
  }
});

const supplier = computed(() =>
  props.partner && isSupplier(props.partner)
    ? props.partner
    : undefined
);

const b2bCustomer = computed(() =>
  props.partner && isB2BCustomer(props.partner)
    ? props.partner
    : undefined
);

async function saveSupplier() {
  await submit(async (form) => {
    if(supplier.value) {
      editSupplierCommandHandler.handle({
        id: props.partner?.id ?? '', 
        contactName: form.contactName, 
        activity: form.activity, 
        businessName: form.businessName
      });
    } else if(b2bCustomer.value) {
      editB2BCustomerCommandHandler.handle({
        id: props.partner?.id ?? '',
        contactName: form.contactName,
        businessName: form.businessName,
        deliveryCarrierId: form.deliveryCarrierId
      });
    }

  });
}
</script>

<style scoped>
</style>