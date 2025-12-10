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
import { onMounted, watch } from 'vue';
import MainNavigation from './presentation/components/MainNavigation.vue';
import VaultModal from './presentation/components/VaultModal.vue';

import { useStoreSync } from './presentation/composables/useStoreSync';
import { createPartnerStoreSyncAdapter } from './presentation/stores/partnerStore';
import { useVault } from './presentation/composables/useVault';

const { isUnlocked } = useVault();

onMounted(() => {
  var adapter = createPartnerStoreSyncAdapter();

  const storeSync = useStoreSync();
  storeSync.registerStore(adapter);

  watch(isUnlocked, (newVal: boolean) => {
    if (newVal) {
      adapter.ready = true;
    }
  }, { immediate: true });

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
