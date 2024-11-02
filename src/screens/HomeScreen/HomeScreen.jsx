import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import SalesReport from '../../components/HomeScreen/SalesReport'
  import Header from '../../utils/header'
import HomeScreenDashboard from '../../components/HomeScreen/HomeScreenDashboard'

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <Header navigation={navigation}/>
      <HomeScreenDashboard/>
      <SalesReport/>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})