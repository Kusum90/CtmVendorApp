
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput, Button } from 'react-native';
// import axios from 'axios'; // Import Axios
// import Edit from '../../assets/svg/Productsvg/Edit';
// import Delete from '../../assets/svg/Productsvg/Delete';

// // Main Screen Component
// const Coupondata = () => {
//   const [inventoryData, setInventoryData] = useState([]); // State to store fetched data
//   const [loading, setLoading] = useState(true); // State to manage loading spinner
//   const [editModalVisible, setEditModalVisible] = useState(false); // State to manage modal visibility
//   const [selectedCoupon, setSelectedCoupon] = useState(null); // State for selected coupon
//   const [editData, setEditData] = useState({
//     couponCode: '',
//     discountType: '',
//     couponAmount: '',
//     usageLimitPerCoupon: '',
//     expiry: ''
//   }); // State for editing coupon data

//   useEffect(() => {
//     fetchCoupons(); // Fetch coupons when component mounts
//   }, []);

//   // Fetch coupon data
//   const fetchCoupons = () => {
//     axios.get('https://cm-backend-yk2y.onrender.com/user/coupons')
//       .then((response) => {
//         setInventoryData(response.data.coupons); // Assuming coupons are in response.data.coupons
//         setLoading(false); // Stop loading
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false); // Stop loading even if there’s an error
//       });
//   };

//   // Handle delete coupon
//   const handleDeleteCoupon = (couponId) => {
//     Alert.alert(
//       "Delete Confirmation",
//       "Are you sure you want to delete this coupon?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         {
//           text: "Delete",
//           onPress: () => {
//             // Call backend to delete the coupon
//             axios.delete(`https://cm-backend-yk2y.onrender.com/user/coupon/${couponId}`)
//               .then((response) => {
//                 console.log(response.data.message); // Log success message
//                 // Remove the deleted coupon from the state
//                 setInventoryData(inventoryData.filter(coupon => coupon._id !== couponId));
//                 Alert.alert("Success", "Coupon deleted successfully.");
                
//                 // Refresh the page by fetching the coupons again
//                 fetchCoupons(); // Re-fetch the coupons to reflect the updated data
//               })
//               .catch((error) => {
//                 console.error("Error deleting coupon:", error);
//                 Alert.alert("Error", "Failed to delete the coupon.");
//               });
//           }
//         }
//       ]
//     );
//   };
  

//   // Handle edit coupon (Open modal)
//   const handleEditCoupon = (coupon) => {
//     setSelectedCoupon(coupon._id);
//     setEditData({
//       couponCode: coupon.couponCode,
//       discountType: coupon.discountType,
//       couponAmount: coupon.couponAmount.toString(), // Convert to string
//       usageLimitPerCoupon: coupon.usageLimitPerCoupon.toString(), // Convert to string
//       expiry: formatDate(coupon.expiry) // Format date to string 'YYYY-MM-DD'
//     });
//     setEditModalVisible(true); // Open modal for editing
//   };

//   // Handle save after editing
//   const handleSaveEdit = () => {
//     // Log each field's value and type before sending the request
//     console.log("couponCode:", editData.couponCode, "Type:", typeof editData.couponCode);
//     console.log("discountType:", editData.discountType, "Type:", typeof editData.discountType);
//     console.log("couponAmount:", editData.couponAmount, "Type:", typeof editData.couponAmount);
//     console.log("usageLimitPerCoupon:", editData.usageLimitPerCoupon, "Type:", typeof editData.usageLimitPerCoupon);
//     console.log("expiry:", editData.expiry, "Type:", typeof editData.expiry);

//     // Prepare the data to match backend expectations
//     const updatedData = {
//       couponCode: editData.couponCode.trim(), // String
//       discountType: editData.discountType.trim(), // String
//       couponAmount: editData.couponAmount.toString(), // Ensure couponAmount is a string
//       usageLimitPerCoupon: Number(editData.usageLimitPerCoupon), // Convert to number
//       expiry: editData.expiry.trim(), // String in 'YYYY-MM-DD' format
//     };

