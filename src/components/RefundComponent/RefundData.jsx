import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

// Main Screen Component
const RefundData = () => {
  const inventoryData = [
    {
        id: 1,
        Requestid:'0957746KJLY',
        orderid: '11214521245',
        amount: 'Rs 500',
        type:'Dress Material',
        reason: 'Quality Issues',
        Date: '12-05-2024',
    
    },
    {
      id: 2,
      Requestid:'0957746KJLY',
        orderid: '11214521245',
        amount: 'Rs 500',
        type:'Dress Material',
        reason: 'Quality Issues',
        Date: '12-05-2024', 
      
    },
    {
        id: 3,
        Requestid:'0957746KJLY',
        orderid: '11214521245',
        amount: 'Rs 500',
        type:'Dress Material',
        reason: 'Quality Issues',
        Date: '12-05-2024', 
        
    },
    {
        id: 4,
        Requestid:'0957746KJLY',
        orderid: '11214521245',
        amount: 'Rs 500',
        type:'Dress Material',
        reason: 'Quality Issues',
        Date: '12-05-2024', 
        
    },
    {
        id: 5,
        Requestid:'0957746KJLY',
        orderid: '11214521245',
        amount: 'Rs 500',
        type:'Dress Material',
        reason: 'Quality Issues',
        Date: '12-05-2024', 
    
    },
    {
      id: 6,
      Requestid:'0957746KJLY',
      orderid: '11214521245',
      amount: 'Rs 500',
      type:'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024', 
  
  },
  {
    id: 7,
    Requestid:'0957746KJLY',
    orderid: '11214521245',
    amount: 'Rs 500',
    type:'Dress Material',
    reason: 'Quality Issues',
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
          <Text style={styles.tableHeaderText}>Request ID </Text>
          <Text style={styles.tableHeaderText}>Order ID</Text>
          <Text style={styles.tableHeaderText}>Amount</Text>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Reason</Text>
          <Text style={styles.tableHeaderText}> Date</Text>
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
            <Text style={styles.tableCell}>{item.Requestid}</Text>
            <Text style={styles.tableCell}>{item.orderid}</Text>
            <Text style={styles.tableCell}>{item.amount}</Text>
            <Text style={styles.tableCell}>{item.type}</Text>
            <Text style={styles.tableCell}>{item.reason}</Text>
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
    padding: wp(2.5), // Responsive padding
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.25), // Responsive padding vertical
    paddingHorizontal: wp(1.25), // Responsive padding horizontal
  },
  tableHeaderText: {
    width: wp(22), // Responsive width to align columns properly
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(14), // Responsive font size
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.25), // Responsive padding vertical
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(22), // Responsive width
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize(14), // Responsive font size
  },
  productImage: {
    width: wp(12.5), // Responsive width for image
    height: wp(12.5), // Responsive height (same as width for square)
    marginHorizontal: wp(2.5), // Responsive margin horizontal
  },
  tableCell: {
    width: wp(23), // Responsive width to match the header
    textAlign: 'center',
    fontSize: FontSize(12), // Responsive font size
  },
});
export default RefundData;
