import { createI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';
import zh from './zh';
import en from './en';

export enum Language {
  ZH = 'zh',
  EN = 'en',
}

export const currentLang = useStorage<Language>('lang', Language.ZH);

const messages = {
  zh,
  en,
};

const i18n = createI18n({
  locale: Language.ZH,
  messages,
});

export const changeLang = (lang: Language) => {
  i18n.global.locale = lang;
  currentLang.value = lang;
};

i18n.global.locale = currentLang.value;

export { i18n };
