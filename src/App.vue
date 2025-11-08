<template> 
  <v-app>
    <!-- Sidebar (Navigation Drawer) -->
    <v-navigation-drawer
      app
      expand-on-hover
      permanent
      rail
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          to="/"
        />
      </v-list>

      <v-divider />

      <v-list 
        density="compact" 
        nav
      >
        <v-list-item 
          v-for="item in mainLinks"
          :key="item.title"
          :prepend-icon="item.icon" 
          :title="item.title" 
          :to="item.to"
        />
      </v-list>
      <v-divider />
      <v-list 
        density="compact" 
        nav
      >
        <v-list-item 
          v-for="item in settingsLinks"
          :key="item.title"
          :prepend-icon="item.icon" 
          :title="item.title" 
          :to="item.to"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Top Bar -->
    <v-app-bar 
      app 
      color="primary" 
      dark
    >
      <!-- <v-app-bar-title
        class="app-bar-title"
      >
        {{ pageTitle }}
      </v-app-bar-title> -->

      <!-- <v-spacer /> -->

      <!-- <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const isExpanded = ref(false);

const { tCap } = useLocalizationHelpers();

const mainLinks = [
  { title: tCap('partner.supplier', 2), icon: 'mdi-account-multiple-outline', to: '/suppliers' },
  // { title: 'Orders', icon: 'mdi-receipt-text-outline', to: '/orders' },
  // { title: 'Reports', icon: 'mdi-chart-bar', to: '/reports' },
]

const settingsLinks = [
  { title: 'Data', icon: 'mdi-file-arrow-left-right', to: '/data-transfer' },
]

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

.v-navigation-drawer {
  z-index: 10; /* Ensures drawer is above top bar */
}

.app-bar-title {
  position: absolute;
  left: 0px; /* collapsed rail width */
  transition: left 0.3s ease;
}

.v-navigation-drawer:hover ~ .v-application .app-bar-title,
.v-navigation-drawer:hover + .v-app-bar .app-bar-title {
  left: 18%; /* expanded width */
}
</style>
