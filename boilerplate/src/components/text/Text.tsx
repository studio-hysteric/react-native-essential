import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '@/shared/contexts/themeContext';
import { useI18n } from '@/shared/hooks/useI18n';
import { TextProps } from './Text.type';
import { propsToStyleResolver } from '../box';
import { mScale } from '@/shared/utils/size';
import {
  fonts,
  getFontByWeight,
  typographyVariants,
  type FontWeight,
} from '@/shared/theme/typography';

const Text = (props: TextProps) => {
  const { themeColors } = useTheme();
  const { t: translate } = useI18n();

  const {
    t,
    size,
    color = themeColors.text.primary,
    transform,
    children,
    variant,
    weight,
    // Font weight shortcuts
    thin,
    extraLight,
    light,
    regular,
    medium,
    semiBold,
    bold,
    extraBold,
    black,
    // Direct font prop (most flexible)
    font,
    // Extract common text style props
    textAlign,
    fontWeight,
    lineHeight,
    letterSpacing,
    textDecorationLine,
    textTransform,
    opacity,
    ...rest
  } = props;

  // Resolve spacing props (m, p, etc.) to styles
  const { restProps, style: spacingStyle } = propsToStyleResolver(rest, 'text');

  // Determine font weight from shortcuts (priority order)
  const resolvedWeight: FontWeight | undefined = thin
    ? 'thin'
    : extraLight
      ? 'extraLight'
      : light
        ? 'light'
        : regular
          ? 'regular'
          : medium
            ? 'medium'
            : semiBold
              ? 'semiBold'
              : bold
                ? 'bold'
                : extraBold
                  ? 'extraBold'
                  : black
                    ? 'black'
                    : weight;

  // Get styles from variant if provided
  const variantStyles = variant ? typographyVariants[variant] : undefined;

  // Resolve font family (priority: direct font > weight > variant > default)
  const resolvedFontFamily = font
    ? font // Direct font string has highest priority (most flexible)
    : resolvedWeight
      ? getFontByWeight(resolvedWeight)
      : variantStyles?.fontFamily || fonts.inter.regular;

  // Build text-specific styles
  const textStyle: TextStyle = {
    // Variant styles first (can be overridden)
    ...variantStyles,
    // Then explicit props
    fontSize: size !== undefined ? mScale(size) : variantStyles?.fontSize,
    fontFamily: resolvedFontFamily,
    color,
    textTransform: transform || textTransform,
    textAlign,
    fontWeight,
    lineHeight,
    letterSpacing,
    textDecorationLine,
    opacity,
  };

  const translation = children ? children : t ? translate(t) : '';

  return (
    <RNText
      {...restProps}
      style={[textStyle, spacingStyle, restProps.style]}
    >
      {translation}
    </RNText>
  );
};

// Export with typography utilities for external use
// This maintains backward compatibility with existing code
export default Object.assign(Text, {
  fonts, // Can be used as Text.fonts.inter.bold
  variants: typographyVariants, // Can be used as Text.variants.bodyLarge
});
