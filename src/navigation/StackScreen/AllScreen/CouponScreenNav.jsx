import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
import CouponScreen from '../../../screens/CouponScreen/CouponScreen';


const Stack = createNativeStackNavigator();

function CouponScreenNav() {
  return (
      <Stack.Navigator initialRouteName="CouponScreen">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="CouponScreen" 
          component={CouponScreen} 
          options={{ title: 'Coupon' }} 
        />
        
      </Stack.Navigator>
  );
}

export default CouponScreenNav;
