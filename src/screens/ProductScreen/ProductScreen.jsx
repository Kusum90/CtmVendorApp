import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Product from '../../components/ProductComponent/Product'
import Inventory from '../../components/ProductComponent/Inventory'
import Data from '../../components/ProductComponent/Data'
import { ScrollView } from 'react-native-gesture-handler'

const ProductScreen = () => {
  return (
    <ScrollView>
        <Product/>
        <Inventory/>
        <Data/>
    </ScrollView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})