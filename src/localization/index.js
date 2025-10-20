import { createI18n } from "vue-i18n";

const message = {
    en: { hello: "Hello"},
    el: { hello: "Γειά"}
};

const i18n = createI18n({
    locale: "el",
    fallbackLocale: "el",
    message
});

export default i18n;