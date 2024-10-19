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
import LedgerBookScreenNav from './AllScreen/LedgerBookScreenNav';
import FollowersScreenNav from './AllScreen/FollowersScreenNav';
import SupportScreenNav from './AllScreen/SupportScreenNav';
import MediaScreenNav from './AllScreen/MediaScreenNav';
import ChatBoxScreenNav from './AllScreen/ChatBoxScreenNav';
import HomeScreenNav from './AllScreen/HomeScreenNav';

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
        <Stack.Screen name="LedgerBookScreenNav" component={LedgerBookScreenNav} />
        <Stack.Screen name="FollowersScreenNav" component={FollowersScreenNav} />
        <Stack.Screen name="ChatBoxScreenNav" component={ChatBoxScreenNav} />
        <Stack.Screen name="SupportScreenNav" component={SupportScreenNav} />
        <Stack.Screen name="MediaScreenNav" component={MediaScreenNav} />
        <Stack.Screen name="HomeScreenNav" component={HomeScreenNav} />
        
      </Stack.Navigator>

  );
};

export default StackNavigation;
