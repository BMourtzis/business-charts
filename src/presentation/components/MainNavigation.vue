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
        :title="t('pages.home')"
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

    <!-- <v-divider />

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
    </v-list> -->
  </v-navigation-drawer>

  <!-- Top Bar -->
  <v-app-bar 
    app 
    color="primary" 
    dark
  >
    <v-app-bar-title
      class="app-bar-title"
    >
      {{ pageTitle }}
    </v-app-bar-title>

    <v-spacer />

    <v-btn 
      :icon="lockIcon"
      @click="lock"
    />

    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-dots-vertical"
        />
      </template>

      <v-list density="compact">
        <v-list-item
          prepend-icon="mdi-form-textbox-password"
          :title="t('pages.changePassword')"
          to="/change-password"
        />
        <v-list-item
          prepend-icon="mdi-file-arrow-left-right"
          :title="t('pages.dataTransfer')"
          to="/data-transfer"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router';

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { useVault } from '@/presentation/composables/useVault';

const isExpanded = ref(false);

const { isLocked, lock } = useVault();

const { t } = useLocalizationHelpers();

const route = useRoute();

const open = ref([]);

const lockIcon = computed(() => {
  if(isLocked.value) return "mdi-lock";

  return "mdi-lock-open-variant"
})

const pageTitle = computed(() => {
  const key = titleMap[route.name as string];
  return key ? t(key) : "";
});

type NavItem = {
  title: string;
  icon: string;
  name?: string;
  to?: string;
  items?: NavItem[];
};

const navItems = [
  { title: t('pages.partner.partners', 2), icon: "mdi-account-multiple-outline", name:"Partners", items: [
    { title: t('pages.partner.suppliers', 2), icon: 'mdi-account-multiple-outline', to: '/suppliers' },
    { title: t('pages.partner.b2bCustomers', 2), icon: 'mdi-account-multiple-outline', to: '/b2b-customers' },
    { title: t('pages.deliveryCarrier.carriers', 2), icon: 'mdi-truck-delivery', to: '/carriers' },
  ]},
  { title: t('pages.order.orders', 2), icon: 'mdi-receipt-text-outline', to: '/orders' },
  // { title: 'Reports', icon: 'mdi-chart-bar', to: '/reports' },
] as NavItem[];

const titleMap: Record<string, string> = {
  home:"pages.home",
  suppliers: 'pages.partner.suppliers',
  b2bCustomers: 'pages.partner.b2bCustomers',
  partnerDetails: "pages.partner.details",
  deliveryCarriers: "pages.deliveryCarrier.carriers",
  deliveryCarrierDetails: "pages.deliveryCarrier.details",
  dataTransfer: "pages.dataTransfer",
  changePassword: "pages.changePassword",
  orders: "pages.order.orders",
  orderDetails: "pages.order.details"
};

function isLeaf(item: NavItem): boolean {
  return !item.items?.length && Boolean(item.to);
}


// const settingsLinks = [
//   { title: t('pages.dataTransfer'), icon: 'mdi-file-arrow-left-right', to: '/data-transfer' },
// ]
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

@media (min-width: 960px) {
  .v-navigation-drawer:hover ~ .v-application .app-bar-title,
  .v-navigation-drawer:hover + .v-app-bar .app-bar-title {
    left: 200px;
  }
}

</style>