import { View, Text } from 'react-native'
import React from 'react'
import RootNavigation from './src/navigation/RootNavigation'

const App = () => {
  return (
    <View style={{flex:1,backgroundColor:'orange'}}>
      <RootNavigation/>
    </View>
  )
}

export default App