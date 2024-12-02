import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../../components/AccountComponent/ProfileScreen';
import ProfileEditScreen from '../../../components/AccountComponent/ProfileEditScreen';
const Stack = createNativeStackNavigator();

function HomeScreenNav() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreenNav;
