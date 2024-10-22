import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
import OrderDetails from '../../../components/OrdersComponent/OrderDetails';
import EditOrder from '../../../components/OrdersComponent/EditOrder';


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
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="EditOrder" component={EditOrder} />
      </Stack.Navigator>
  );
}

export default OrderScreenNav;
