import React, { useState } from 'react';
import { Box } from '../box';
import { Button } from '../button';
import { useI18n } from '@/shared/hooks/useI18n';

const ComponentWithError = () => {
  React.useEffect(() => {
    throw new Error('This is a test error thrown');
  }, []);

  return null;
};

const CrashSimulate = () => {
  const [isErrorComponentVisible, setIsErrorComponentVisible] = useState(false);
  const { t } = useI18n();

  return (
    <Box p={15}>
      {isErrorComponentVisible && <ComponentWithError />}
      <Button
        wFull
        variant={Button.Variants.DANGER}
        onPress={() => setIsErrorComponentVisible(true)}
      >
        {/* Throw error */}
        {t('actions.throw_error')}
      </Button>
    </Box>
  );
};

export default CrashSimulate;
