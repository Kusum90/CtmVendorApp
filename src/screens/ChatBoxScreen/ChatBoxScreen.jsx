import { View, Text } from 'react-native'
import React from 'react'
import ChatHistory from '../../components/ChatBoxComponent/ChatHistory'
import ChathistoryData from '../../components/ChatBoxComponent/ChathistoryData'
import { ScrollView } from 'react-native-gesture-handler'

export default function ChatBoxScreen() {
  return (
    <ScrollView>
      <ChatHistory/>
      <ChathistoryData/>
    </ScrollView>
  )
}