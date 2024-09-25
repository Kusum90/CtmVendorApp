import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Seen from '../../assets/svg/Productsvg/Seen';

// Main Screen Component
const OrdersData = () => {
  const inventoryData = [
    {
        id: 1,
        OrderId:'0957746KJLY',
        Productname: 'Potato Chips',
        status: 'Paid',
        quantity:'5',
        Totalvalue: 'Rs 50',
        date: '25.12.2020',
        image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
      id: 2,
       OrderId:'0957746KJLY',
      Productname: 'Potato Chips',
      status: 'Paid',
      quantity:'5',
      Totalvalue: 'Rs 50',
      date: '25.12.2020',
      image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
        id: 3,
         OrderId:'0957746KJLY',
        Productname: 'Potato Chips',
        status: 'Paid',
        quantity:'5',
        Totalvalue: 'Rs 50',
        date: '25.12.2020',
        image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
        id: 4,
         OrderId:'0957746KJLY',
        Productname: 'Potato Chips',
        status: 'Paid',
        quantity:'5',
        Totalvalue: 'Rs 50',
        date: '25.12.2020',
        image: require('../../assets/images/ProductScreenImages/product1.png'), // Change this path to actual image
    },
    {
        id: 5,
         OrderId:'0957746KJLY',
        Productname: 'Potato Chips',
        status: 'Paid',
        quantity:'5',
        Totalvalue: 'Rs 50',
        date: '25.12.2020',
        image: require('../../assets/images/ProductScreenImages/product1.png'),// Change this path to actual image
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Order ID</Text>
          <Text style={styles.tableHeaderText}>Order Date</Text>
          <Text style={styles.tableHeaderText}>Image</Text>
          <Text style={styles.tableHeaderText}>Product Name</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Total Order Value</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.deleteButton}>
              <Seen width={50} height={50} /> 
              </TouchableOpacity>
            </View>

            
            {/* Product Data */}
            <Text style={styles.tableCell}>{item.OrderId}</Text>
            <Text style={styles.tableCell}>{item.date}</Text>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.tableCell}>{item.Productname}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.Totalvalue}</Text>
            <Text style={styles.tableCell}>{item.status}</Text>
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
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    width: 85, // Adjust the width to align columns properly
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

export default OrdersData;
