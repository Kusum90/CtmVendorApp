import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from '../../../screens/ProductScreen/ProductScreen';
import ProductDetails from '../../../components/ProductComponent/ProductInnerComponent/ProductDetails';
import ProductInventoryScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductInventoryScreen';
import ProductShippingScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductShippingScreen';
import ProductTaxScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductTaxScreen';
import ProductAttributeScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductAttributeScreen';
import ProductLinkedScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductLinkedScreen';
import ProductSeoScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductSeoScreen';
import ProductMandatepointScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductMandatepointScreen';
import ProductSustanibilityScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductSustanibilityScreen';
import ProductMOQScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductMOQScreen';
import ProductUnitsScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductUnitsScreen';
import ProductPoliciesScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductPoliciesScreen';
import ProductAdvanceScreen from '../../../components/ProductComponent/ProductInnerComponent/ProductAdvanceScreen';

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
      <Stack.Screen
        name="ProductAttributeScreen" // Fixing the screen name here
        component={ProductAttributeScreen}
        options={{title: 'Product Attribute'}}
      />
       <Stack.Screen
        name="ProductLinkedScreen" // Fixing the screen name here
        component={ProductLinkedScreen}
        options={{title: 'Product Linked'}}
      />
       <Stack.Screen
        name="ProductSeoScreen" // Fixing the screen name here
        component={ProductSeoScreen}
        options={{title: 'Product SEO'}}
      />
      <Stack.Screen
        name="ProductMandatePointScreen" // Fixing the screen name here
        component={ProductMandatepointScreen}
        options={{title: 'Product Mandate Point'}}
      />
      <Stack.Screen
        name="ProductSustanibilityScreen" // Fixing the screen name here
        component={ProductSustanibilityScreen}
        options={{title: ' Product Sustanability '}}
      />
      <Stack.Screen
        name="ProductMOQScreen" // Fixing the screen name here
        component={ProductMOQScreen}
        options={{title: ' Product MOQ '}}
      />
      <Stack.Screen
        name="ProductUnitsScreen" // Fixing the screen name here
        component={ProductUnitsScreen}
        options={{title: ' Product Units '}}
      />
      <Stack.Screen
        name="ProductPoliciesScreen" // Fixing the screen name here
        component={ProductPoliciesScreen}
        options={{title: ' Product Policies '}}
      />
      <Stack.Screen
        name="ProductAdvanceScreen" // Fixing the screen name here
        component={ProductAdvanceScreen}
        options={{title: ' Product Advance '}}
      />
    
    </Stack.Navigator>
  );
}

export default ProductScreenNav;
