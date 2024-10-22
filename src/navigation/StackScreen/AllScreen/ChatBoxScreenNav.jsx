
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatBoxScreen from '../../../screens/ChatBoxScreen/ChatBoxScreen';


const Stack = createNativeStackNavigator();

function ChatBoxScreenNav() {
  return (
    <Stack.Navigator initialRouteName="ChatBoxScreen">
      <Stack.Screen 
        name="ChatBoxScreen" 
        component={ChatBoxScreen} 
        options={{ title: 'Chat Box' ,headerShown:false}} 
      />
    </Stack.Navigator>
  );
}

export default ChatBoxScreenNav;
