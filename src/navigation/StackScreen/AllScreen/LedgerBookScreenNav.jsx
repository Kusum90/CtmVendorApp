import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
import CouponScreen from '../../../screens/CouponScreen/CouponScreen';
import PaymentScreen from '../../../screens/PaymentsScreen/PaymentScreen';
import LedgerBookScreen from '../../../screens/LedgerBookScreen/LedgerBookScreen';


const Stack = createNativeStackNavigator();

function LedgerBookScreenNav() {
  return (
      <Stack.Navigator initialRouteName="LedgerBookScreen">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="LedgerBookScreen" 
          component={LedgerBookScreen} 
          options={{ title: 'Payments',headerShown:false }} 
        />
        
      </Stack.Navigator>
  );
}

export default LedgerBookScreenNav;
