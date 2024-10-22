// CustomerScreenNav.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RefundScreen from '../../../screens/RefundScreen/RefundScreen';

const Stack = createNativeStackNavigator();

function RefundsScreenNav() {
  return (
    <Stack.Navigator initialRouteName="RefundScreen">
      <Stack.Screen 
        name="RefundScreen" 
        component={RefundScreen} 
        options={{ title: 'Refunds',headerShown:false }} 
      />
    </Stack.Navigator>
  );
}

export default RefundsScreenNav;
