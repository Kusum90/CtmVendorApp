import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import RootNavigation from './src/navigation/RootNavigation'

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1,}}>
      <RootNavigation/>
    </GestureHandlerRootView>
  )
}

export default App