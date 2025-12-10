<template> 
  <v-app>
    <MainNavigation />
    <VaultModal />
    <!-- Main Content -->
    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MainNavigation from './presentation/components/MainNavigation.vue';
import VaultModal from './presentation/components/VaultModal.vue';

import { useStoreSync } from './presentation/composables/useStoreSync';
import { usePartnersStore } from './presentation/stores/partnerStore';
import { useDeliveryCarrierStore } from './presentation/stores/deliveryCarrierStore';

//TODO: move to a better area
onMounted(() => {
  const storeSync = useStoreSync();

  storeSync.registerStore(usePartnersStore());
  storeSync.registerStore(useDeliveryCarrierStore());
});


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