//     // Log the final data before sending it to the backend
//     console.log("Final Updated Data being sent to backend:", updatedData);

//     // Send the PUT request
//     axios.put(`https://cm-backend-yk2y.onrender.com/user/coupon/${selectedCoupon}`, updatedData)
//       .then((response) => {
//         console.log(response.data.message); // Log success message
//         fetchCoupons(); // Refresh the coupon list after editing
//         setEditModalVisible(false); // Close the modal
//         Alert.alert("Success", "Coupon updated successfully.");
//       })
//       .catch((error) => {
//         console.error("Error updating coupon:", error);
//         if (error.response) {
//           console.log("Axios error details:", error.response.data); // Log backend error response
//         }
//         Alert.alert("Error", "Failed to update the coupon.");
//       });
//   };

//   // Helper function to format the expiry date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
//   }

//   return (
//     <ScrollView style={styles.container} horizontal>
//       <View>
//         {/* Header Row */}
//         <View style={styles.tableHeader}>
//           <Text style={styles.tableHeaderText}>Actions</Text>
//           <Text style={styles.tableHeaderText}>Code</Text>
//           <Text style={styles.tableHeaderText}>Type</Text>
//           <Text style={styles.tableHeaderText}>Amount (Rs)</Text>
//           <Text style={styles.tableHeaderText}>Usage Limit</Text>
//           <Text style={styles.tableHeaderText}>Expiry Date</Text>
//           <Text style={styles.tableHeaderText}>Status</Text>
//         </View>

//         {/* Data Rows */}
//         {inventoryData.map((item) => (
//           <View key={item._id} style={styles.tableRow}>
//             {/* Actions (Edit/Delete Buttons) */}
//             <View style={styles.actionsContainer}>
//               <TouchableOpacity style={styles.actionButton} onPress={() => handleEditCoupon(item)}>
//                 <Edit width={20} height={20} />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.actionButton}
//                 onPress={() => handleDeleteCoupon(item._id)} // Delete button handler
//               >
//                 <Delete width={20} height={20} />
//               </TouchableOpacity>
//             </View>

//             {/* Coupon Data */}
//             <Text style={styles.tableCell}>{item.couponCode}</Text>
//             <Text style={styles.tableCell}>{item.discountType}</Text>
//             <Text style={styles.tableCell}>{`Rs ${item.couponAmount}`}</Text>
//             <Text style={styles.tableCell}>{item.usageLimitPerCoupon}</Text>
//             <Text style={styles.tableCell}>{formatDate(item.expiry)}</Text>
//             <Text style={styles.tableCell}>{item.action}</Text>
//           </View>
//         ))}

//         {/* Edit Modal */}
//         <Modal visible={editModalVisible} animationType="slide">
//           <ScrollView style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Edit Coupon</Text>

//             <Text style={styles.label}>Coupon Code</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Coupon Code"
//               value={editData.couponCode}
//               onChangeText={(text) => setEditData({ ...editData, couponCode: text })}
//             />

//             <Text style={styles.label}>Discount Type</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Discount Type"
//               value={editData.discountType}
//               onChangeText={(text) => setEditData({ ...editData, discountType: text })}
//             />

//             <Text style={styles.label}>Coupon Amount</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Coupon Amount"
//               keyboardType="numeric"
//               value={editData.couponAmount}
//               onChangeText={(text) => setEditData({ ...editData, couponAmount: text })}
//             />

//             <Text style={styles.label}>Usage Limit</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Usage Limit"
//               keyboardType="numeric"
//               value={editData.usageLimitPerCoupon}
//               onChangeText={(text) => setEditData({ ...editData, usageLimitPerCoupon: text })}
//             />

//             <Text style={styles.label}>Expiry Date (YYYY-MM-DD)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Expiry Date (YYYY-MM-DD)"
//               value={editData.expiry}
//               onChangeText={(text) => setEditData({ ...editData, expiry: text })}
//             />

