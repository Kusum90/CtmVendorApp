// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import OrderScreen from '../../../screens/OrdersScreen/OrderScreen';
// import StoreSettings from '../../../components/SettingComponent/StoreSettings';
// import LocationScreen from '../../../components/SettingComponent/LocationScreen';
// import PayScreen from '../../../components/SettingComponent/PayScreen';
// import PoliciesScreen from '../../../components/SettingComponent/PoliciesScreen';
// import CustomerSupportScreen from '../../../components/SettingComponent/CustomerSupportScreen';
// import StoreInvoiceScreen from '../../../components/SettingComponent/StoreInvoiceScreen';
// import SocialScreen from '../../../components/SettingComponent/SocialScreen';


// const Stack = createNativeStackNavigator();

// function SettingScreenNav() {
//   return (
//       <Stack.Navigator initialRouteName="StoreSettings">
//         {/* Define all your screens here */}
//         <Stack.Screen 
//           name="StoreSettings" 
//           component={StoreSettings} 
//           options={{ title: 'StoreSettings',headerShown:false }} 
//         />
//         <Stack.Screen 
//           name="LocationScreen" 
//           component={LocationScreen} 
//           options={{ title: 'LocationScreen' }} 
//         />
//         <Stack.Screen 
//           name="PayScreen" 
//           component={PayScreen} 
//           options={{ title: 'PayScreen' }} 
//         />
//         <Stack.Screen 
//           name="PoliciesScreen" 
//           component={PoliciesScreen} 
//           options={{ title: 'PoliciesScreen' }} 
//         />
//         <Stack.Screen 
//           name="CustomerSupportScreen" 
//           component={CustomerSupportScreen} 
//           options={{ title: 'CustomerSupportScreen' }} 
//         />
//          <Stack.Screen 
//           name="StoreInvoiceScreen" 
//           component={StoreInvoiceScreen} 
//           options={{ title: 'StoreInvoiceScreen' }} 
//         />
//          <Stack.Screen 
//           name="SocialScreen" 
//           component={SocialScreen} 
//           options={{ title: 'SocialScreen' }} 
//         />
        
//       </Stack.Navigator>
//   );
// }

// export default SettingScreenNav;



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreSettings from '../../../components/SettingComponent/StoreSettings';
import LocationScreen from '../../../components/SettingComponent/LocationScreen';
import PayScreen from '../../../components/SettingComponent/PayScreen';
import PoliciesScreen from '../../../components/SettingComponent/PoliciesScreen';
import CustomerSupportScreen from '../../../components/SettingComponent/CustomerSupportScreen';
import StoreInvoiceScreen from '../../../components/SettingComponent/StoreInvoiceScreen';
import SocialScreen from '../../../components/SettingComponent/SocialScreen';
import BackArrow from '../../../assets/svg/Couponsvg/BackArrow';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'StoreSettings', component: StoreSettings, title: 'Store Settings' },
  { name: 'LocationScreen', component: LocationScreen, title: 'Location' },
  { name: 'PayScreen', component: PayScreen, title: 'Payment' },
  { name: 'PoliciesScreen', component: PoliciesScreen, title: 'Policies' },
  { name: 'CustomerSupportScreen', component: CustomerSupportScreen, title: 'Customer Support' },
  { name: 'StoreInvoiceScreen', component: StoreInvoiceScreen, title: 'Store Invoice' },
  { name: 'SocialScreen', component: SocialScreen, title: 'Social Media' },
];

function CustomHeader({ navigation, title, currentIndex, totalScreens }) {
  return (
    <View style={styles.headerContainer}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.paginationText}>{currentIndex}/{totalScreens}</Text>
    </View>
  );
}

function SettingScreenNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable default header
      }}
    >
      {screens.map((screen, index) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={(props) => (
            <View style={{ flex: 1 }}>
              <CustomHeader
                navigation={props.navigation}
                title={screen.title}
                currentIndex={index + 1}
                totalScreens={screens.length}
              />
              <screen.component {...props} />
            </View>
          )}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: '#f5f5f5',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    fontSize: 20,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paginationText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SettingScreenNav;
