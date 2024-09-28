// AddToMyStoreScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomersScreen from '../../../screens/CustomerScreen/CustomersScreen';

const Stack = createNativeStackNavigator();

function AddToMyStoreScreenNav() {
  return (
    <Stack.Navigator initialRouteName="AddtomyStore">
      <Stack.Screen 
        name="AddtomyStore" 
        component={AddtomyStore} 
        options={{ title: 'Add to Store' }} 
      />
    </Stack.Navigator>
  );
}

export default AddToMyStoreScreenNav;
