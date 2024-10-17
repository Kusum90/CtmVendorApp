import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MyAccount from '../assets/svg/HeaderSVG/MyAccount';
import Notification from '../assets/svg/HeaderSVG/Notification';
import Search from '../assets/svg/HeaderSVG/Search';
import CleantechMart from '../assets/svg/HeaderSVG/cleantec';
import { wp,hp,FontSize } from './responsiveUtils';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Cleantechmart Logo */}
      <Image
        source={require('../assets/images/ctmSinglelogo.png')} // Path to your image
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
        <Notification width={26} height={26} color='black'/>
      </TouchableOpacity>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <MyAccount width={23} height={23} color='black'/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2), // Use wp for horizontal padding
    paddingVertical: hp(2), // Use hp for vertical padding
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logo: {
    width: wp(15), // Adjust width using wp
    height: hp(5),  // Adjust height using hp
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: wp(3), // Use wp for horizontal padding
    marginHorizontal: wp(2), // Use wp for horizontal margin
    height: hp(5), // Use hp for height
  },
  searchIcon: {
    marginRight: wp(2), // Use wp for right margin
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize(16), // Use FontSize function for dynamic font size
    color: 'black',
  },
  iconButton: {
    paddingHorizontal: wp(2), // Use wp for horizontal padding
  },
});

export default Header;
