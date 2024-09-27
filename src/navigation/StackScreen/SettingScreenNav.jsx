import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../screens/OrdersScreen/OrderScreen';
import StoreSettings from '../../components/SettingComponent/StoreSettings';
import LocationScreen from '../../components/SettingComponent/LocationScreen';
import PayScreen from '../../components/SettingComponent/PayScreen';


const Stack = createNativeStackNavigator();

function SettingScreenNav() {
  return (
      <Stack.Navigator initialRouteName="StoreSettings">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="StoreSettings" 
          component={StoreSettings} 
          options={{ title: 'StoreSettings' }} 
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
        
      </Stack.Navigator>
  );
}

export default SettingScreenNav;
