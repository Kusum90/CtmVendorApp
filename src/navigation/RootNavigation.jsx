import { View, Text } from 'react-native'
import React from 'react'
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
  } from '@react-navigation/native';
import TabNavigation from './TabScreen/TabNavigation'

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <TabNavigation/>
    </NavigationContainer>
  )
}

export default RootNavigation