import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../screens/OrdersScreen/OrderScreen';


const Stack = createNativeStackNavigator();

function OrderScreenNav() {
  return (
      <Stack.Navigator initialRouteName="OrderScreen">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="OrderScreen" 
          component={OrderScreen} 
          options={{ title: 'OrderScreen' }} 
        />
        
      </Stack.Navigator>
  );
}

export default OrderScreenNav;
