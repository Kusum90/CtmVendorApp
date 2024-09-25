// DrawerNavigation.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuScreen from '../../screens/MenuScreen/MenuScreen';
import DrawerContent from '@react-navigation/drawer';

// Create drawer navigator
const Drawer = createDrawerNavigator();

// Create the drawer navigation with custom content
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Menu" component={MenuScreen} />
      {/* Add more screens to the drawer if needed */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
