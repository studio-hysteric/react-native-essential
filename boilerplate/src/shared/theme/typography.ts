/**
 * Typography System
 * Centralized font configuration with type safety and flexibility
 */

// Font families configuration (easily extendable)
export const fonts = {
  inter: {
    thin: 'Inter-Thin',
    extraLight: 'Inter-ExtraLight',
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
    black: 'Inter-Black',
  },
  // Easy to add more font families
  // roboto: { ... },
  // openSans: { ... },
} as const;

// Default font family
export const defaultFontFamily = 'inter' as const;

// Type-safe font weight names
export type FontWeight = keyof typeof fonts.inter;
export type FontFamily = keyof typeof fonts;

// Helper to get font by weight (with default fallback)
export const getFontByWeight = (
  weight: FontWeight = 'regular',
  family: FontFamily = defaultFontFamily,
): string => {
  return fonts[family][weight];
};

// Typography variants (optional, for design system consistency)
// These are pre-defined text styles following Material Design 3 guidelines
export const typographyVariants = {
  // Display styles (largest)
  displayLarge: {
    fontSize: 57,
    fontFamily: fonts.inter.regular,
    lineHeight: 64,
  },
  displayMedium: {
    fontSize: 45,
    fontFamily: fonts.inter.regular,
    lineHeight: 52,
  },
  displaySmall: {
    fontSize: 36,
    fontFamily: fonts.inter.regular,
    lineHeight: 44,
  },

  // Headline styles
  headlineLarge: {
    fontSize: 32,
    fontFamily: fonts.inter.regular,
    lineHeight: 40,
  },
  headlineMedium: {
    fontSize: 28,
    fontFamily: fonts.inter.regular,
    lineHeight: 36,
  },
  headlineSmall: {
    fontSize: 24,
    fontFamily: fonts.inter.regular,
    lineHeight: 32,
  },

  // Title styles
  titleLarge: {
    fontSize: 22,
    fontFamily: fonts.inter.medium,
    lineHeight: 28,
  },
  titleMedium: {
    fontSize: 16,
    fontFamily: fonts.inter.medium,
    lineHeight: 24,
  },
  titleSmall: {
    fontSize: 14,
    fontFamily: fonts.inter.medium,
    lineHeight: 20,
  },

  // Body styles
  bodyLarge: {
    fontSize: 16,
    fontFamily: fonts.inter.regular,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontFamily: fonts.inter.regular,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontFamily: fonts.inter.regular,
    lineHeight: 16,
  },

  // Label styles
  labelLarge: {
    fontSize: 14,
    fontFamily: fonts.inter.medium,
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontFamily: fonts.inter.medium,
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 11,
    fontFamily: fonts.inter.medium,
    lineHeight: 16,
  },
} as const;

export type TypographyVariant = keyof typeof typographyVariants;
