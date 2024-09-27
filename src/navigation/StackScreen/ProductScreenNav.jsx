import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from '../../screens/ProductScreen/ProductScreen';
import ProductDetails from '../../components/ProductComponent/ProductInnerComponent/ProductDetails';


const Stack = createNativeStackNavigator();

function ProductScreenNav() {
  return (
      <Stack.Navigator initialRouteName="ProductScreen">
        {/* Define all your screens here */}
        <Stack.Screen 
          name="ProductScreen" 
          component={ProductScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails} 
          options={{ title: 'Product Details' }} 
        />
      </Stack.Navigator>
  );
}

export default ProductScreenNav;
