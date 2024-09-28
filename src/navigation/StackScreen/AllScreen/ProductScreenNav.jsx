import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from '../../../screens/ProductScreen/ProductScreen';
import ProductDetails from '../../../components/ProductComponent/ProductInnerComponent/ProductDetails';
import ProductInventoryScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductInventoryScreen';
import ProductShippingScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductShippingScreen';
import ProductTaxScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductTaxScreen';

const Stack = createNativeStackNavigator();

function ProductScreenNav() {
  return (
    <Stack.Navigator initialRouteName="ProductScreen">
      {/* Define all your screens here */}
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{title: 'Product Details'}}
      />
      <Stack.Screen
        name="ProductInventoryScreen" // Fixing the screen name here
        component={ProductInventoryScreen}
        options={{title: 'Product Inventory'}}
      />
       <Stack.Screen
        name="ProductShippingScreen" // Fixing the screen name here
        component={ProductShippingScreen}
        options={{title: 'Product Shipping'}}
      />
      <Stack.Screen
        name="ProductTaxScreen" // Fixing the screen name here
        component={ProductTaxScreen}
        options={{title: 'Product Tax'}}
      />
    
    </Stack.Navigator>
  );
}

export default ProductScreenNav;
