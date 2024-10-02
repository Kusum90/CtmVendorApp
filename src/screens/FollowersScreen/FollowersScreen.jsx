import { View, Text } from 'react-native'
import React from 'react'
import Followers from '../../components/FollowersComponent/Followers'
import FollowersData from '../../components/FollowersComponent/FollowersData'
import { ScrollView } from 'react-native-gesture-handler'

const FollowersScreen = () => {
  return (
    <ScrollView>
     <Followers/>
     <FollowersData/>
    </ScrollView>
  )
}

export default FollowersScreen