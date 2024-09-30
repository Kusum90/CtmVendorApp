import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';

// Main Screen Component
const PaymentData = () => {
  const inventoryData = [
    {
      id: 1,
      invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
    },
    {
      id: 2,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
    },
    {
      id: 3,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
    },
    {
      id: 4,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
    },
    {
      id: 5,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
    },
    {
    id: 6,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
  },
  {
    id: 7,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
  },
  {
    id: 8,
       invoice: '#0957746KJLY',
      orderid: '11211245',
      amount: 'Rs 45',
      Charges: 'Rs 45',
      payment: '17.08kb',
      mode: 'NEFT',
      NOTE: 'Good',
      date: '12.05.2024',
  },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Invoice ID</Text>
          <Text style={styles.tableHeaderText}>Order ID</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
          <Text style={styles.tableHeaderText}>Charges</Text>
          <Text style={styles.tableHeaderText}>Payment</Text>
          <Text style={styles.tableHeaderText}>Mode</Text>
          <Text style={styles.tableHeaderText}>Note</Text>
          <Text style={styles.tableHeaderText}>Date</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton}>
              <Seen width={50} height={50} /> 
              </TouchableOpacity>
            </View>
            {/* Product Data */}
            <Text style={styles.tableCell}>{item.invoice}</Text>
            <Text style={styles.tableCell}>{item.orderid}</Text>
            <Text style={styles.tableCell}>{item.amount}</Text>
            <Text style={styles.tableCell}>{item.Charges}</Text>
            <Text style={styles.tableCell}>{item.payment}</Text>
            <Text style={styles.tableCell}>{item.mode}</Text>
            <Text style={styles.tableCell}>{item.NOTE}</Text>
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

export default PaymentData;
