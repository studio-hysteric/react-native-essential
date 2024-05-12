import React, { useState } from 'react';
import { Box } from '../box';
import { Text } from '../text';
import { useTheme } from '@/shared/contexts/themeContext';
import { spacing } from '@/shared/theme';
import { Button, Touchable } from '../button';
import { Input } from '../input';
import R from '@/assets';
import { IconSvg } from '../icon-svg';

const Components = () => {
  const { themeColors } = useTheme();

  const [isSecurePasswordInput, setIsSecurePasswordInput] = useState(true);

  const handleToggleSecurePasswordInput = () => {
    setIsSecurePasswordInput((prev) => !prev);
  };

  const renderEndIconPasswordInput = (color: string) => {
    return (
      <IconSvg
        onPress={handleToggleSecurePasswordInput}
        color={color}
        source={
          isSecurePasswordInput ? R.icons.ic_eye_close : R.icons.ic_eye_open
        }
      />
    );
  };

  return (
    <Box p={15} gap={spacing.vScale(25)}>
      <Box center bg={themeColors.theme.secondary} py={50}>
        <Text>Box</Text>
      </Box>
      <Box.Row
        center
        bg={themeColors.theme.secondary}
        py={50}
        justifyContent="space-evenly"
      >
        <Text>Horizontal</Text>
        <Text>Layout</Text>
      </Box.Row>
      <Box.Row flexWrap="wrap" gap={spacing.scale(8)}>
        {Object.values(Text.fonts.inter).map((font, index) => (
          <Text key={index} size={14} font={font}>
            Sample
          </Text>
        ))}
      </Box.Row>
      <Touchable>
        <Text size={15}>Touchable</Text>
      </Touchable>
      <Box gap={15}>
        <Box.Row justifyContent="space-between">
          <Button size={Button.Sizes.XS}>XS</Button>
          <Button size={Button.Sizes.SM}>SM</Button>
          <Button size={Button.Sizes.MD}>MD</Button>
          <Button size={Button.Sizes.LG}>LG</Button>
        </Box.Row>
        <Box.Row justifyContent="space-between">
          <Button
            variant={Button.Variants.GHOST}
            $textProps={{ color: themeColors.theme.opposite }}
          >
            Ghost
          </Button>
          <Button>Flat</Button>
          <Button
            variant={Button.Variants.OUTLINE}
            $textProps={{ color: themeColors.theme.opposite }}
          >
            Outline
          </Button>
          <Button variant={Button.Variants.DANGER}>Danger</Button>
        </Box.Row>
      </Box>
      <Box gap={10}>
        <Input placeholder="Input" />
        <Input label="Email" placeholder="example@gmail.com" />
        <Input
          layout="vertical"
          label="Email"
          placeholder="example@gmail.com"
        />
        <Input
          layout="vertical"
          label="Password"
          value="123456"
          secureTextEntry={isSecurePasswordInput}
          endIcon={renderEndIconPasswordInput}
          placeholder="Type your password"
        />
        <Input
          label="Email"
          value="johndoe@"
          placeholder="example@gmail.com"
          error={'Invalid email format'}
        />
      </Box>
    </Box>
  );
};

export default Components;
