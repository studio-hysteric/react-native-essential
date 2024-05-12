import React, { PropsWithChildren, useState } from 'react';
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import R from '@/assets';
import useDidMountEffect from '@/shared/hooks/useDidMountEffect';
import { useTheme } from '@/shared/contexts/themeContext';
import { spacing } from '@/shared/theme';
import { Text } from '../text';
import { Box } from '../box';
import { Touchable } from '../button';
import { IconSvg } from '../icon-svg/IconSvg';
import { AccordionProps } from './Accordion.type';

const Accordion = ({
  children,
  title,
  defaultIsOpen = false,
  duration = 400,
  customTrigger,
  onExpanded,
  onCollapsed,
}: PropsWithChildren<AccordionProps>) => {
  const { themeColors } = useTheme();

  const [isExpanded, setIsExpanded] = useState(defaultIsOpen);
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded), {
      duration,
    }),
  );

  const derivedRotate = useDerivedValue(() =>
    withTiming(isExpanded ? '90deg' : '0deg', { duration: 300 }),
  );

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: derivedRotate.value }],
  }));

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  useDidMountEffect(() => {
    if (isExpanded) {
      onExpanded && onExpanded();
    } else {
      onCollapsed && onCollapsed();
    }
  }, [isExpanded]);

  return (
    <Box>
      <Touchable disableFeedback onPress={toggleExpanded}>
        {customTrigger ? (
          customTrigger(isExpanded)
        ) : (
          <Box.Row
            p={spacing.scale(15)}
            justifyContent="space-between"
            alignItems="center"
            borderColor={themeColors.border}
            borderBottomWidth={1}
          >
            <Text
              size={16}
              color={themeColors.text.primary}
              transform="capitalize"
            >
              {title}
            </Text>
            <Box.Animated style={iconStyle}>
              <IconSvg
                size={22}
                color={themeColors.text.primary}
                source={R.icons.ic_chevron_right}
              />
            </Box.Animated>
          </Box.Row>
        )}
      </Touchable>
      <Box.Animated overflow={'hidden'} height={derivedHeight}>
        <Box
          absolute
          wFull
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
        >
          {children}
        </Box>
      </Box.Animated>
    </Box>
  );
};

export default Accordion;
