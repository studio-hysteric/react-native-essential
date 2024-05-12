import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_NAME } from '@/config';

import HomeScreen from '@/screens/home/HomeScreen';
import StartupScreen from '@/screens/startup/StartupScreen';

/**
 * You will have more stack so this is simple implementation
 */

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_NAME.Startup} component={StartupScreen} />
      <Stack.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export { MainStack };
