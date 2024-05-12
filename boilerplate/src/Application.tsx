import React from 'react';
import { useImmer } from 'use-immer';
import { useI18n } from './shared/hooks/useI18n';
import {
  AppContext,
  AppContextProps,
} from './shared/contexts/applicationContext';
import AppNavigator from './navigators/AppNavigator';

const Application = () => {
  const { currentLng } = useI18n();
  const [isGlobalLoading, updateGlobalLoading] = useImmer(false);

  const contextValue: AppContextProps = {
    locale: currentLng || 'vi',
    isGlobalLoading,
    updateGlobalLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <AppNavigator />
    </AppContext.Provider>
  );
};

export default Application;
