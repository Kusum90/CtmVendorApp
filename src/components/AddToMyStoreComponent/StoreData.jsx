import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

// Main Screen Component
const StoreData = () => {
  const inventoryData = [
    {
        id: 1,
        image: require('../../assets/images/ProductScreenImages/product1.png'),
        ProductName:'Carrot Chips',
        Price:'₹425.0',
        taxonomies:'Categories-Natural....',
        Store:'Chipper Customer' ,
    
    },
    {
        id: 2,
        image: require('../../assets/images/ProductScreenImages/product1.png'),
        ProductName:'Carrot Chips',
        Price:'₹425.0',
        taxonomies:'Categories-Natural....',
        Store:'Chipper Customer' ,
    
    },
    {
        id: 3,
        image: require('../../assets/images/ProductScreenImages/product1.png'),
        ProductName:'Carrot Chips',
        Price:'₹425.0',
        taxonomies:'Categories-Natural....',
        Store:'Chipper Customer' ,
    
    },
    {
        id: 4,
        image: require('../../assets/images/ProductScreenImages/product1.png'),
        ProductName:'Carrot Chips',
        Price:'₹425.0',
        taxonomies:'Categories-Natural....',
        Store:'Chipper Customer' ,
    
    },
    {
        id: 5,
        image: require('../../assets/images/ProductScreenImages/product1.png'),
        ProductName:'Carrot Chips',
        Price:'₹425.0',
        taxonomies:'Categories-Natural....',
        Store:'Chipper Customer' ,
    
    },
    {
    id: 6,
        image: require('../../assets/images/ProductScreenImages/product1.png'),
        ProductName:'Carrot Chips',
        Price:'₹425.0',
        taxonomies:'Categories-Natural....',
        Store:'Chipper Customer' ,
    
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Image </Text>
          <Text style={styles.tableHeaderText}>ProductName </Text>
          <Text style={styles.tableHeaderText}>Price</Text>
          <Text style={styles.tableHeaderText}>Taxonomies</Text>
          <Text style={styles.tableHeaderText}>Store</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.deleteButton}>
              <Seen width={50} height={50} /> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
              <Delete width={50} height={50} /> 
              </TouchableOpacity>
            </View>

            
            {/* Product Data */}
            <Image source={item.image} style={styles.productImage} />

            <Text style={styles.tableCell}>{item.ProductName}</Text>
            <Text style={styles.tableCell}>{item.Price}</Text>
            <Text style={styles.tableCell}>{item.taxonomies}</Text>
            <Text style={styles.tableCell}>{item.Store}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(2.5), // Responsive horizontal padding
    paddingVertical: hp(2), // Responsive vertical padding
    marginRight: wp(0.5), // Responsive marginRight
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1), // Responsive vertical padding
  },
  tableHeaderText: {
    width: wp(20), // Responsive width for alignment
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(14), // Responsive font size
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1), // Responsive vertical padding
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(21.25), // Responsive width
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#fff',
  },
  productImage: {
    width: wp(12.5), // Responsive width
    height: wp(12.5), // Responsive height (keeping aspect ratio)
    marginHorizontal: wp(2.5), // Responsive horizontal margin
  },
  tableCell: {
    width: wp(23.125), // Responsive width to match header
    textAlign: 'center',
    fontSize: FontSize(12), // Responsive font size
  },
});

export default StoreData;
