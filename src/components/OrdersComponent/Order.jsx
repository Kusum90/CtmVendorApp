import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Plus from '../../assets/svg/Productsvg/Plus';
import Upload from '../../assets/svg/Productsvg/Upload';
import Download from '../../assets/svg/Productsvg/Download';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const Order = () => {
  return (
    <View style={styles.container}>
      {/* Title and Buttons on the same row */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.buttonsContainer}>
          {/* Blue Button */}
          <TouchableOpacity style={[styles.iconButton, styles.blueButton]}>
            <Download width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter and Search Section */}
      <View style={styles.filterContainer}>
        {/* Date Filter */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Last 30 days</Text>
        </TouchableOpacity>

        {/* General Filter */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter by</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize(20), // Responsive font size
    fontWeight: 'bold',
    color: '#373737',
    marginBottom: hp(2), // Responsive margin
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: wp(10), // Responsive width
    height: hp(6), // Responsive height
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
    padding: wp(3), // Responsive padding
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
    paddingHorizontal: wp(3), // Responsive horizontal padding
    marginLeft: wp(2.5), // Responsive margin
    fontSize: FontSize(14), // Responsive font size
  },
});

export default Order;
