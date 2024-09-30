import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreenNav from './AllScreen/SettingScreenNav';
import ProductScreenNav from './AllScreen/ProductScreenNav';
import CouponScreenNav from './AllScreen/CouponScreenNav';
import CustomerScreenNav from './AllScreen/CustomerScreenNav';
import RefundsScreenNav from './AllScreen/RefundsScreenNav';
import AddToMyStoreScreen from './AllScreen/AddToMyStoreScreenNav';
import AddToMyStoreScreenNav from './AllScreen/AddToMyStoreScreenNav';

import PaymentsScreenNav from './AllScreen/PaymentsScreenNav';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>        
        {/* Settings Screen (stacked above the tabs) */}
        <Stack.Screen name="SettingsScreen" component={SettingScreenNav} />
        <Stack.Screen name="Product" component={ProductScreenNav} />
        <Stack.Screen name="CouponNav" component={CouponScreenNav} />
        <Stack.Screen name="CustomerNav" component={CustomerScreenNav} />
        <Stack.Screen name="RefundNav" component={RefundsScreenNav} />
        <Stack.Screen name="AddToStoreNav" component={AddToMyStoreScreenNav} />
        <Stack.Screen name="PaymentsScreenNav" component={PaymentsScreenNav} />
      </Stack.Navigator>

  );
};

export default StackNavigation;
