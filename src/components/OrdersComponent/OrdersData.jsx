import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

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
    padding: wp(2.5), // Responsive padding
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.2), // Responsive vertical padding
    paddingHorizontal: wp(2), // Responsive horizontal padding
  },
  tableHeaderText: {
    width: wp(22), // Adjusted responsive width for header alignment
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(14), // Responsive font size
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2), // Responsive vertical padding
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(22), // Responsive width for actions column
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#fff',
  },
  productImage: {
    width: wp(12), // Responsive image width
    height: hp(6), // Responsive image height
    marginHorizontal: wp(2.5), // Responsive margin
  },
  tableCell: {
    width: wp(23), // Responsive width to match header
    textAlign: 'center',
    fontSize: FontSize(12), // Responsive font size
  },
});

export default OrdersData;
