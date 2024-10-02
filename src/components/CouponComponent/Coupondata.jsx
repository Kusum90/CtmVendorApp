import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput, Button } from 'react-native';
import axios from 'axios'; // Import Axios
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';

// Main Screen Component
const Coupondata = () => {
  const [inventoryData, setInventoryData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const [editModalVisible, setEditModalVisible] = useState(false); // State to manage modal visibility
  const [selectedCoupon, setSelectedCoupon] = useState(null); // State for selected coupon
  const [editData, setEditData] = useState({
    couponCode: '',
    discountType: '',
    couponAmount: '',
    usageLimitPerCoupon: '',
    expiry: ''
  }); // State for editing coupon data

  useEffect(() => {
    fetchCoupons(); // Fetch coupons when component mounts
  }, []);

  // Fetch coupon data
  const fetchCoupons = () => {
    axios.get('https://cm-backend-yk2y.onrender.com/user/coupons')
      .then((response) => {
        setInventoryData(response.data.coupons); // Assuming coupons are in response.data.coupons
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even if there’s an error
      });
  };

  // Handle delete coupon
  const handleDeleteCoupon = (couponId) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this coupon?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            // Call backend to delete the coupon
            axios.delete(`https://cm-backend-yk2y.onrender.com/user/coupon/${couponId}`)
              .then((response) => {
                console.log(response.data.message); // Log success message
                // Remove the deleted coupon from the state
                setInventoryData(inventoryData.filter(coupon => coupon._id !== couponId));
                Alert.alert("Success", "Coupon deleted successfully.");
              })
              .catch((error) => {
                console.error("Error deleting coupon:", error);
                Alert.alert("Error", "Failed to delete the coupon.");
              });
          }
        }
      ]
    );
  };

  // Handle edit coupon (Open modal)
  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon._id);
    setEditData({
      couponCode: coupon.couponCode,
      discountType: coupon.discountType,
      couponAmount: coupon.couponAmount.toString(),
      usageLimitPerCoupon: coupon.usageLimitPerCoupon.toString(),
      expiry: formatDate(coupon.expiry)
    });
    setEditModalVisible(true); // Open modal for editing
  };

  // Handle save after editing
  const handleSaveEdit = () => {
    axios.put(`https://cm-backend-yk2y.onrender.com/user/coupon/${selectedCoupon}`, editData)
      .then((response) => {
        console.log(response.data.message); // Log success message
        fetchCoupons(); // Refresh the coupon list after editing
        setEditModalVisible(false); // Close the modal
        Alert.alert("Success", "Coupon updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating coupon:", error);
        Alert.alert("Error", "Failed to update the coupon.");
      });
  };

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
              <TouchableOpacity style={styles.actionButton} onPress={() => handleEditCoupon(item)}>
                <Edit width={20} height={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteCoupon(item._id)} // Delete button handler
              >
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

        {/* Edit Modal */}
        <Modal visible={editModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Coupon</Text>
            <TextInput
              style={styles.input}
              placeholder="Coupon Code"
              value={editData.couponCode}
              onChangeText={(text) => setEditData({ ...editData, couponCode: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Discount Type"
              value={editData.discountType}
              onChangeText={(text) => setEditData({ ...editData, discountType: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Coupon Amount"
              keyboardType="numeric"
              value={editData.couponAmount}
              onChangeText={(text) => setEditData({ ...editData, couponAmount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Usage Limit"
              keyboardType="numeric"
              value={editData.usageLimitPerCoupon}
              onChangeText={(text) => setEditData({ ...editData, usageLimitPerCoupon: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (YYYY-MM-DD)"
              value={editData.expiry}
              onChangeText={(text) => setEditData({ ...editData, expiry: text })}
            />
            <Button title="Save" onPress={handleSaveEdit} />
            <Button title="Cancel" color="red" onPress={() => setEditModalVisible(false)} />
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Coupondata;
