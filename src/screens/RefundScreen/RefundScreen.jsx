import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import RefundDashboard from '../../components/RefundComponent/RefundDashboard'
import Refunds from '../../components/RefundComponent/Refunds'
import RefundData from '../../components/RefundComponent/RefundData'

const RefundScreen = () => {
  return (
    <ScrollView>
       <RefundDashboard/>
       <Refunds/>
       <RefundData/>
    </ScrollView>
  )
}

export default RefundScreen

const styles = StyleSheet.create({})