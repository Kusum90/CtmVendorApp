// AddToMyStoreScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomersScreen from '../../../screens/CustomerScreen/CustomersScreen';
import AddtomyStoreScreen from '../../../screens/AddTomyStoreScreen/AddtomyStoreScreen';

const Stack = createNativeStackNavigator();

function AddToMyStoreScreenNav() {
  return (
    <Stack.Navigator initialRouteName="AddtomyStore">
      <Stack.Screen 
        name="AddtomyStoreScreen" 
        component={AddtomyStoreScreen} 
        options={{ title: 'Add to Store' }} 
      />
    </Stack.Navigator>
  );
}

export default AddToMyStoreScreenNav;
