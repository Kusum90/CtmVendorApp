import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';

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
    paddingHorizontal:10,
    paddingVertical:10,
    marginRight:1
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    // paddingHorizontal: 2,
  },
  tableHeaderText: {
    width: 80, // Adjust the width to align columns properly
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: 85,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#fff',
  },
  productImage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  tableCell: {
    width: 93, // Adjust the width to match the header
    textAlign: 'center',
    fontSize: 12,
  },
});

export default StoreData;
