import React from 'react';
import { Box } from '../box';
import { useTheme } from '@/shared/contexts/themeContext';
import { Button } from '../button';
import Card from './Card';
import { transformString } from '@/shared/utils/common';
import { useI18n } from '@/shared/hooks/useI18n';

const SwitchTheme = () => {
  const { t } = useI18n();
  const { themes, currentTheme, changeTheme } = useTheme();

  return (
    <Box p={15}>
      <Card>
        <Card.Item title={t('common.theme')} content={currentTheme} />
      </Card>
      <Box.Row mt={20} gap={15}>
        {themes.map((theme) => (
          <Button key={theme} onPress={() => changeTheme(theme)} flex>
            {transformString(theme, 'capitalize')}
          </Button>
        ))}
      </Box.Row>
    </Box>
  );
};

export default SwitchTheme;
