<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        :text="tCap('partner.addSupplierTitle')"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>
    <v-card :title="tCap('partner.addSupplierTitle')">
      <v-card-text>
        <v-form 
          ref="formRef" 
          v-model="validForm"
        >
          <v-container>
            <v-row>
              <v-autocomplete
                v-model="form.partnerId"
                :item-props="itemProps"
                label="Partner"
                :items="partners"
              />
            </v-row>
            <v-row>
              <v-select
                v-model="form.direction"
                label="Direction"
                :items="directions"
              />
            </v-row>
            <!-- <v-row>
              <v-text-field
                v-model="form.vatNumber"
                :label="tCap('partner.vatNumber')"
                :rules="[numeric, rangeLength(8, 8)]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.email"
                :label="tCap('partner.mainEmailField')"
                placeholder="johndoe@gmail.com"
                type="email"
                :rules="[emailFormat]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.phone"
                :label="tCap('partner.mainPhoneField')"
                placeholder="21080212345"
                type="tel"
                :rules="[phoneFormat]"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.address"
                :label="tCap('partner.mainAddressField')"
                :rules="[maxLength(50)]"
              />
            </v-row> -->
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
          @click="saveOrder"
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
import { reactive } from 'vue';

import { OrderItemDTO } from "@/application/dto/orderDTO";

import { useOrders } from '@/presentation/composables/useOrders';
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useFormDialog } from '@/presentation/composables/useFormDialog';
import { PartnerDTO } from '@/application/dto/partnerDTO';

const { createDebitOrderCommand, createCreditOrderCommand, partners } = useOrders();

const { tCap } = useLocalizationHelpers();

const directions = ["Credit", "Debit"];

const form = reactive({
    direction: '',
    partnerId: '',
    items: [] as OrderItemDTO[]
});

function itemProps(item: PartnerDTO) {
    return {
        title: item.businessName || item.contactName,
        value: item.id,
        subtitle: item.type
    }
}

const {
  dialog, 
  validForm,
  loading,
  errorMessage,
  close,
  submit
} = useFormDialog(form);

async function saveOrder() {
  await submit(async (form) => {
    console.log(form);
    if(form.direction === 'credit') {
        createCreditOrderCommand(form.partnerId);
    } else if (form.direction === 'debit') {
        createDebitOrderCommand(form.partnerId);
    }

  });
}

</script>

<style scoped></style>