import { ViewStyle } from 'react-native';

// Spacing shorthand mapping
export const spacingMap = {
  // Margin
  m: 'margin',
  ml: 'marginLeft',
  mr: 'marginRight',
  mb: 'marginBottom',
  mt: 'marginTop',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  // Padding
  p: 'padding',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pt: 'paddingTop',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
} as const;

// Border shorthand mapping
export const borderMap = {
  border: 'borderWidth',
  rounded: 'borderRadius',
} as const;

// Size shorthand mapping
export const sizeMap = {
  w: 'width',
  h: 'height',
  minW: 'minWidth',
  minH: 'minHeight',
  maxW: 'maxWidth',
  maxH: 'maxHeight',
} as const;

// Layout shorthand mapping
export const layoutMap = {
  bg: 'backgroundColor',
} as const;

// Custom transform handlers for special props
export type StyleTransformer = (value: any) => Partial<ViewStyle>;

export const customTransformers: Record<string, StyleTransformer> = {
  borderX: (value: boolean | number) => ({
    borderLeftWidth: Number(value),
    borderRightWidth: Number(value),
  }),
  borderY: (value: boolean | number) => ({
    borderTopWidth: Number(value),
    borderBottomWidth: Number(value),
  }),
  rounded: (value: number | 'full') => ({
    borderRadius: value === 'full' ? 9999 : value,
  }),
  wFit: (value: boolean) => ({
    alignSelf: value ? 'center' : undefined,
  }),
  wFull: (value: boolean) => ({
    width: value ? '100%' : undefined,
  }),
  hFull: (value: boolean) => ({
    height: value ? '100%' : undefined,
  }),
  size: (value: number) => ({
    width: value,
    height: value,
  }),
  flex: (value: boolean | number) => ({
    flex: typeof value === 'boolean' ? (value ? 1 : undefined) : value,
  }),
  row: (value: boolean) => ({
    flexDirection: value ? 'row' : undefined,
  }),
  rowReverse: (value: boolean) => ({
    flexDirection: value ? 'row-reverse' : undefined,
  }),
  colReverse: (value: boolean) => ({
    flexDirection: value ? 'column-reverse' : undefined,
  }),
  center: (value: boolean) =>
    value
      ? {
          alignItems: 'center',
          justifyContent: 'center',
        }
      : {},
  absolute: (value: boolean) => ({
    position: value ? 'absolute' : undefined,
  }),
  relative: (value: boolean) => ({
    position: value ? 'relative' : undefined,
  }),
  ratio: (value: number | 'square') => ({
    aspectRatio: value === 'square' ? 1 : value,
  }),
};

// All simple mappings combined
export const simpleStyleMap = {
  ...spacingMap,
  ...borderMap,
  ...sizeMap,
  ...layoutMap,
} as const;

// Custom props that need special handling (keys of customTransformers)
export const customPropKeys = Object.keys(customTransformers);

// All shorthand prop keys
export const allShorthandKeys = [
  ...Object.keys(simpleStyleMap),
  ...customPropKeys,
];
