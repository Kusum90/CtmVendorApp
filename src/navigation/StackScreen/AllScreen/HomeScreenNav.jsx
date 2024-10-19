import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../../components/AccountComponent/ProfileScreen';
import EditScreen from '../../../components/AccountComponent/EditScreen';
const Stack = createNativeStackNavigator();

function HomeScreenNav() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreenNav;
