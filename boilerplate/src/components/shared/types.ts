import { ViewStyle } from 'react-native';

/**
 * Spacing props - margin and padding shorthands
 * These are commonly needed across all components
 */
export interface SpacingProps {
  m?: ViewStyle['margin'];
  ml?: ViewStyle['marginLeft'];
  mr?: ViewStyle['marginRight'];
  mb?: ViewStyle['marginBottom'];
  mt?: ViewStyle['marginTop'];
  mx?: ViewStyle['marginHorizontal'];
  my?: ViewStyle['marginVertical'];
  p?: ViewStyle['padding'];
  pl?: ViewStyle['paddingLeft'];
  pr?: ViewStyle['paddingRight'];
  pb?: ViewStyle['paddingBottom'];
  pt?: ViewStyle['paddingTop'];
  px?: ViewStyle['paddingHorizontal'];
  py?: ViewStyle['paddingVertical'];
}

/**
 * Layout utility props
 * For components that need basic layout control
 */
export interface LayoutUtilProps {
  w?: ViewStyle['width'];
  wFit?: boolean;
  wFull?: boolean;
  h?: ViewStyle['height'];
  hFull?: boolean;
  minW?: ViewStyle['minWidth'];
  minH?: ViewStyle['minHeight'];
  maxW?: ViewStyle['maxWidth'];
  maxH?: ViewStyle['maxHeight'];
}

/**
 * Flex utility props
 * For components that need flex layout
 */
export interface FlexUtilProps {
  flex?: boolean | number;
  row?: boolean;
  rowReverse?: boolean;
  colReverse?: boolean;
  center?: boolean;
}

/**
 * Position utility props
 */
export interface PositionUtilProps {
  absolute?: boolean;
  relative?: boolean;
}
