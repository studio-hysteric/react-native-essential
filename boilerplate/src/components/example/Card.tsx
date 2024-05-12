import React, { PropsWithChildren } from 'react';
import { Box } from '../box';
import { Text } from '../text';
import { useTheme } from '@/shared/contexts/themeContext';

const CardItem = ({ title, content }: { title: string; content: string }) => {
  const textProps = {
    size: 15,
  };

  return (
    <Box.Row justifyContent="space-between" p={15}>
      <Text transform="capitalize" {...textProps}>
        {title}
      </Text>
      <Text {...textProps}>{content}</Text>
    </Box.Row>
  );
};

const Card = ({ children }: PropsWithChildren) => {
  const childrens = Array.isArray(children) ? children : [children];

  const { themeColors } = useTheme();

  return (
    <Box borderWidth={1} rounded={6} borderColor={themeColors.separator}>
      {childrens.map((child, index) => (
        <Box key={index}>
          {index !== 0 && <Box.Separator />}
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default Object.assign(Card, { Item: CardItem });
