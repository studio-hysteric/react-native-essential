import { useTranslation } from 'react-i18next';
import { AllTranslationKeys, AppLanguages } from '../i18n';

/**
 * Type-safe i18n hook
 *
 * Usage:
 * const { t, currentLng, languages, changeLanguage } = useI18n();
 *
 * // Simple translation
 * t('common.theme')
 *
 * // With interpolation (type-safe if you want to extend)
 * t('form.login.email_error_empty')
 */
export const useI18n = () => {
  const { t: translate, i18n } = useTranslation();

  const currentLng = i18n.language as AppLanguages;

  // Get supported languages from i18n config (stable API)
  const languages = i18n.options.supportedLngs?.filter(
    (lng) => lng !== 'cimode', // Remove i18next's internal language
  ) as AppLanguages[];

  /**
   * Type-safe translation function
   * @param key - Translation key (autocomplete supported)
   * @param args - Optional interpolation values
   */
  const t = (key: AllTranslationKeys, args?: Record<string, string | number>) =>
    translate(key, args) as string;

  /**
   * Change language
   * @param lng - Language code to switch to
   */
  const changeLanguage = (lng: AppLanguages) => i18n.changeLanguage(lng);

  return {
    t,
    currentLng,
    languages: languages || [],
    changeLanguage,
    i18n, // Expose for advanced use cases
  };
};
