// components/DrawerContent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Optional: Import custom SVG icons (if you have them)
import ProfileIcon from '../../assets/svg/profile';
import SettingsIcon from '../../assets/svg/settings';
import HelpIcon from '../../assets/svg/help'; // Add this if you want to use icons

const DrawerContent = (props) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 15;

  return (
    <DrawerContentScrollView {...props} style={{ paddingTop }}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>

      {/* Menu Items */}
      <DrawerItem
        label="Profile"
        icon={() => <ProfileIcon color="black" width={20} height={20} />} // Optional Icon
        onPress={() => props.navigation.navigate('Profile')}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Settings"
        icon={() => <SettingsIcon color="black" width={20} height={20} />} // Optional Icon
        onPress={() => props.navigation.navigate('Settings')}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Help"
        icon={() => <HelpIcon color="black" width={20} height={20} />} // Optional Icon
        onPress={() => props.navigation.navigate('Help')}
        labelStyle={styles.drawerItemLabel}
      />
      {/* Add more DrawerItems as needed */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: '#dddddd',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DrawerContent;
