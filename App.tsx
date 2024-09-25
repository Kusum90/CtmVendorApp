import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RootNavigation from './src/navigation/RootNavigation'

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1,backgroundColor:'orange'}}>
      <RootNavigation/>
    </GestureHandlerRootView>
  )
}

export default App