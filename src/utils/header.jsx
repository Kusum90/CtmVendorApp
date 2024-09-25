import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import MyAccount from '../assets/svg/HeaderSVG/MyAccount';
import Notification from '../assets/svg/HeaderSVG/Notification';
import Search from '../assets/svg/HeaderSVG/Search';
import CleantechMart from '../assets/svg/HeaderSVG/cleantec';


const Header = () => {
  return (
    <View style={styles.container}>
      {/* Cleantechmart Logo */}
      {/* <CleantechMart width={26} height={26} color='green'/> */}
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50, // Adjust the width of the logo
    height: 40,  // Adjust the height of the logo
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  iconButton: {
    paddingHorizontal: 5,
  },
});

export default Header;
