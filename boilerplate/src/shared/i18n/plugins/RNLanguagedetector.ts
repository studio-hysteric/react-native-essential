// From: https://gitlab.com/os-team/libs/utils/-/blob/main/packages/i18next-react-native-language-detector/src/index.ts

import { getItem, setItem } from '@/libs/storage';
import { LanguageDetectorModule } from 'i18next';
import { Platform, NativeModules } from 'react-native';
import { STORAGE_LANGUAGE } from '@/config';
import { dayjs } from '@/libs/date';

const FALLBACK_LANGUAGE = 'en';

/**
 * Safely get device locale
 */
const getDeviceLocale = (): string => {
  try {
    if (Platform.OS === 'ios') {
      const settings = NativeModules.SettingsManager?.settings;
      if (!settings) {
        return FALLBACK_LANGUAGE;
      }
      return settings.AppleLocale || settings.AppleLanguages?.[0] || FALLBACK_LANGUAGE;
    } else {
      return NativeModules.I18nManager?.localeIdentifier || FALLBACK_LANGUAGE;
    }
  } catch (error) {
    console.warn('[RNLanguageDetector] Failed to get device locale:', error);
    return FALLBACK_LANGUAGE;
  }
};

/**
 * Extract language code from locale string
 * Examples: "en_US" -> "en", "vi-VN" -> "vi", "en" -> "en"
 */
const extractLanguageCode = (locale: string): string => {
  if (!locale) return FALLBACK_LANGUAGE;

  // Handle both underscore and hyphen separators
  const match = locale.match(/^([a-z]{2})[_-]?/i);
  return match ? match[1].toLowerCase() : FALLBACK_LANGUAGE;
};

const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: (): string => {
    try {
      // Priority 1: Saved language preference
      const savedLanguage = getItem(STORAGE_LANGUAGE) as string;
      if (savedLanguage) {
        dayjs.locale(savedLanguage);
        return savedLanguage;
      }

      // Priority 2: Device locale
      const deviceLocale = getDeviceLocale();
      const languageCode = extractLanguageCode(deviceLocale);

      dayjs.locale(languageCode);
      return languageCode;
    } catch (error) {
      console.warn('[RNLanguageDetector] Detection failed:', error);
      return FALLBACK_LANGUAGE;
    }
  },
  cacheUserLanguage: (lng: string) => {
    try {
      dayjs.locale(lng);
      setItem(STORAGE_LANGUAGE, lng);
    } catch (error) {
      console.warn('[RNLanguageDetector] Failed to cache language:', error);
    }
  },
};

export default RNLanguageDetector;
