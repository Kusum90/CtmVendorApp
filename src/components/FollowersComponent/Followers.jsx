import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Download from '../../assets/svg/Productsvg/Download';
import Plus from '../../assets/svg/Productsvg/Plus';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';
import { useNavigation } from '@react-navigation/native';

const Followers = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Followers</Text>
      </View>
      {/* Inventory Title */}
      <Text style={styles.title}>Followers</Text>

      {/* Filter and Search Section */}
      <View style={styles.filterContainer}>
        {/* Date Filter */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Last 30 days</Text>
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(4), // Responsive padding
    borderBottomWidth: hp(0.2), // Responsive border width
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: FontSize(25), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(0.5), // Responsive margin
    color: '#373737',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: hp(2), // Responsive margin
  },
  iconButton: {
    width: wp(10), // Responsive width
    height: hp(5), // Responsive height
    borderRadius: wp(2), // Responsive border radius
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(1.5), // Responsive margin
  },
  iconText: {
    fontSize: FontSize(18), // Responsive font size
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: wp(2), // Responsive border radius
    padding: wp(2.5), // Responsive padding
    marginHorizontal: wp(1.5), // Responsive margin
  },
  filterText: {
    color: '#666',
    fontSize: FontSize(14), // Responsive font size
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: wp(2), // Responsive border radius
    paddingHorizontal: wp(2.5), // Responsive padding
    marginLeft: wp(2.5), // Responsive margin
    fontSize: FontSize(14), // Responsive font size
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 100,
    color:'#373737'
  },
});

export default Followers;

