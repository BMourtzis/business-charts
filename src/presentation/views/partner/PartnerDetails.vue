<template>
  <v-container v-if="partnerModel">
    <v-row>
      <h1>
        {{ partnerModel.businessName }} 
        <span 
          v-if="supplier" 
          style="font-weight: 100;"
        >
          ({{ t('partner.supplier') }})
        </span>
        <span 
          v-if="isB2BCustomer(partnerModel)" 
          style="font-weight: 100;"
        >
          ({{ t('partner.b2bCustomer') }})
        </span>
      </h1>
      <EditPartnerModal 
        :partner="partnerModel" 
        mini
      />
      <ConfirmDeleteModal
        :name="partnerModel.businessName"
        :action-fn="() => deletePartner()"
        mini
      />
    </v-row>
    <v-row>
      <p>{{ partnerModel.contactName }}</p>
    </v-row>
    <v-row v-if="supplier">
      <p>{{ tCap('partner.activity') }}: <strong>{{ supplier.activity }}</strong></p>
    </v-row>
    <v-row v-if="b2bCustomer && carrier">
      <p>
        {{ tCap('deliveryCarrier.carrier') }}: <strong>{{ carrier.name }}</strong> - 
        <AddressLink 
          :address="carrier.primaryLocation"
          format="full"
        />
      </p>
    </v-row>
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
            Orders
          </v-card-title>

          <v-divider />

          <v-card-text>data</v-card-text>
        </v-card>
      </v-col>
      <v-col 
        cols="12" 
        md="4"
        xl="2"
      >
        <!-- Move to separate component -->
        <v-card>
          <v-card-title>
            {{ tCap('contact.contactInfo') }}
          </v-card-title>

          <v-divider />

          <v-card-text>
            <!-- EMAILS ROW -->
            <v-row>
              <v-col>
                <h3 class="text-subtitle-2 mb-2">
                  {{ tCap('contact.email', 2) }}
                </h3>

                <div
                  v-if="partnerModel.emails.length === 0"
                  class="text-grey text-body-2 mb-2"
                >
                  {{ tCap('contact.noEmails') }}
                </div>

                <div
                  v-for="email in partnerModel.emails"
                  :key="email.id"
                  class="d-flex align-center justify-space-between mb-2"
                >
                  <EmailLink :email="email" />

                  <div class="d-flex align-center">
                    <ContactModal
                      :owner-id="props.id"
                      :contact="email"
                      owner-type="partner"
                      :contact-type="ContactType.Email"
                      mini
                    />
                    <ConfirmDeleteModal
                      :name="email.value"
                      :action-fn="() => removeEmailCommandHandler
                        .handle({ partnerId: props.id, emailId: email.id })"
                      mini
                    />
                  </div>
                </div>

                <ContactModal
                  :owner-id="partnerModel.id"
                  owner-type="partner"
                  :contact-type="ContactType.Email"
                />
              </v-col>
            </v-row>

            <v-divider class="my-4" />

            <v-row>
              <v-col>
                <h3 class="text-subtitle-2 mb-2">
                  {{ tCap('contact.phone', 2) }}
                </h3>

                <div
                  v-if="partnerModel.phones.length === 0"
                  class="text-grey text-body-2 mb-2"
                >
                  {{ tCap('contact.noPhones') }}
                </div>

                <div
                  v-for="phone in partnerModel.phones"
                  :key="phone.id"
                  class="d-flex align-center justify-space-between mb-2"
                >
                  <PhoneLink :phone="phone" />

                  <div class="d-flex align-center">
                    <ContactModal
                      :owner-id="props.id"
                      :contact="phone"
                      owner-type="partner"
                      :contact-type="ContactType.Phone"
                      mini
                    />
                    <ConfirmDeleteModal
                      :name="phone.value"
                      :action-fn="() => removePhoneCommandHandler
                        .handle({ partnerId: props.id, phoneId: phone.id })"
                      mini
                    />
                  </div>
                </div>

                <ContactModal
                  :owner-id="partnerModel.id"
                  owner-type="partner"
                  :contact-type="ContactType.Phone"
                />
              </v-col>
            </v-row>

            <v-divider class="my-4" />

            <!-- ADDRESSES ROW -->
            <v-row>
              <v-col>
                <h3 class="text-subtitle-2 mb-2">
                  {{ tCap('address.address', 2) }}
                </h3>

                <div
                  v-if="partnerModel.addresses.length === 0"
                  class="text-grey text-body-2 mb-2"
                >
                  {{ tCap('contact.noAddress') }}
                </div>

                <div
                  v-for="address in partnerModel.addresses"
                  :key="address.id"
                  class="d-flex align-center justify-space-between mb-2"
                >
                  <AddressLink
                    :address="address"
                    format="full"
                  />

                  <div class="d-flex align-center">
                    <AddressModal
                      :owner-id="props.id"
                      :address="address"
                      owner-type="partner"
                      mini
                    />
                    <ConfirmDeleteModal
                      :name="address.value"
                      :action-fn="() => removeAddressCommandHandler
                        .handle({ partnerId: props.id, addressId: address.id })"
                      mini
                    />
                  </div>
                </div>

                <AddressModal
                  :owner-id="partnerModel.id"
                  owner-type="partner"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRouter } from 'vue-router';

import { isB2BCustomer, isSupplier } from "@/domain/partner/typeGuards";
import { ContactType } from "@/domain/contact/contactTypes";

import { usePartners } from "@/presentation/composables/partner/usePartners";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { usePartnerDetails } from "@/presentation/composables/partner/usePartnerDetails";
import { getCarrierDetails } from "@/presentation/composables/deliveryCarrier/useDeliveryCarrierDetails";

import EditPartnerModal from "@/presentation/components/partner/EditPartnerModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";
import AddressModal from "@/presentation/components/contact/AddressModal.vue";
import ContactModal from "@/presentation/components/contact/ContactModal.vue";
import AddressLink from "@/presentation/components/contact/AddressLink.vue";
import EmailLink from "@/presentation/components/contact/EmailLink.vue";
import PhoneLink from "@/presentation/components/contact/PhoneLink.vue";

const props = defineProps<{ id: string }>();

const { tCap, t } = useLocalizationHelpers()

const { 
  removeEmailCommandHandler,
  removePhoneCommandHandler,
  removeAddressCommandHandler,
  deletePartnerCommandHandler 
} = usePartners();

const router = useRouter();

const { model: partnerModel} = usePartnerDetails(props.id);

const supplier = computed(() =>
  partnerModel.value && isSupplier(partnerModel.value)
    ? partnerModel.value
    : undefined
);


const b2bCustomer = computed(() =>
  partnerModel.value && isB2BCustomer(partnerModel.value)
    ? partnerModel.value
    : undefined
);

const carrier = b2bCustomer.value ? getCarrierDetails(b2bCustomer.value.deliveryCarrierId) : undefined;

function deletePartner() {
  router.back();
  deletePartnerCommandHandler.handle({id: props.id});
}

</script>

<style scoped></style>
