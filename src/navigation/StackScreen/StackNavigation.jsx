import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreenNav from './AllScreen/SettingScreenNav';
import ProductScreenNav from './AllScreen/ProductScreenNav';
import CouponScreenNav from './AllScreen/CouponScreenNav';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>        
        {/* Settings Screen (stacked above the tabs) */}
        <Stack.Screen name="SettingsScreen" component={SettingScreenNav} />
        <Stack.Screen name="Product" component={ProductScreenNav} />
        <Stack.Screen name="CouponNav" component={CouponScreenNav} />

      </Stack.Navigator>
  );
};

export default StackNavigation;
