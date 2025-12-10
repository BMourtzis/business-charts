import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { router } from './presentation/router/index';

import { createPinia } from 'pinia';

import i18n from './presentation/localization/index';

import { keySyncService } from './infrastructure/services/keySyncService'

import storeSyncPlugin from './plugins/storeSyncPlugin/storeSyncPluginApi';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: { mdi }
    }
});

keySyncService.register();

createApp(App)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .use(vuetify)
    .use(storeSyncPlugin)
    .mount('#app');
