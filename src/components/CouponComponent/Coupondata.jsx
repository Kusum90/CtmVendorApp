import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';


// Main Screen Component
const Coupondata = () => {
  const inventoryData = [
    {
        id: 1,
        code:'0957746KJLY',
        Type: 'Fixed Product',
        status: 'Active',
        Amount:'Rs 1000',
        UsageLimit: '10',
        expirydate: '25.12.2020',
    
    },
    {
      id: 2,
      code:'0957746KJLY',
        Type: 'Fixed Product',
        status: 'Active',
        Amount:'Rs 1000',
        UsageLimit: '10',
        expirydate: '25.12.2020',
      
    },
    {
        id: 3,
        code:'0957746KJLY',
        Type: 'Fixed Product',
        status: 'Active',
        Amount:'Rs 1000',
        UsageLimit: '10',
        expirydate: '25.12.2020',
        
    },
    {
        id: 4,
        code:'0957746KJLY',
        Type: 'Fixed Product',
        status: 'Active',
        Amount:'Rs 1000',
        UsageLimit: '10',
        expirydate: '25.12.2020',
        
    },
    {
        id: 5,
        code:'0957746KJLY',
        Type: 'Fixed Product',
        status: 'Active',
        Amount:'Rs 1000',
        UsageLimit: '10',
        expirydate: '25.12.2020',
    
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Code </Text>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
          <Text style={styles.tableHeaderText}>Usage Limit</Text>
          <Text style={styles.tableHeaderText}>Expiry Date</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.deleteButton}>
              <Edit width={50} height={50} /> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
              <Delete width={50} height={50} /> 
              </TouchableOpacity>
            </View>

            
            {/* Product Data */}
            <Text style={styles.tableCell}>{item.code}</Text>
            <Text style={styles.tableCell}>{item.Type}</Text>
            <Text style={styles.tableCell}>{item.Amount}</Text>
            <Text style={styles.tableCell}>{item.UsageLimit}</Text>
            <Text style={styles.tableCell}>{item.expirydate}</Text>
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

export default Coupondata;