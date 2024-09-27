import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import Axios
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';

// Main Screen Component
const Coupondata = () => {
  const [inventoryData, setInventoryData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading spinner

  useEffect(() => {
    // Fetch coupon data from API when component mounts
    axios.get('https://cm-backend-yk2y.onrender.com/user/coupons')
      .then((response) => {
        setInventoryData(response.data.coupons); // Assuming coupons are in response.data.coupons
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even if there’s an error
      });
  }, []);

  // Helper function to format the expiry date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        {/* Header Row */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Actions</Text>
          <Text style={styles.tableHeaderText}>Code</Text>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Amount (Rs)</Text>
          <Text style={styles.tableHeaderText}>Usage Limit</Text>
          <Text style={styles.tableHeaderText}>Expiry Date</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
        </View>

        {/* Data Rows */}
        {inventoryData.map((item) => (
          <View key={item._id} style={styles.tableRow}>
            {/* Actions (Edit/Delete Buttons) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Edit width={20} height={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Delete width={20} height={20} />
              </TouchableOpacity>
            </View>

            {/* Coupon Data */}
            <Text style={styles.tableCell}>{item.couponCode}</Text>
            <Text style={styles.tableCell}>{item.discountType}</Text>
            <Text style={styles.tableCell}>{`Rs ${item.couponAmount}`}</Text>
            <Text style={styles.tableCell}>{item.usageLimitPerCoupon}</Text>
            <Text style={styles.tableCell}>{formatDate(item.expiry)}</Text>
            <Text style={styles.tableCell}>{item.action}</Text>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    width: 100, // Adjust width to ensure alignment
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: 100, // Same width as headers for consistent alignment
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 5,
  },
  tableCell: {
    width: 100, // Same width as headers
    textAlign: 'center',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 30, // Ensures vertical centering
  },
});

export default Coupondata;
