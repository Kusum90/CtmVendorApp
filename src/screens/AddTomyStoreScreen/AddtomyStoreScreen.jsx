import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import StoreDashboard from '../../components/AddToMyStoreComponent/StoreDashboard'
import StoreData from '../../components/AddToMyStoreComponent/StoreData'

const AddtomyStoreScreen = () => {
  return (
    <ScrollView>
      {/* <StoreDashboard/> */}
    
      <StoreData/>
    </ScrollView>
  )
}

export default AddtomyStoreScreen