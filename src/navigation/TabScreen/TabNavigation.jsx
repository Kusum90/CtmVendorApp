import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, Text } from 'react-native';
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
// Create bottom tab navigator
const Tab = createBottomTabNavigator();
// Create drawer navigator
const Drawer = createDrawerNavigator();

// Create the drawer navigation
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Menu" component={MenuScreen} />
    </Drawer.Navigator>
  );
};

// Tab Navigation
const TabNavigation = () => {
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
        component={DrawerNavigation}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MenuIcon color={focused ? 'green' : 'black'} width={26} height={26} />
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Products"
        component={NotificationScreen}
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
        name="Order"
        component={MyAccountScreen}
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

export default TabNavigation;
