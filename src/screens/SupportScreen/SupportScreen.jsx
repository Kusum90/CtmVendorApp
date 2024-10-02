import { View, Text } from 'react-native'
import React from 'react'
import Support from '../../components/SupportComponent/Support'
import SupportData from '../../components/SupportComponent/SupportData'
import { ScrollView } from 'react-native-gesture-handler'

export default function SupportScreen() {
  return (
    <ScrollView>
     <Support/>
     <SupportData/>
    </ScrollView>
  )
}