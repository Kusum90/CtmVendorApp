import { View, Text } from 'react-native'
import React from 'react'
import Payment from '../../components/PaymentsComponent/Payment'
import PaymentData from '../../components/PaymentsComponent/PaymentData'
import { ScrollView } from 'react-native-gesture-handler'

const PaymentScreen = () => {
  return (
    <ScrollView>
      <Payment/>
      <PaymentData/>
      </ScrollView>
  )
}

export default PaymentScreen