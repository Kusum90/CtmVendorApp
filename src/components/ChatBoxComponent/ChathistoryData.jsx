import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import Seen from '../../assets/svg/Productsvg/Seen';

// Main Screen Component
const ChathistoryData = () => {
  const inventoryData = [
    {
        id: 1,
        User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    },
    {
        id: 2,
        User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
      
    },
    {
        id: 3,
         User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    },
    {
        id: 4,
         User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    },
    {
        id: 5,
        User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    
    },
    {
        id: 6,
        User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    
    },
    {
        id: 7,
        User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    
    },
    {
        id: 8,
        User:'Anwesh',
        Email: 'anweshkumar@gmail.com',
        totalmessages:'4',
        duration:'02:17:12',
        evaluation:'-',
        date:'August 30,2024'
    
    },
    // Add more data as needed
  ];

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>User </Text>
          <Text style={styles.tableHeaderText}>Email</Text>
          <Text style={styles.tableHeaderText}>Total Message</Text>
          <Text style={styles.tableHeaderText}>Duration</Text>
          <Text style={styles.tableHeaderText}>Evaluation</Text>
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
            <Text style={styles.tableCell}>{item.User}</Text>
            <Text style={styles.tableCell}>{item.Email}</Text>
            <Text style={styles.tableCell}>{item.totalmessages}</Text>
            <Text style={styles.tableCell}>{item.duration}</Text>
            <Text style={styles.tableCell}>{item.evaluation}</Text>
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
      actionsColumn: {
        width: 80, // Consistent width for the actions column
      },
});

export default ChathistoryData;
