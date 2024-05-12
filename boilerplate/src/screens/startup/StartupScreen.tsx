import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSvg } from '@/components/icon-svg/IconSvg';
import { navigationHelper } from '@/shared/utils/navigationHelper';
import { SCREEN_NAME } from '@/config';
import R from '@/assets';
import { useTheme } from '@/shared/contexts/themeContext';
import { Box } from '@/components/box';
import { screenWidth } from '@/shared/theme/dimensions';
import { radius } from '@/shared/theme/radius';
import { Text } from '@/components/text';
import { Touchable } from '@/components/button';

const StartupScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { themeColors } = useTheme();

  return (
    <Box flex center bg={themeColors.background.primary}>
      <IconSvg
        size={screenWidth / 4}
        color={themeColors.text.primary}
        source={R.icons.ic_logo}
      />
      <Box center mt={25} gap={5}>
        <Text
          size={28}
          font={Text.fonts.inter.extraBold}
          color={themeColors.text.primary}
        >
          React Native Essential
        </Text>
        <Text color={themeColors.text.dim} t="title.description" />
      </Box>
      <Touchable
        absolute
        bottom={bottom}
        onPress={() => navigationHelper.navigate(SCREEN_NAME.Home)}
      >
        <Box
          p={10}
          backgroundColor={themeColors.theme.opposite}
          borderRadius={radius.full}
        >
          <IconSvg
            color={themeColors.theme.primary}
            source={R.icons.ic_arrow_right}
          />
        </Box>
      </Touchable>
    </Box>
  );
};

export default StartupScreen;
