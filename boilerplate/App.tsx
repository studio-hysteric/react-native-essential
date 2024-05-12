import React from 'react';
import Application from '@/Application';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initNetInfoConfiguration } from '@/shared/utils/common';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import ThemeProvider from '@/components/ThemeProvider';
import NetworkProvider from '@/components/NetworkProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

enableScreens(true);
initNetInfoConfiguration();

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <KeyboardProvider>
          <NetworkProvider>
            <ThemeProvider>
              <ErrorBoundary>
                <Application />
              </ErrorBoundary>
            </ThemeProvider>
          </NetworkProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
