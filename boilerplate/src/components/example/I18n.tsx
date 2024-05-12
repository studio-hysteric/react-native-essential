import React from 'react';
import { Box } from '../box';
import { dayjs } from '@/libs/date';
import { Button } from '../button';
import { useI18n } from '@/shared/hooks/useI18n';
import Card from './Card';
import { transformString } from '@/shared/utils/common';

const I18n = () => {
  const { t, currentLng, languages, changeLanguage } = useI18n();

  return (
    <Box p={15}>
      <Card>
        <Card.Item
          title={t('example_screen.common.language')}
          content={currentLng}
        />
        <Card.Item
          title={t('example_screen.common.today')}
          content={transformString(
            dayjs().format('DD MMMM YYYY'),
            'capitalize',
          )}
        />
      </Card>
      <Box.Row mt={20} gap={15}>
        {languages.map((lng) => (
          <Button key={lng} flex onPress={() => changeLanguage(lng)}>
            {transformString(lng, 'capitalize')}
          </Button>
        ))}
      </Box.Row>
    </Box>
  );
};

export default I18n;
