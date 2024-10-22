import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
import StoreSettings from '../../../components/SettingComponent/StoreSettings';
import LocationScreen from '../../../components/SettingComponent/LocationScreen';
import PayScreen from '../../../components/SettingComponent/PayScreen';
import PoliciesScreen from '../../../components/SettingComponent/PoliciesScreen';
import CustomerSupportScreen from '../../../components/SettingComponent/CustomerSupportScreen';
import StoreInvoiceScreen from '../../../components/SettingComponent/StoreInvoiceScreen';
import SocialScreen from '../../../components/SettingComponent/SocialScreen';


const Stack = createNativeStackNavigator();

function SettingScreenNav() {
  return (
      <Stack.Navigator initialRouteName="StoreSettings">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="StoreSettings" 
          component={StoreSettings} 
          options={{ title: 'StoreSettings',headerShown:false }} 
        />
        <Stack.Screen 
          name="LocationScreen" 
          component={LocationScreen} 
          options={{ title: 'LocationScreen' }} 
        />
        <Stack.Screen 
          name="PayScreen" 
          component={PayScreen} 
          options={{ title: 'PayScreen' }} 
        />
        <Stack.Screen 
          name="PoliciesScreen" 
          component={PoliciesScreen} 
          options={{ title: 'PoliciesScreen' }} 
        />
        <Stack.Screen 
          name="CustomerSupportScreen" 
          component={CustomerSupportScreen} 
          options={{ title: 'CustomerSupportScreen' }} 
        />
         <Stack.Screen 
          name="StoreInvoiceScreen" 
          component={StoreInvoiceScreen} 
          options={{ title: 'StoreInvoiceScreen' }} 
        />
         <Stack.Screen 
          name="SocialScreen" 
          component={SocialScreen} 
          options={{ title: 'SocialScreen' }} 
        />
        
      </Stack.Navigator>
  );
}

export default SettingScreenNav;
