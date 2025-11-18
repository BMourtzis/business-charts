<template>
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
            v-if="contactInfo.emails.length === 0"
            class="text-grey text-body-2 mb-2"
          >
            {{ tCap('contact.noEmails') }}
          </div>

          <div
            v-for="email in contactInfo.emails"
            :key="email.id"
            class="d-flex align-center justify-space-between mb-2"
          >
            <EmailLink :email="email" />

            <div class="d-flex align-center">
              <ContactModal
                :owner-id="contactInfo.id"
                :contact="email"
                :owner-type="ownerType"
                :contact-type="ContactType.Email"
                mini
              />
              <ConfirmDeleteModal
                :name="email.value"
                :action-fn="() => removeEmailCommandHandler(contactInfo.id, email.id )"
                mini
              />
            </div>
          </div>

          <ContactModal
            :owner-id="contactInfo.id"
            :owner-type="ownerType"
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
            v-if="contactInfo.phones.length === 0"
            class="text-grey text-body-2 mb-2"
          >
            {{ tCap('contact.noPhones') }}
          </div>

          <div
            v-for="phone in contactInfo.phones"
            :key="phone.id"
            class="d-flex align-center justify-space-between mb-2"
          >
            <PhoneLink :phone="phone" />

            <div class="d-flex align-center">
              <ContactModal
                :owner-id="contactInfo.id"
                :contact="phone"
                :owner-type="ownerType"
                :contact-type="ContactType.Phone"
                mini
              />
              <ConfirmDeleteModal
                :name="phone.value"
                :action-fn="() => removePhoneCommandHandler(contactInfo.id, phone.id)"
                mini
              />
            </div>
          </div>

          <ContactModal
            :owner-id="contactInfo.id"
            :owner-type="ownerType"
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
            v-if="contactInfo.addresses.length === 0"
            class="text-grey text-body-2 mb-2"
          >
            {{ tCap('contact.noAddress') }}
          </div>

          <div
            v-for="address in contactInfo.addresses"
            :key="address.id"
            class="d-flex align-center justify-space-between mb-2"
          >
            <AddressLink
              :address="address"
              format="full"
            />

            <div class="d-flex align-center">
              <AddressModal
                :owner-id="contactInfo.id"
                :address="address"
                :owner-type="ownerType"
                mini
              />
              <ConfirmDeleteModal
                :name="address.value"
                :action-fn="() => removeAddressCommandHandler(contactInfo.id, address.id)"
                mini
              />
            </div>
          </div>

          <AddressModal
            :owner-id="contactInfo.id"
            :owner-type="ownerType"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

import { Partner } from "@/domain/partner/models/partner";
import { ContactType } from "@/domain/contact/contactTypes";
import { Address } from "@/domain/contact/models/address";
import { Contact } from "@/domain/contact/models/contact";

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { usePartners } from "@/presentation/composables/partner/usePartners";

import AddressModal from "@/presentation/components/contact/AddressModal.vue";
import ContactModal from "@/presentation/components/contact/ContactModal.vue";
import EmailLink from "@/presentation/components/contact/EmailLink.vue";
import PhoneLink from "@/presentation/components/contact/PhoneLink.vue";
import AddressLink from "@/presentation/components/contact/AddressLink.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";

import { useDeliveryCarriers } from "@/presentation/composables/deliveryCarrier/useDeliveryCarriers";

const { tCap } = useLocalizationHelpers();

const partnerCommands = usePartners();
const carrierCommands = useDeliveryCarriers();

type ContactInfo = {
  id: string,
  emails: Contact[],
  phones: Contact[],
  addresses: Address[]
}

const props = defineProps<{ 
  contactInfo: ContactInfo
}>();

const ownerType = computed(() => {
  if(props.contactInfo instanceof Partner) {
    return "partner";
  }
  return "deliveryCarrier";
});

function removeEmailCommandHandler(ownerId: string, emailId: string) {
  if(ownerType.value === 'partner') {
    partnerCommands.removeEmailCommandHandler.handle({partnerId: ownerId, emailId: emailId});
  } else {
    carrierCommands.removeEmailCommandHandler.handle({carrierId: ownerId, emailId: emailId});
  }
}

function removePhoneCommandHandler(ownerId: string, phoneId: string) {
  if(ownerType.value === 'partner') {
    partnerCommands.removePhoneCommandHandler.handle({partnerId: ownerId, phoneId: phoneId});
  } else {
    carrierCommands.removePhoneCommandHandler.handle({carrierId: ownerId, phoneId: phoneId});
  }
}

function removeAddressCommandHandler(ownerId: string, addressId: string) {
  if(ownerType.value === 'partner') {
    partnerCommands.removeAddressCommandHandler.handle({partnerId: ownerId, addressId: addressId});
  } else {
    carrierCommands.removeAddressCommandHandler.handle({carrierId: ownerId, addressId: addressId});
  }
}

</script>

<style scoped></style>