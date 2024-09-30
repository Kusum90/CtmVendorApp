import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
import CouponScreen from '../../../screens/CouponScreen/CouponScreen';
import PaymentScreen from '../../../screens/PaymentsScreen/PaymentScreen';


const Stack = createNativeStackNavigator();

function PaymentsScreenNav() {
  return (
      <Stack.Navigator initialRouteName="PaymentScreen">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="PaymentScreen" 
          component={PaymentScreen} 
          options={{ title: 'Payments' }} 
        />
        
      </Stack.Navigator>
  );
}

export default PaymentsScreenNav;
