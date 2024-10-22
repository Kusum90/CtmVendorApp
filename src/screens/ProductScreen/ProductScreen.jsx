import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Product from '../../components/ProductComponent/Product'

import { ScrollView } from 'react-native-gesture-handler'
import ProductData from '../../components/ProductComponent/ProductData'

const ProductScreen = () => {
  return (
    <ScrollView>
        <Product/>
        
        <ProductData/>
    </ScrollView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})