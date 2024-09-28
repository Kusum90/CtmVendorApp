import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';

// Main Screen Component
const CustomersData = () => {
  const inventoryData = [
    {
        id: 1,
        Name:'Jane Cooper',
        username: 'Jane34',
        email: 'janecooper@gmail.com',
        location:'6391 Elgin St. Celina',
        Orders: '5',
        MoneySpent: 'Rs 45',
        Lastorder:'#34498' ,
    
    },
    {
      id: 2,
      id: 1,
        Name:'Jane Cooper',
        username: 'Jane34',
        email: 'janecooper@gmail.com',
        location:'6391 Elgin St. Celina',
        Orders: '5',
        MoneySpent: 'Rs 45',
        Lastorder:'#34498' 
      
    },
    {
        id: 3,
        id: 1,
        Name:'Jane Cooper',
        username: 'Jane34',
        email: 'janecooper@gmail.com',
        location:'6391 Elgin St. Celina',
        Orders: '5',
        MoneySpent: 'Rs 45',
        Lastorder:'#34498' 
        
    },
    {
        id: 4,
        id: 1,
        Name:'Jane Cooper',
        username: 'Jane34',
        email: 'janecooper@gmail.com',
        location:'6391 Elgin St. Celina',
        Orders: '5',
        MoneySpent: 'Rs 45',
        Lastorder:'#34498' 
        
    },
    {
        id: 5,
        id: 1,
        Name:'Jane Cooper',
        username: 'Jane34',
        email: 'janecooper@gmail.com',
        location:'6391 Elgin St. Celina',
        Orders: '5',
        MoneySpent: 'Rs 45',
        Lastorder:'#34498' 
    
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Name </Text>
          <Text style={styles.tableHeaderText}>User Name</Text>
          <Text style={styles.tableHeaderText}>Email</Text>
          <Text style={styles.tableHeaderText}>Location</Text>
          <Text style={styles.tableHeaderText}>Orders</Text>
          <Text style={styles.tableHeaderText}>Money Spent</Text>
          <Text style={styles.tableHeaderText}>Last Order</Text>
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
            <Text style={styles.tableCell}>{item.Name}</Text>
            <Text style={styles.tableCell}>{item.username}</Text>
            <Text style={styles.tableCell}>{item.email}</Text>
            <Text style={styles.tableCell}>{item.location}</Text>
            <Text style={styles.tableCell}>{item.Orders}</Text>
            <Text style={styles.tableCell}>{item.MoneySpent}</Text>
            <Text style={styles.tableCell}>{item.Lastorder}</Text>
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

export default CustomersData;
