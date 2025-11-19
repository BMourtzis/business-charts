<template>
  <v-container v-if="carrierModel">
    <CarrierHeader
      :carrier="carrierModel"
    />
    <v-row
      class="mt-6"
      align="start"
    >
      <v-col 
        cols="12" 
        md="8"
        xl="10"
      >
        <v-card>
          <v-card-title>
            <div class="d-flex align-center justify-space-between w-100">
              <span>{{ tCap('partner.b2bCustomer', 2) }}</span>
              <v-chip 
                color="primary" 
                size="small"
              >
                {{ b2bCustomers.length }}
              </v-chip>
            </div>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <div 
              v-if="b2bCustomers.length === 0" 
              class="text-grey text-body-2"
            >
              {{ tCap('carrier.noB2bUsingCarrier') }}
            </div>
            <v-list 
              v-else
              lines="one" 
            >
              <v-list-item
                v-for="customer in b2bCustomers"
                :key="customer.id"
                :to="`/partner/${customer.id}`"
                class="rounded-lg mb-1"
                prepend-icon="mdi-account-briefcase"
              >
                <v-list-item-title>
                  {{ customer.businessName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ customer.contactName }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col 
        cols="12" 
        md="4"
        xl="2"
      >
        <ContactInfo
          :contact-info="carrierModel"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { getCarrierDetails, useCarrierCustomers } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";

import ContactInfo from "@/presentation/components/contact/ContactInfo.vue";
import CarrierHeader from "@/presentation/components/deliveryCarrier/CarrierHeader.vue";

const props = defineProps<{ id: string }>();

const { tCap } = useLocalizationHelpers()

const carrierModel = getCarrierDetails(props.id);
const { b2bCustomers } = useCarrierCustomers(props.id);

</script>

<style scoped></style>