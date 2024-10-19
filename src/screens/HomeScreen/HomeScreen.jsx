import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SalesReport from '../../components/HomeScreen/SalesReport'
  import Header from '../../utils/header'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation}/>
      <SalesReport/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})