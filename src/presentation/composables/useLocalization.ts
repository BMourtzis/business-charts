import { useI18n } from 'vue-i18n'

type CaseForm = 'nom' | 'gen' | 'acc'

export function useLocalizationHelpers() {
  const { t, locale  } = useI18n();

  const tCap = (key: string, count = 1) => {
    const str = t(key, count)
    if (typeof str !== 'string') return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  //TODO: figure out if it's a good case to do forms for greek language
  const noun = (base: string, form: CaseForm = 'nom') => {
    return t(`nouns.${base}_${form}`)
  }

  const switchLocale = (target: string) => {
    locale.value = target
  }

  return { tCap, t, noun, switchLocale };
}