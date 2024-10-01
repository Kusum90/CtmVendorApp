import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';

// Main Screen Component
const LedgerData = () => {
  const inventoryData = [
    {
        id: 1,
        Type:'Order',
        Detail: 'Earning for BARLEY DALIA 500 GM Order #34498',
        Credit: 'Rs 500',
        Debit:'Rs 0',
        Date: '12-05-2024',
    
    },
    {
        id: 2,
        Type:'Order',
        Detail: 'Earning for BARLEY DALIA 500 GM Order #34498',
        Credit: 'Rs 500',
        Debit:'Rs 0',
        Date: '12-05-2024',
      
    },
    {
        id: 3,
        Type:'Order',
        Detail: 'Earning for BARLEY DALIA 500 GM Order #34498',
        Credit: 'Rs 500',
        Debit:'Rs 0',
        Date: '12-05-2024',
        
    },
    {
        id: 4,
        Type:'Order',
        Detail: 'Earning for BARLEY DALIA 500 GM Order #34498',
        Credit: 'Rs 500',
        Debit:'Rs 0',
        Date: '12-05-2024',
        
    },
    {
        id: 5,
        Type:'Order',
        Detail: 'Earning for BARLEY DALIA 500 GM Order #34498',
        Credit: 'Rs 500',
        Debit:'Rs 0',
        Date: '12-05-2024',
    
    },
    {
        id: 6,
        Type:'Order',
        Detail: 'Earning for BARLEY DALIA 500 GM Order #34498',
        Credit: 'Rs 500',
        Debit:'Rs 0',
        Date: '12-05-2024',
    
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Type </Text>
          <Text style={styles.tableHeaderText}>Details</Text>
          <Text style={styles.tableHeaderText}>Credit</Text>
          <Text style={styles.tableHeaderText}>Usage Debit</Text>
          <Text style={styles.tableHeaderText}>Date</Text>
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
            <Text style={styles.tableCell}>{item.Detail}</Text>
            <Text style={styles.tableCell}>{item.Credit}</Text>
            <Text style={styles.tableCell}>{item.Debit}</Text>
            <Text style={styles.tableCell}>{item.Date}</Text>
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

export default LedgerData;
