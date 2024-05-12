import React, { PropsWithChildren, useEffect } from 'react';
import RNErrorBoundary from 'react-native-error-boundary';
import { Box } from './box';
import { Text } from './text';
import { useTheme } from '@/shared/contexts/themeContext';
import { Button } from './button';
import { spacing } from '@/shared/theme';

const ErrorFallbackComponent = (props: {
  error: Error;
  resetError: TFunction;
}) => {
  const { error, resetError } = props;
  const { themeColors } = useTheme();

  useEffect(() => {
    // Logging error here
    console.log(error);
  }, [error]);

  return (
    <Box
      flex
      center
      alignItems="flex-start"
      px={spacing.scale(15)}
      bg={themeColors.background.primary}
    >
      <Text size={20} font={Text.fonts.inter.bold} t="error_boundary.title" />
      <Text mt={5} color={themeColors.text.secondary} t="error_boundary.sub" />
      <Button mt={15} alignSelf="flex-start" onPress={() => resetError()}>
        <Text t="error_boundary.action" />
      </Button>
    </Box>
  );
};

const ErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <RNErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <React.Fragment>{children}</React.Fragment>
    </RNErrorBoundary>
  );
};

export default ErrorBoundary;
