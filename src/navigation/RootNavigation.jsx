import { View, Text } from 'react-native'
import React from 'react'
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
  } from '@react-navigation/native';
import TabNavigation from './TabScreen/TabNavigation'
import DrawerNavigation from './TabScreen/TabNavigation';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
}

export default RootNavigation