// AddToMyStoreScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomersScreen from '../../../screens/CustomerScreen/CustomersScreen';
import AddtomyStoreScreen from '../../../screens/AddTomyStoreScreen/AddtomyStoreScreen';
import SupportScreen from '../../../screens/SupportScreen/SupportScreen';

const Stack = createNativeStackNavigator();

function SupportScreenNav() {
  return (
    <Stack.Navigator initialRouteName="SupportScreen">
      <Stack.Screen 
        name="SupportScreen" 
        component={SupportScreen} 
        options={{ title: 'Support Screen' ,headerShown:false}} 
      />
    </Stack.Navigator>
  );
}

export default SupportScreenNav;
