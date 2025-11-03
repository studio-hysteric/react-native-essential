import { TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { CustomStyleProps } from './Box.type';
import {
  customTransformers,
  simpleStyleMap,
} from './Box.config';

/**
 * Cache for style keys to avoid repeated Object.keys() calls
 */
let viewStyleKeysCache: string[] | null = null;
let textStyleKeysCache: string[] | null = null;

const getViewStyleKeys = (): string[] => {
  if (!viewStyleKeysCache) {
    // Get all keys from an empty ViewStyle object's type
    // This is more maintainable than manually listing all keys
    const dummyView: ViewStyle = {} as ViewStyle;
    viewStyleKeysCache = Object.keys(dummyView);

    // If empty, fallback to common keys
    if (viewStyleKeysCache.length === 0) {
      viewStyleKeysCache = [
        'alignContent', 'alignItems', 'alignSelf', 'aspectRatio',
        'backgroundColor', 'borderRadius', 'borderWidth', 'borderColor',
        'bottom', 'display', 'flex', 'flexBasis', 'flexDirection',
        'flexGrow', 'flexShrink', 'flexWrap', 'gap', 'height', 'width',
        'justifyContent', 'left', 'right', 'top', 'margin', 'marginBottom',
        'marginEnd', 'marginHorizontal', 'marginLeft', 'marginRight',
        'marginStart', 'marginTop', 'marginVertical', 'maxHeight',
        'maxWidth', 'minHeight', 'minWidth', 'opacity', 'overflow',
        'padding', 'paddingBottom', 'paddingEnd', 'paddingHorizontal',
        'paddingLeft', 'paddingRight', 'paddingStart', 'paddingTop',
        'paddingVertical', 'position', 'zIndex', 'shadowColor',
        'shadowOffset', 'shadowOpacity', 'shadowRadius', 'transform',
        'elevation',
      ];
    }
  }
  return viewStyleKeysCache;
};

const getTextStyleKeys = (): string[] => {
  if (!textStyleKeysCache) {
    textStyleKeysCache = [
      ...getViewStyleKeys(),
      'color', 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant',
      'fontWeight', 'includeFontPadding', 'letterSpacing', 'lineHeight',
      'textAlign', 'textAlignVertical', 'textDecorationColor',
      'textDecorationLine', 'textDecorationStyle', 'textShadowColor',
      'textShadowOffset', 'textShadowRadius', 'textTransform',
      'userSelect', 'verticalAlign', 'writingDirection',
    ];
  }
  return textStyleKeysCache;
};

/**
 * Check if a key is a style property for the target type
 */
const isStyleKey = (key: string, target: 'view' | 'text'): boolean => {
  const styleKeys = target === 'view' ? getViewStyleKeys() : getTextStyleKeys();
  return styleKeys.includes(key);
};

type PropsToStyleResolver<T extends 'view' | 'text'> = (
  props: CustomStyleProps,
  target: T,
) => {
  style: T extends 'view' ? ViewStyle : TextStyle;
  restProps: T extends 'view' ? ViewProps : TextProps;
};

/**
 * Optimized props to style resolver using config-driven approach
 */
export const propsToStyleResolver = <T extends 'view' | 'text' = 'view'>(
  props: Parameters<PropsToStyleResolver<T>>[0],
  target: T = 'view' as T,
): ReturnType<PropsToStyleResolver<T>> => {
  const style: ViewStyle | TextStyle = {};
  const restProps: ViewProps | TextProps = {};

  for (const [key, value] of Object.entries(props)) {
    // Skip undefined values
    if (value === undefined) continue;

    // Check if it's a custom transformer (special handling needed)
    if (key in customTransformers) {
      const transformed = customTransformers[key](value);
      Object.assign(style, transformed);
      continue;
    }

    // Check if it's a simple shorthand mapping
    if (key in simpleStyleMap) {
      const styleKey = simpleStyleMap[key as keyof typeof simpleStyleMap];
      // @ts-ignore - dynamic key assignment
      style[styleKey] = value;
      continue;
    }

    // Check if it's a native style property
    if (isStyleKey(key, target)) {
      // @ts-ignore - dynamic key assignment
      style[key] = value;
      continue;
    }

    // Otherwise, it's a rest prop (event handler, ref, etc.)
    // @ts-ignore - dynamic key assignment
    restProps[key] = value;
  }

  return { style, restProps } as ReturnType<PropsToStyleResolver<T>>;
};
