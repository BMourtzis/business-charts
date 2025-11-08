import { createI18n } from "vue-i18n";

import en from './en.json'
import el from './el.json'

const messages = { en, el };

type MessageSchema = typeof en;


const i18n = createI18n({
    legacy: false,
    locale: "el",
    fallbackLocale: "el",
    messages
});

export default i18n;
export type { MessageSchema };