import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
import CouponScreen from '../../../screens/CouponScreen/CouponScreen';
import PaymentScreen from '../../../screens/PaymentsScreen/PaymentScreen';
import LedgerBookScreen from '../../../screens/LedgerBookScreen/LedgerBookScreen';
import FollowersScreen from '../../../screens/FollowersScreen/FollowersScreen';


const Stack = createNativeStackNavigator();

function FollowersScreenNav() {
  return (
      <Stack.Navigator initialRouteName="FollowersScreen">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="FollowersScreen" 
          component={FollowersScreen} 
          options={{ title: 'Followers' }} 
        />
        
      </Stack.Navigator>
  );
}

export default FollowersScreenNav;