//             <Button title="Save" onPress={handleSaveEdit} />
//             <Button title="Cancel" color="red" onPress={() => setEditModalVisible(false)} />
//           </ScrollView>
//         </Modal>
//       </View>
//     </ScrollView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#e0e0e0',
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   tableHeaderText: {
//     width: 100, // Adjust width to ensure alignment
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   actionsContainer: {
//     width: 100, // Same width as headers for consistent alignment
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   actionButton: {
//     marginHorizontal: 5,
//   },
//   tableCell: {
//     width: 100, // Same width as headers
//     textAlign: 'center',
//     fontSize: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     lineHeight: 30, // Ensures vertical centering
//   },
//   modalContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   label: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default Coupondata;






import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  FlatList
} from 'react-native';
import axios from 'axios'; // Import Axios
import Edit from '../../assets/svg/Productsvg/Edit'; // Assuming you have Edit icon as SVG
import Delete from '../../assets/svg/Productsvg/Delete'; // Assuming you have Delete icon as SVG
import Plus from '../../assets/svg/Productsvg/Plus';
import { useNavigation } from '@react-navigation/native';
import CommonCalendar from '../../utils/datepicker';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const Coupondata = () => {
  const navigation = useNavigation();
  const [inventoryData, setInventoryData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
  const [editModalVisible, setEditModalVisible] = useState(false); // State to manage modal visibility
  const [selectedCoupon, setSelectedCoupon] = useState(null); // State for selected coupon
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Calendar modal visibility
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Filter by');
  
  const [editData, setEditData] = useState({
    couponCode: '',
    discountType: '',
    couponAmount: '',
    usageLimitPerCoupon: '',
    expiry: '',
  }); // State for editing coupon data
  const filters = ['Percentage', 'Percentage Discount', 'Fixed Product Discount'];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setModalVisible(false); // Close the modal after selection
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  useEffect(() => {
    fetchCoupons(); // Fetch coupons when component mounts
  }, []);

  useEffect(() => {
    let filtered = inventoryData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((coupon) =>
        coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter(
        (coupon) =>
          new Date(coupon.createdAt).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
    }


    setFilteredCoupons(filtered);
  }, [searchTerm, selectedDate, inventoryData]);
  
  

  // Fetch coupon data
  const fetchCoupons = () => {
    axios
      .get('https://cm-backend-yk2y.onrender.com/user/coupons')
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
      'Delete Confirmation',
      'Are you sure you want to delete this coupon?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            axios
              .delete(`https://cm-backend-yk2y.onrender.com/user/coupon/${couponId}`)
              .then((response) => {
                console.log(response.data.message); // Log success message
                setInventoryData(inventoryData.filter((coupon) => coupon._id !== couponId));
                Alert.alert('Success', 'Coupon deleted successfully.');
              })
              .catch((error) => {
                console.error('Error deleting coupon:', error);
                Alert.alert('Error', 'Failed to delete the coupon.');
              });
          },
        },
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
      expiry: formatDate(coupon.expiry),
    });
    setEditModalVisible(true); // Open modal for editing
  };

  // Handle save after editing
  const handleSaveEdit = () => {
    const updatedData = {
      couponCode: editData.couponCode.trim(),
      discountType: editData.discountType.trim(),
      couponAmount: editData.couponAmount,
      usageLimitPerCoupon: Number(editData.usageLimitPerCoupon),
      expiry: editData.expiry.trim(),
    };

    axios
      .put(`https://cm-backend-yk2y.onrender.com/user/coupon/${selectedCoupon}`, updatedData)
      .then((response) => {
        console.log(response.data.message); // Log success message
        setEditModalVisible(false); // Close the modal
        fetchCoupons(); // Re-fetch the coupons to reflect updated data
      })
      .catch((error) => {
        console.error('Error updating coupon:', error);
        Alert.alert('Error', 'Failed to update the coupon.');
      });
  };

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  // Filter inventory data based on search term
  // const filteredCoupons = inventoryData.filter((coupon) =>
  //   coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <View style={styles.container}>

<View style={styles.headerContainer}>
        {/* Inventory Title */}
        <Text style={styles.title}>Coupons</Text>

        {/* Buttons on the right */}
        <View style={styles.buttonsContainer}>
          {/* Green Button */}
          <TouchableOpacity
            style={[styles.iconButton, styles.greenButton]}
            onPress={() => navigation.navigate('AddCoupon')}
          >
            <Plus width={50} height={50} />
          </TouchableOpacity>

        </View>
      </View>

      {/* Filter and Search Section */}
      <View style={styles.filterContainer}>
        {/* Date Filter */}
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
        </TouchableOpacity>

        {/* General Filter */}
        <TouchableOpacity style={styles.filterButton}onPress={() => setModalVisible(true)}>
          <Text style={styles.filterText}>{selectedFilter}</Text>
        </TouchableOpacity>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search coupons..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={setSearchTerm} // Update search term state
      />
      </View>
      <Modal visible={isCalendarVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <CommonCalendar onDateChange={handleDateChange} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView horizontal>
          <ScrollView>
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

          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <View key={coupon._id} style={styles.tableRow}>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => handleEditCoupon(coupon)}>
                    <Edit />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteCoupon(coupon._id)}>
                    <Delete />
                  </TouchableOpacity>
                </View>
                <Text style={styles.tableCell}>{coupon.couponCode}</Text>
                <Text style={styles.tableCell}>{coupon.discountType}</Text>
                <Text style={styles.tableCell}>{`Rs ${coupon.couponAmount}`}</Text>
                <Text style={styles.tableCell}>{coupon.usageLimitPerCoupon}</Text>
                <Text style={styles.tableCell}>{formatDate(coupon.expiry)}</Text>
                <Text style={styles.tableCell}>{coupon.action}</Text>
              </View>
            ))
          ) : (
            <Text>No coupons found.</Text>
          )}
        </ScrollView>
        </ScrollView>
      )}

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Coupon</Text>
          <TextInput
            value={editData.couponCode}
            onChangeText={(text) => setEditData({ ...editData, couponCode: text })}
            placeholder="Coupon Code"
            style={styles.input}
          />
          <Text style={styles.label}>Discount Type</Text>
          <TextInput
            value={editData.discountType}
            onChangeText={(text) => setEditData({ ...editData, discountType: text })}
            placeholder="Discount Type"
            style={styles.input}
          />
          <Text style={styles.label}>Coupon Amount</Text>
          <TextInput
            value={editData.couponAmount}
            onChangeText={(text) => setEditData({ ...editData, couponAmount: text })}
            placeholder="Coupon Amount"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Usage Limit</Text>
          <TextInput
            value={editData.usageLimitPerCoupon}
            onChangeText={(text) => setEditData({ ...editData, usageLimitPerCoupon: text })}
            placeholder="Usage Limit"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Expiry Date (YYYY-MM-DD)</Text>
          <TextInput
            value={editData.expiry}
            onChangeText={(text) => setEditData({ ...editData, expiry: text })}
            placeholder="Expiry (YYYY-MM-DD)"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSaveEdit}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditModalVisible(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>


      {/* Modal for filter options */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle back button close
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)} // Close when clicking outside modal
        >
          <View style={styles.modalContainer1}>
            <Text style={styles.modalHeader}>Filter by</Text>
            <FlatList
              data={filters}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleFilterSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
    
  );
};


  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
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
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    width: 100, // Adjust width to ensure alignment
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 5,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row', // Align title and buttons in the same row
    justifyContent: 'space-between', // Spread title and buttons across the row
    alignItems: 'center', // Align items vertically in the center
    marginBottom: hp(1),
  },
  title: {
    fontSize: FontSize(25),
    fontWeight: 'bold',
    color: '#373737',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(1.5),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: wp(2),
    padding: wp(2.5),
    marginHorizontal: wp(1.5),
  },
  filterText: {
    color: '#666',
    fontSize: FontSize(14),
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: wp(2),
    paddingHorizontal: wp(2.5),
    marginLeft: wp(2.5),
    fontSize: FontSize(14),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Transparent background for modal
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  },
  modalContainer1: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  modalItemText: {
    fontSize: 16,
  },
});

export default Coupondata;
