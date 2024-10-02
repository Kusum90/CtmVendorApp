import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

// Main Screen Component
const SupportData = () => {
  const inventoryData = [
    {
        id: 1,
        Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
    
    },
    {
        id: 2,
        Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
      
    },
    {
        id: 3,
         Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
    },
    {
        id: 4,
         Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
    },
    {
        id: 5,
        Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
    
    },
    {
        id: 6,
        Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
    
    },
    {
        id: 7,
        Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
        Date: '12-05-2024',
    
    },
    {
        id: 8,
        Ticket:'#000002',
        category: 'Wrong Item Received',
        Issues: 'Test',
        Item:'BARLEY DALIA...',
        customer:'Anwesh',
        Priority:'Normal',
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
          <Text style={styles.tableHeaderText}>Ticket </Text>
          <Text style={styles.tableHeaderText}>Category</Text>
          <Text style={styles.tableHeaderText}>Issues</Text>
          <Text style={styles.tableHeaderText}>Item</Text>
          <Text style={styles.tableHeaderText}>Customer</Text>
          <Text style={styles.tableHeaderText}>Priority</Text>
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
              <TouchableOpacity style={styles.deleteButton}>
              <Delete width={50} height={50} /> 
              </TouchableOpacity>
            </View>

            
            {/* Product Data */}
            <Text style={styles.tableCell}>{item.Ticket}</Text>
            <Text style={styles.tableCell}>{item.category}</Text>
            <Text style={styles.tableCell}>{item.Issues}</Text>
            <Text style={styles.tableCell}>{item.Item}</Text>
            <Text style={styles.tableCell}>{item.customer}</Text>
            <Text style={styles.tableCell}>{item.Priority}</Text>
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
        padding: wp(3), // Responsive padding
      },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        paddingVertical: hp(2), // Responsive vertical padding
        paddingHorizontal: wp(2), // Responsive horizontal padding
      },
      tableHeaderText: {
        width: wp(23), // Adjust the width responsively
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: FontSize(17), // Responsive font size
      },
      tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(2), // Responsive vertical padding
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      actionsContainer: {
        width: wp(21.8), // Adjust the width responsively
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      buttonText: {
        color: '#fff',
      },
      productImage: {
        width: wp(12), // Responsive width
        height: wp(12), // Responsive height
        marginHorizontal: wp(2), // Responsive margin
      },
      tableCell: {
        width: wp(24), // Adjust the width responsively
        textAlign: 'center',
        fontSize: FontSize(15), // Responsive font size
      },
    });

export default SupportData;
