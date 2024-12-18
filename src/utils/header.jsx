import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MyAccount from '../assets/svg/HeaderSVG/MyAccount';
import Notification from '../assets/svg/HeaderSVG/Notification';
import Search from '../assets/svg/HeaderSVG/Search';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook
import { wp, hp, FontSize } from './responsiveUtils';

const Header = () => {
  const navigation = useNavigation();  // Use the navigation hook to get the navigation object

  return (
    <View style={styles.container}>
      {/* Cleantechmart Logo */}
      <Image
        source={require('../assets/images/ctmSinglelogo.png')} 
        style={styles.logo}
        resizeMode="contain" 
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search width={20} height={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>

      {/* Notification Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <Notification width={26} height={26} color='black' />
      </TouchableOpacity>

      {/* Account Icon (Navigation) */}
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => navigation.navigate('ProfileScreen' )} // Updated Navigation Call
      >
        <MyAccount width={23} height={23} color='black' />
      </TouchableOpacity>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logo: {
    width: wp(15),
    height: hp(5),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: wp(3),
    marginHorizontal: wp(2),
    height: hp(5),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize(16),
    color: 'black',
  },
  iconButton: {
    paddingHorizontal: wp(2),
  },
});

export default Header;
