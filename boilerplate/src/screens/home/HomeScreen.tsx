import React from 'react';
import { ScreenShell } from '@/components/screen-shell';
import {
  DataFetching,
  FormHandle,
  I18n,
  SwitchTheme,
} from '@/components/example';
import { Accordion } from '@/components/accordion';
import { Header } from '@/components/header';
import CrashSimulate from '@/components/example/CrashSimulate';
import { useI18n } from '@/shared/hooks/useI18n';
import Components from '@/components/example/Components';

const HomeScreen = () => {
  const { t } = useI18n();

  const renderHeader = (() => {
    return <Header name={t('screen.example')} />;
  })();

  return (
    <ScreenShell header={renderHeader}>
      <Accordion title={t('example_screen.accordion_title.components')}>
        <Components />
      </Accordion>
      <Accordion title={t('example_screen.accordion_title.data_fetching')}>
        <DataFetching />
      </Accordion>
      <Accordion title={t('example_screen.accordion_title.form_handle')}>
        <FormHandle />
      </Accordion>
      <Accordion title={t('example_screen.accordion_title.i18n')}>
        <I18n />
      </Accordion>
      <Accordion title={t('example_screen.accordion_title.switch_theme')}>
        <SwitchTheme />
      </Accordion>
      <Accordion title={t('example_screen.accordion_title.crash_simulate')}>
        <CrashSimulate />
      </Accordion>
    </ScreenShell>
  );
};

export default HomeScreen;
