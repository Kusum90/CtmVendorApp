import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import MenuScreen from '../../screens/MenuScreen/MenuScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import NotificationScreen from '../../screens/NotificationScreen/NotificationScreen';
import MyAccountScreen from '../../screens/MyAccount/MyAccountScreen';

// Import all icon components for each tab
import HomeIcon from '../../assets/svg/BottomTabSVG/HomeIcon';
import MenuIcon from '../../assets/svg/BottomTabSVG/MenuIcon';
import ProductIcon from '../../assets/svg/BottomTabSVG/ProductIcon';
import OrderIcon from '../../assets/svg/BottomTabSVG/OrderIcon';
import ChatIcon from '../../assets/svg/BottomTabSVG/ChatIcon';
import CustomDrawerContent from '../DrawerScreen/CustomDrawerContents';
import ProductScreen from '../../screens/ProductScreen/ProductScreen';
import ProductScreenNav from '../StackScreen/ProductScreenNav';
import OrderScreenNav from '../StackScreen/OrderScreenNav';
import StoreSettings from '../../components/SettingComponent/StoreSettings';
import SettingScreen from '../../screens/SettingScreen/SettingScreen';
import SettingScreenNav from '../StackScreen/SettingScreenNav';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();
// Create drawer navigator
const Drawer = createDrawerNavigator();

// Tab Navigation
const TabNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Home is the default active tab
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'green', // Set the active text color to green
        tabBarInactiveTintColor: 'black', // Set the inactive text color to black
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: { backgroundColor: '#dddddd' },
        headerShown: false,
      }}>
      {/* Individual tab screens with their respective icons */}
      <Tab.Screen
        name="Menu"
        component={HomeScreen}  // Use a dummy component or leave it as it is
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MenuIcon color={focused ? 'green' : 'black'} width={26} height={26} />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();  // Prevent default navigation behavior
            navigation.toggleDrawer();  // Open the drawer
          },
        }}
      />
      
      <Tab.Screen
        name="ProductScreenNav"
        component={ProductScreenNav}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <ProductIcon color={focused ? 'green' : 'black'} width={28} height={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <HomeIcon color={focused ? 'green' : 'black'} width={28} height={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="OrderScreenNav"
        component={OrderScreenNav}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <OrderIcon color={focused ? 'green' : 'black'} width={28} height={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={MyAccountScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <ChatIcon color={focused ? 'green' : 'black'} width={28} height={28} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Create the drawer navigation
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tabs" component={TabNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="SettingScreenNav" component={SettingScreenNav} options={{ headerShown: false }} />
      
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabBarLabel: {
    fontWeight: 'bold',
  },
});

export default DrawerNavigation;
