import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import router from './router';

import { createPinia } from 'pinia';
import i18n from './localization';

const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: { mdi }
    }
});

createApp(App)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .use(vuetify)
    .mount('#app');
