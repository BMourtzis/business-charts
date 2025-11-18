<template>
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
        title="Home"
        to="/"
      />
    </v-list>

    <v-divider />
    
    <v-list 
      v-model:opened="open"
      density="compact"
      nav
    >
      <template
        v-for="item in navItems"
      >
        <v-list-item 
          v-if="isLeaf(item)"
          :key="item.title"
          :prepend-icon="item.icon" 
          :title="item.title" 
          :to="item.to"
        />
        <v-list-group 
          v-if="!isLeaf(item)"
          :key="item.name"
          :value="item.name"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
            />
          </template>
          <v-list-item 
            v-for="groupItem in item.items"
            :key="groupItem.title"
            :title="groupItem.title" 
            :to="groupItem.to"
          />
        </v-list-group>
      </template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

const isExpanded = ref(false);

const { tCap } = useLocalizationHelpers();

const open = ref(["Partners"]);

type NavItem = {
  title: string;
  icon: string;
  name?: string;
  to?: string;
  items?: NavItem[];
};

const navItems = [
  { title: tCap('partner.partner', 2), icon: "mdi-account-multiple-outline", name:"Partners", items: [
    { title: tCap('partner.supplier', 2), icon: 'mdi-account-multiple-outline', to: '/suppliers' },
    { title: tCap('partner.b2bCustomer', 2), icon: 'mdi-account-multiple-outline', to: '/b2b-customers' },
    { title: tCap('deliveryCarrier.carrier', 2), icon: 'mdi-truck-delivery', to: '/carriers' },
  ]},
  // { title: 'Orders', icon: 'mdi-receipt-text-outline', to: '/orders' },
  // { title: 'Reports', icon: 'mdi-chart-bar', to: '/reports' },
] as NavItem[];

function isLeaf(item: NavItem): boolean {
  return !item.items?.length && Boolean(item.to);
}


const settingsLinks = [
  { title: 'Data', icon: 'mdi-file-arrow-left-right', to: '/data-transfer' },
]
</script>

<style scoped>
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