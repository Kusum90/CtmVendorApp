import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

// Main Screen Component
const FollowersData = () => {
  const inventoryData = [
    {
        id: 1,
        Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    },
    {
        id: 2,
        Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
      
    },
    {
        id: 3,
         Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    },
    {
        id: 4,
         Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    },
    {
        id: 5,
        Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    
    },
    {
        id: 6,
        Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    
    },
    {
        id: 7,
        Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    
    },
    {
        id: 8,
        Name:'Savio Demo Customer',
        Email: 'indiaglobalinfotech@gmail.com',
    
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
          <Text style={styles.tableHeaderText}>Email</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.deleteButton}>
              <Delete width={50} height={50} /> 
              </TouchableOpacity>
            </View>

            
            {/* Product Data */}
            <Text style={styles.tableCell}>{item.Name}</Text>
            <Text style={styles.tableCell}>{item.Email}</Text>
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
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(2), // Responsive vertical padding
    paddingHorizontal: wp(3), // Responsive horizontal padding
    borderBottomWidth: hp(0.15), // Responsive border width
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: FontSize(14), // Responsive font size
    paddingHorizontal: wp(3), // Responsive horizontal padding
    flex: 1, // Ensure equal spacing
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2.5), // Responsive vertical padding
    borderBottomWidth: hp(0.15), // Responsive border width
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(20), // Responsive width for actions container
    alignItems: 'center',
  },
  tableCell: {
    fontSize: FontSize(14), // Responsive font size
    textAlign: 'left',
    paddingHorizontal: wp(3), // Responsive horizontal padding
    flex: 1, // Equal spacing for table cells
  },
  deleteButton: {
    width: wp(12), // Responsive width
    height: hp(6), // Responsive height
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsColumn: {
    width: wp(20), // Consistent width for actions column
  },
});
export default FollowersData;
