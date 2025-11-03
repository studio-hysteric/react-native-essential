import { TextStyle, type TextProps as RNTextProps } from 'react-native';
import { AllTranslationKeys } from '@/shared/i18n';
import { SpacingProps } from '../shared/types';
import { FontWeight, TypographyVariant } from '@/shared/theme/typography';

/**
 * Text component props
 * Only extends spacing props, not full BoxProps to avoid conflicts
 */
export interface TextProps extends RNTextProps, SpacingProps {
  // Custom text props
  size?: number;
  color?: string;
  t?: AllTranslationKeys;
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';

  // Typography system - multiple ways to specify fonts

  // 1. Variant approach (design system)
  variant?: TypographyVariant;

  // 2. Weight approach (type-safe)
  weight?: FontWeight;

  // 3. Shorthand boolean props (most convenient)
  thin?: boolean;
  extraLight?: boolean;
  light?: boolean;
  regular?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  bold?: boolean;
  extraBold?: boolean;
  black?: boolean;

  // 4. Direct font string (most flexible, for custom fonts or looping)
  font?: string;

  // Common text style props (explicit instead of extending all TextStyle)
  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];
  lineHeight?: TextStyle['lineHeight'];
  letterSpacing?: TextStyle['letterSpacing'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textTransform?: TextStyle['textTransform'];
  opacity?: TextStyle['opacity'];

  // Allow any other text style props via style prop
  style?: TextStyle;
}
