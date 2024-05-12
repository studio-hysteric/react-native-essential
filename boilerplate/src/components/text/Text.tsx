import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '@/shared/contexts/themeContext';
import { useI18n } from '@/shared/hooks/useI18n';
import { TextProps } from './Text.type';
import { propsToStyleResolver } from '../box';
import { mScale } from '@/shared/utils/size';

const fonts = {
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
};

const Text = (props: TextProps) => {
  const { themeColors } = useTheme();
  const { t: translate } = useI18n();

  const {
    t,
    size = 14,
    color = themeColors.text.primary,
    font = fonts.inter.regular,
    transform,
    children,
    ...rest
  } = props;

  const { restProps, style: textStyle } = propsToStyleResolver(rest, 'text');

  const style: TextStyle = {
    fontSize: mScale(size),
    fontFamily: font,
    color,
    textTransform: transform,
  };

  const translation = children ? children : t ? translate(t) : '';

  return (
    <RNText {...restProps} style={[style, textStyle, restProps.style]}>
      {translation}
    </RNText>
  );
};

export default Object.assign(Text, { fonts });
