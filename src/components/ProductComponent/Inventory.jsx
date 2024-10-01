import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

import { useNavigation } from '@react-navigation/native';

import Plus from '../../assets/svg/Productsvg/Plus';
import Upload from '../../assets/svg/Productsvg/Upload';
import Download from '../../assets/svg/Productsvg/Download';

const Inventory = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Title and Buttons in the Same Row */}
      <View style={styles.headerContainer}>
        {/* Inventory Title */}
        <Text style={styles.title}>Inventory</Text>

        {/* Buttons on the right */}
        <View style={styles.buttonsContainer}>
          {/* Green Button */}
          <TouchableOpacity
            style={[styles.iconButton, styles.greenButton]}
            onPress={() => navigation.navigate('ProductDetails')}
          >
            <Plus width={50} height={50} />
          </TouchableOpacity>

          {/* Orange Button */}
          <TouchableOpacity style={[styles.iconButton, styles.orangeButton]}>
            <Upload width={50} height={50} />
          </TouchableOpacity>

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
    backgroundColor: '#fff',
    padding: wp(4),
    borderBottomWidth: wp(0.3),
    borderBottomColor: '#ddd',
  },
  headerContainer: {
    flexDirection: 'row', // Align title and buttons in the same row
    justifyContent: 'space-between', // Spread title and buttons across the row
    alignItems: 'center', // Align items vertically in the center
    marginBottom: hp(1),
  },
  title: {
    fontSize: FontSize(25),
    fontWeight: 'bold',
    color: '#373737',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(1.5),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: wp(2),
    padding: wp(2.5),
    marginHorizontal: wp(1.5),
  },
  filterText: {
    color: '#666',
    fontSize: FontSize(14),
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: wp(2),
    paddingHorizontal: wp(2.5),
    marginLeft: wp(2.5),
    fontSize: FontSize(14),
  },
});

export default Inventory;
