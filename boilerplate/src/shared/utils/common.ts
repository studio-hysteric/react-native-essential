import { Linking } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { screenHeight, screenWidth } from '../theme/dimensions';

export function isLandscape() {
  return screenWidth < screenHeight;
}

export function rgba(hexColor: string, alpha: number = 1): string {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(hexColor)) {
    throw new Error('Invalid hex color format');
  }

  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function transformString(
  input: string,
  transformType: 'uppercase' | 'lowercase' | 'capitalize',
): string {
  switch (transformType) {
    case 'uppercase':
      return input.toUpperCase();
    case 'lowercase':
      return input.toLowerCase();
    /*
     * Convert from:
     * https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Text/RCTTextAttributes.mm
     */
    case 'capitalize':
      const words = input.split(' ');
      const newWords = [];
      const num = new RegExp(/^\d+$/);
      for (const item of words) {
        let word;
        if (item.length > 0 && !num.test(item.charAt(0))) {
          word = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        } else {
          word = item.toLowerCase();
        }
        newWords.push(word);
      }
      return newWords.join(' ');
    default:
      return input;
  }
}

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function initNetInfoConfiguration() {
  NetInfo.configure({
    reachabilityUrl: 'https://clients3.google.com/generate_204', // Change to your fastest api endpoint
    reachabilityLongTimeout: 2000, // 2s
    reachabilityShortTimeout: 1000, // 1s
    reachabilityRequestTimeout: 1500, // 1.5s
    useNativeReachability: false,
  });
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export function mergeRefs<T extends any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
