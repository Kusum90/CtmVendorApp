// AddToMyStoreScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomersScreen from '../../../screens/CustomerScreen/CustomersScreen';
import AddtomyStoreScreen from '../../../screens/AddTomyStoreScreen/AddtomyStoreScreen';
import MediaScreen from '../../../screens/MediaScreen/MediaScreen';

const Stack = createNativeStackNavigator();

function MediaScreenNav() {
  return (
    <Stack.Navigator initialRouteName="MediaScreen">
      <Stack.Screen 
        name="MediaScreen" 
        component={MediaScreen} 
        options={{ title: 'MediaScreen' ,headerShown:false}} 
      />
    </Stack.Navigator>
  );
}

export default MediaScreenNav;
