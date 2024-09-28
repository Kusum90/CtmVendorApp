import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomersDashboard from '../../components/CustomerComponent/CustomersDashboard'
import Customer from '../../components/CustomerComponent/Customer'
import CustomersData from '../../components/CustomerComponent/CustomersData'

const CustomersScreen = () => {
  return (
    <ScrollView>
      <CustomersDashboard/>
      <Customer/>
      <CustomersData/>
    </ScrollView>
  )
}

export default CustomersScreen