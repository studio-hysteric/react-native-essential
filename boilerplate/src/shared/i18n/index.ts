import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from './plugins/RNLanguagedetector';

import * as translations from './locales';

/**
 * Recursive type to extract all nested keys from translation object
 * Example: { common: { theme: "Theme" } } -> "common.theme"
 */
type RecursivePaths<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends object
        ? `${K & string}.${RecursivePaths<T[K]>}`
        : K & string;
    }[keyof T]
  : never;

// Get the first translation object as the base structure
// All translations should have the same structure
const translationEntries = Object.entries(translations);
if (translationEntries.length === 0) {
  throw new Error('[i18n] No translations found. Please add translation files.');
}

const translationValues = translationEntries[0][1];

// Export types for type-safe usage
export type AppLanguages = keyof typeof translations;
export type AllTranslationKeys = RecursivePaths<typeof translationValues>;

// Build resources object for i18next
const resources = Object.keys(translations).reduce(
  (acc, curr) => {
    acc[curr] = { translation: translations[curr as AppLanguages] };
    return acc;
  },
  {} as Record<string, { translation: typeof translationValues }>,
);

// Initialize i18next
i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    supportedLngs: Object.keys(translations),
    resources,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    compatibilityJSON: 'v3', // For older Android versions
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

export default i18n;
