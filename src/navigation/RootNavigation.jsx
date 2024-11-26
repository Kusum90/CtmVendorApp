import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './TabScreen/TabNavigation';
import StackNavigation from './StackScreen/StackNavigation';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../components/AccountComponent/ProfileScreen';
import RegisterDetails from '../screens/RegisterDetails';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
        {/* DrawerNavigation which includes the TabNavigation */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Stack" component={StackNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
