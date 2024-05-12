import { TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { CustomStyleProps } from './Box.type';

const viewStyleKeys: Array<keyof ViewStyle> = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'borderBottomWidth',
  'borderEndWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'columnGap',
  'direction',
  'display',
  'end',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'gap',
  'height',
  'justifyContent',
  'left',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'position',
  'right',
  'rowGap',
  'start',
  'top',
  'width',
  'zIndex',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'transform',
  'backfaceVisibility',
  'backgroundColor',
  'borderBottomColor',
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderColor',
  'borderCurve',
  'borderEndColor',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderLeftColor',
  'borderRadius',
  'borderRightColor',
  'borderStartColor',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStyle',
  'borderTopColor',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'elevation',
  'opacity',
  'pointerEvents',
];

const textStyleKeys: Array<keyof TextStyle> = [
  ...viewStyleKeys,
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'includeFontPadding',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlignVertical',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'userSelect',
  'verticalAlign',
  'writingDirection',
];

type PropsToStyleResolver<T extends 'view' | 'text'> = (
  props: CustomStyleProps,
  target: T,
) => {
  style: T extends 'view' ? ViewStyle : TextStyle;
  restProps: T extends 'view' ? ViewProps : TextProps;
};

export const propsToStyleResolver = <T extends 'view' | 'text' = 'view'>(
  props: Parameters<PropsToStyleResolver<T>>[0],
  target: T = 'view' as T,
): ReturnType<PropsToStyleResolver<T>> => {
  let style: ViewStyle | TextStyle = {};
  let restProps: ViewProps | TextProps = {};

  Object.entries(props).forEach(([key, value]) => {
    switch (key) {
      case 'm':
        style.margin = value;
        break;
      case 'ml':
        style.marginLeft = value;
        break;
      case 'mr':
        style.marginRight = value;
        break;
      case 'mb':
        style.marginBottom = value;
        break;
      case 'mt':
        style.marginTop = value;
        break;
      case 'mx':
        style.marginHorizontal = value;
        break;
      case 'my':
        style.marginVertical = value;
        break;
      case 'p':
        style.padding = value;
        break;
      case 'pl':
        style.paddingLeft = value;
        break;
      case 'pr':
        style.paddingRight = value;
        break;
      case 'pb':
        style.paddingBottom = value;
        break;
      case 'pt':
        style.paddingTop = value;
        break;
      case 'px':
        style.paddingHorizontal = value;
        break;
      case 'py':
        style.paddingVertical = value;
        break;
      case 'border':
        style.borderWidth = Number(value);
        break;
      case 'borderX':
        style.borderLeftWidth = Number(value);
        style.borderRightWidth = Number(value);
        break;
      case 'borderY':
        style.borderTopWidth = Number(value);
        style.borderBottomWidth = Number(value);
        break;
      case 'rounded':
        if (value === 'full') {
          style.borderRadius = 9999;
        } else {
          style.borderRadius = value;
        }
        break;
      case 'w':
        style.width = value;
        break;
      case 'wFit':
        style.alignSelf = value ? 'center' : undefined;
        break;
      case 'wFull':
        style.width = value ? '100%' : undefined;
        break;
      case 'h':
        style.height = value;
        break;
      case 'hFull':
        style.height = value ? '100%' : undefined;
        break;
      case 'minW':
        style.minWidth = value;
        break;
      case 'minH':
        style.minHeight = value;
        break;
      case 'maxW':
        style.maxWidth = value;
        break;
      case 'maxH':
        style.maxHeight = value;
        break;
      case 'size':
        style.width = value;
        style.height = value;
        break;
      case 'flex':
        if (typeof value === 'boolean') {
          style.flex = value ? 1 : undefined;
        } else {
          style.flex = value;
        }
        break;
      case 'row':
        style.flexDirection = value ? 'row' : undefined;
        break;
      case 'rowReverse':
        style.flexDirection = value ? 'row-reverse' : undefined;
        break;
      case 'colReverse':
        style.flexDirection = value ? 'column-reverse' : undefined;
        break;
      case 'center':
        if (value) {
          style.alignItems = 'center';
          style.justifyContent = 'center';
        }
        break;
      case 'absolute':
        style.position = value ? 'absolute' : undefined;
        break;
      case 'relative':
        style.position = value ? 'relative' : undefined;
        break;
      case 'bg':
        style.backgroundColor = value;
        break;
      case 'ratio':
        style.aspectRatio = value === 'square' ? 1 : value;
        break;
      default:
        const targetStyleKeys =
          target === 'view' ? viewStyleKeys : textStyleKeys;

        if (
          !targetStyleKeys.includes(key as keyof ViewStyle | keyof TextStyle)
        ) {
          restProps = { ...restProps, [key]: value };
          return;
        }
        style = { ...style, [key]: value };
        break;
    }
  });

  return { style, restProps };
};
