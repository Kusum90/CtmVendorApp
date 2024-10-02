import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

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
    padding: wp(4), // Responsive padding
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.5), // Responsive vertical padding
    paddingHorizontal: wp(2), // Responsive horizontal padding
  },
  tableHeaderText: {
    width: wp(22), // Responsive width for aligning columns
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(14), // Responsive font size
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5), // Responsive vertical padding
    borderBottomWidth: wp(0.3), // Responsive border width
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(22), // Responsive width for action container
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize(12), // Responsive font size for buttons
  },
  productImage: {
    width: wp(12), // Responsive width for product image
    height: wp(12), // Responsive height for product image
    marginHorizontal: wp(2), // Responsive horizontal margin
  },
  tableCell: {
    width: wp(24), // Responsive width for table cell
    textAlign: 'center',
    fontSize: FontSize(12), // Responsive font size for table cell
  },
});
export default LedgerData;
