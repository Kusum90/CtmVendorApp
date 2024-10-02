import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Download from '../../assets/svg/Productsvg/Download';
import Plus from '../../assets/svg/Productsvg/Plus';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const Followers = () => {
  return (
    <View style={styles.container}>
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
    fontSize: FontSize(18), // Responsive font size
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
});

export default Followers;

