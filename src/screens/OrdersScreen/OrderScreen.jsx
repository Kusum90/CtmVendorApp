import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dashboard from '../../components/OrdersComponent/Dashboard'
import Order from '../../components/OrdersComponent/Order'
import OrdersData from './OrdersData'
import { ScrollView } from 'react-native-gesture-handler'


const OrderScreen = () => {
  return (
    <ScrollView>
        <Dashboard/>
        <Order/>
        <OrdersData/>
    </ScrollView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})