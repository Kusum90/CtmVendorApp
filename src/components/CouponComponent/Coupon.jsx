import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Plus from '../../assets/svg/Productsvg/Plus';

const Coupon = () => {
  return (
    <View style={styles.container}>
      {/* Title and Buttons on the same row */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Coupons</Text>
        <View style={styles.buttonsContainer}>
          {/* Blue Button */}
          <TouchableOpacity style={[styles.iconButton, styles.blueButton]}>
            <Plus width={50} height={50} />
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#373737',
    marginBottom:15
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  iconText: {
    fontSize: 18,
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    fontSize: 14,
  },
});

export default Coupon;