import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './TabScreen/TabNavigation';
import StackNavigation from './StackScreen/StackNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* DrawerNavigation which includes the TabNavigation */}
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="Stack" component={StackNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
