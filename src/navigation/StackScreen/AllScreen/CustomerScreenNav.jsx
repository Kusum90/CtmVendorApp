// CustomerScreenNav.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomersScreen from '../../../screens/CustomerScreen/CustomersScreen';

const Stack = createNativeStackNavigator();

function CustomerScreenNav() {
  return (
    <Stack.Navigator initialRouteName="CustomersScreen">
      <Stack.Screen 
        name="CustomersScreen" 
        component={CustomersScreen} 
        options={{ title: 'Customers' }} 
      />
    </Stack.Navigator>
  );
}

export default CustomerScreenNav;
