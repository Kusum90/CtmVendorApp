import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Plus from '../../assets/svg/Productsvg/Plus';
import Upload from '../../assets/svg/Productsvg/Upload';
import Download from '../../assets/svg/Productsvg/Download';

const Inventory = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Inventory Title */}
      <Text style={styles.title}>Inventory</Text>

      {/* Buttons on the right */}
      <View style={styles.buttonsContainer}>
        {/* Green Button */}
        <TouchableOpacity style={[styles.iconButton, styles.greenButton]} onPress={()=>navigation.navigate('ProductDetails')}>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
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

export default Inventory;

