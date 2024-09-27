import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CouponDashboard from '../../components/CouponComponent/CouponDashboard'
import Coupon from '../../components/CouponComponent/Coupon'
import Coupondata from '../../components/CouponComponent/Coupondata'



const CouponScreen = () => {
  return (
    <ScrollView>
        <CouponDashboard/>
        <Coupon/>
        <Coupondata/>
    </ScrollView>
  )
}

export default CouponScreen

const styles = StyleSheet.create({})