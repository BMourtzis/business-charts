<template>
  <v-dialog 
    v-model="dialog" 
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Add Supplier"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>

    <v-card title="Add Supplier">
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-text-field
                v-model="businessName"
                label="Business Name"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="contactName"
                label="Contact Name"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="vatNumber"
                label="VAT Number"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="phone"
                label="Phone"
                placeholder="21080212345"
                type="tel"
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="address"
                label="Address"
              />
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="indigo"
          text="Save"
          @click="saveSupplier"
        />
        <v-btn
          text="Cancel"
          color="red"
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { usePartners } from '../composables/usePartners';
import { createAddress, createEmail, createPhone } from '@/domain/models/contact';

const { createSupplierCommand } = usePartners();

const dialog = shallowRef(false)

let contactName = '';
let email = '';
let phone = '';
let address = '';
let businessName = '';
let vatNumber = '';

function saveSupplier() {
  let emailList = [];
  if (email.trim() !== '') {
    emailList.push(createEmail(email, true));
  }

  let phoneList = [];
  if (phone.trim() !== '') {
    phoneList.push(createPhone(phone, true));
  }

  let addressList = [];
  if (address.trim() !== '') {
    addressList.push(createAddress(address, true));
  }

  createSupplierCommand(contactName, emailList, phoneList, addressList, businessName, vatNumber);
  dialog.value = false;
}
</script>

<style scoped>
</style>