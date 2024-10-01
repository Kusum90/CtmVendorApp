import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';

// Main Screen Component
const Data = () => {
  const inventoryData = [
    {
      id: 1,
      name: 'Carrot Chips',
      sku: 'DSBD01',
      status: 'Published',
      stock: 5,
      price: 'Rs 45',
      taxonomies: 'Sale',
      type: 'Sale',
      views: 10,
      date: '24.12.2020',
      image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
      id: 2,
      name: 'Potato Chips',
      sku: 'DSBD02',
      status: 'Published',
      stock: 7,
      price: 'Rs 50',
      taxonomies: 'Sale',
      type: 'Sale',
      views: 15,
      date: '25.12.2020',
      image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
      id: 3,
      name: 'Potato Chips',
      sku: 'DSBD02',
      status: 'Published',
      stock: 7,
      price: 'Rs 50',
      taxonomies: 'Sale',
      type: 'Sale',
      views: 15,
      date: '25.12.2020',
      image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
      id: 4,
      name: 'Potato Chips',
      sku: 'DSBD02',
      status: 'Published',
      stock: 7,
      price: 'Rs 50',
      taxonomies: 'Sale',
      type: 'Sale',
      views: 15,
      date: '25.12.2020',
      image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
      id: 5,
      name: 'Potato Chips',
      sku: 'DSBD02',
      status: 'Published',
      stock: 7,
      price: 'Rs 50',
      taxonomies: 'Sale',
      type: 'Sale',
      views: 15,
      date: '25.12.2020',
      image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Image</Text>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>SKU</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>Stock</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
          <Text style={styles.tableHeaderText}>Taxonomies</Text>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Views</Text>
          <Text style={styles.tableHeaderText}>Date</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton}>
              <Edit width={50} height={50} /> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
              <Delete width={50} height={50} /> 
              </TouchableOpacity>
            </View>

            {/* Image */}
            <Image source={item.image} style={styles.productImage} />

            {/* Product Data */}
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.sku}</Text>
            <Text style={styles.tableCell}>{item.status}</Text>
            <Text style={styles.tableCell}>{item.stock}</Text>
            <Text style={styles.tableCell}>{item.price}</Text>
            <Text style={styles.tableCell}>{item.taxonomies}</Text>
            <Text style={styles.tableCell}>{item.type}</Text>
            <Text style={styles.tableCell}>{item.views}</Text>
            <Text style={styles.tableCell}>{item.date}</Text>
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
    padding: wp(3),                // Responsive padding
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.2),      // Responsive vertical padding
    paddingHorizontal: wp(2),      // Responsive horizontal padding
  },
  tableHeaderText: {
    width: wp(22.99),                 // Responsive width to align columns
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(16),        // Responsive font size
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),      // Responsive vertical padding
    borderBottomWidth: wp(0.3),    // Responsive border width
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(26),                 // Responsive width for the actions column
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize(15),        // Responsive font size
  },
  productImage: {
    width: wp(12),                 // Responsive image width
    height: wp(12),                // Responsive image height
    marginHorizontal: wp(2.5),     // Responsive horizontal margin
  },
  tableCell: {
    width: wp(24),                 // Responsive width to match header
    textAlign: 'center',
    fontSize: FontSize(15),        // Responsive font size
  },

});

export default Data;
