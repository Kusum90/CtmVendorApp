import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

// Import responsive utilities
import { FontSize } from '../../../utils/responsiveUtils'; // Adjust the import path accordingly

const Stack = createNativeStackNavigator();

// Define your screens in the order of appearance, excluding the initial ProductScreen
const screens = [
  { name: 'ProductDetails', component: ProductDetails, title: 'Product Details' },
  { name: 'ProductInventoryScreen', component: ProductInventoryScreen, title: 'Product Inventory' },
  { name: 'ProductShippingScreen', component: ProductShippingScreen, title: 'Product Shipping' },
  { name: 'ProductTaxScreen', component: ProductTaxScreen, title: 'Product Tax' },
  { name: 'ProductAttributeScreen', component: ProductAttributeScreen, title: 'Product Attribute' },
  { name: 'ProductLinkedScreen', component: ProductLinkedScreen, title: 'Product Linked' },
  { name: 'ProductSeoScreen', component: ProductSeoScreen, title: 'Product SEO' },
  { name: 'ProductMandatePointScreen', component: ProductMandatepointScreen, title: 'Product Mandate Point' },
  { name: 'ProductSustanibilityScreen', component: ProductSustanibilityScreen, title: 'Product Sustainability' },
  { name: 'ProductMOQScreen', component: ProductMOQScreen, title: 'Product MOQ' },
  { name: 'ProductUnitsScreen', component: ProductUnitsScreen, title: 'Product Units' },
  { name: 'ProductPoliciesScreen', component: ProductPoliciesScreen, title: 'Product Policies' },
  { name: 'ProductAdvanceScreen', component: ProductAdvanceScreen, title: 'Product Advance' },
];

function ProductScreenNav() {
  return (
    <Stack.Navigator
      initialRouteName="ProductScreen"
      screenOptions={({ route }) => {
        const currentIndex = screens.findIndex(screen => screen.name === route.name) + 1;
        const totalScreens = screens.length;

        return {
          headerTitleAlign: 'center', // Default centering for the title
          headerStyle: { backgroundColor: '#f5f5f5' }, // Optional: Background color for header
          headerRight: () => (
            currentIndex > 0 && ( // Only show pagination if not on the ProductScreen
              <View style={styles.paginationContainer}>
                <Text style={styles.paginationText}>
                  {currentIndex}/{totalScreens}
                </Text>
              </View>
            )
          ),
        };
      }}>

      {/* Initial screen not to be counted */}
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ title: 'Product' }}
      />

      {/* Map through the remaining screens and define each screen */}
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ title: screen.title }} // This title will be used as the header title
        />
      ))}
    </Stack.Navigator>
  );
}

// Custom styles for the pagination header
const styles = StyleSheet.create({
  paginationContainer: {
    // marginRight: 15, 
  },
  paginationText: {
    fontSize: FontSize(16), // Use responsive font size
    color: '#007BFF', // Blue color for pagination
    fontWeight: 'bold',
  },
});

export default ProductScreenNav;
