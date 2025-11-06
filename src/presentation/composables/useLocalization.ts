import { useI18n } from 'vue-i18n'

export type LocaleType = "en" | "el";

export function useLocalizationHelpers() {
  const { t, locale  } = useI18n();

  const tCap = (key: string, count = 1) => {
    const str = t(key, count)
    if (typeof str !== 'string') return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const switchLocale = (target: LocaleType) => {
    locale.value = target
  }

  return { tCap, t, switchLocale };
}