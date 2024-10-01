import { View, Text } from 'react-native'
import React from 'react'
import LedgerDashboard from '../../components/LedgerBookComponent/LedgerDashboard'
import LedgerBook from '../../components/LedgerBookComponent/LedgerBook'
import LedgerData from '../../components/LedgerBookComponent/LedgerData'
import { ScrollView } from 'react-native-gesture-handler'

const LedgerBookScreen = () => {
  return (
    <ScrollView>
    <LedgerDashboard/>
    <LedgerBook/>
    <LedgerData/>
    </ScrollView>
  )
}

export default LedgerBookScreen