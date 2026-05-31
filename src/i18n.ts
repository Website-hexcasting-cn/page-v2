import { init, register, waitLocale } from 'svelte-i18n'

register('en', () => import('./locales/en.json'))
register('zh', () => import('./locales/zh.json'))

function getBrowserLocale(): string {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = window.navigator.language.split('-')[0]
  const supportedLocales = ['zh', 'en']
  
  return supportedLocales.includes(browserLang) ? browserLang : 'en'
}

const initialLocale = getBrowserLocale()

const initialized = init({
  fallbackLocale: 'en',
  initialLocale: initialLocale
})

export const waitForI18n = async () => {
  await initialized
  await waitLocale()
}
