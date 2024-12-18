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

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   Modal,
//   TextInput,
//   FlatList
// } from 'react-native';
// import axios from 'axios'; // Import Axios
// import Edit from '../../assets/svg/Productsvg/Edit'; // Assuming you have Edit icon as SVG
// import Delete from '../../assets/svg/Productsvg/Delete'; // Assuming you have Delete icon as SVG
// import Plus from '../../assets/svg/Productsvg/Plus';
// import { useNavigation } from '@react-navigation/native';
// import CommonCalendar from '../../utils/datepicker';
// import { wp,hp,FontSize } from '../../utils/responsiveUtils';

// const Coupondata = () => {
//   const navigation = useNavigation();
//   const [inventoryData, setInventoryData] = useState([]); // State to store fetched data
//   const [loading, setLoading] = useState(true); // State to manage loading spinner
//   const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
//   const [editModalVisible, setEditModalVisible] = useState(false); // State to manage modal visibility
//   const [selectedCoupon, setSelectedCoupon] = useState(null); // State for selected coupon
//   const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Calendar modal visibility
//   const [selectedDate, setSelectedDate] = useState(null); // State for selected date
//   const [filteredCoupons, setFilteredCoupons] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('Filter by');

//   const [editData, setEditData] = useState({
//     couponCode: '',
//     discountType: '',
//     couponAmount: '',
//     usageLimitPerCoupon: '',
//     expiry: '',
//   }); // State for editing coupon data
//   const filters = ['Percentage', 'Percentage Discount', 'Fixed Product Discount'];

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setIsCalendarVisible(false);
//   };

//   const handleFilterSelect = (filter) => {
//     setSelectedFilter(filter);
//     setModalVisible(false);
//   };

//   useEffect(() => {
//     fetchCoupons(); // Fetch coupons when component mounts
//   }, []);
//   useEffect(() => {
//     filterCoupons();
//   }, [searchTerm, selectedDate, selectedFilter, inventoryData]);

//   const filterCoupons = () => {
//     let filtered = inventoryData;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter((coupon) =>
//         coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by selected date
//     if (selectedDate) {
//       filtered = filtered.filter(
//         (coupon) =>
//           new Date(coupon.createdAt).toLocaleDateString() ===
//           new Date(selectedDate).toLocaleDateString()
//       );
//     }

//     // Filter by selected discount type
//   if (selectedFilter && selectedFilter !== 'Filter by') {
//     filtered = filtered.filter((coupon) =>
//       coupon.discountType.toLowerCase().includes(selectedFilter.toLowerCase())
//     );
//   }

//     setFilteredCoupons(filtered);
//   };

//   // Fetch coupon data
//   const fetchCoupons = () => {
//     axios
//       .get('https://cm-backend-yk2y.onrender.com/user/coupons')
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
//       'Delete Confirmation',
//       'Are you sure you want to delete this coupon?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             axios
//               .delete(`https://cm-backend-yk2y.onrender.com/user/coupon/${couponId}`)
//               .then((response) => {
//                 console.log(response.data.message); // Log success message
//                 setInventoryData(inventoryData.filter((coupon) => coupon._id !== couponId));
//                 Alert.alert('Success', 'Coupon deleted successfully.');
//               })
//               .catch((error) => {
//                 console.error('Error deleting coupon:', error);
//                 Alert.alert('Error', 'Failed to delete the coupon.');
//               });
//           },
//         },
//       ]
//     );
//   };

//   // Handle edit coupon (Open modal)
//   const handleEditCoupon = (coupon) => {
//     setSelectedCoupon(coupon._id);
//     setEditData({
//       couponCode: coupon.couponCode,
//       discountType: coupon.discountType,
//       couponAmount: coupon.couponAmount.toString(),
//       usageLimitPerCoupon: coupon.usageLimitPerCoupon.toString(),
//       expiry: formatDate(coupon.expiry),
//     });
//     setEditModalVisible(true);
//   };

//   // Handle save after editing
// const handleSaveEdit = () => {
//   const updatedData = {
//     couponCode: editData.couponCode.trim(),
//     discountType: editData.discountType.trim(),
//     couponAmount: editData.couponAmount,
//     usageLimitPerCoupon: Number(editData.usageLimitPerCoupon),
//     expiry: editData.expiry.trim(),
//   };

//   axios
//     .put(`https://cm-backend-yk2y.onrender.com/user/coupon/${selectedCoupon}`, updatedData)
//     .then((response) => {
//       console.log(response.data.message); // Log success message
//       setEditModalVisible(false); // Close the modal
//       fetchCoupons(); // Re-fetch the coupons to reflect updated data
//     })
//     .catch((error) => {
//       console.error('Error updating coupon:', error);
//       Alert.alert('Error', 'Failed to update the coupon.');
//     });
// };

//   // Format the date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
//   };

//   // Filter inventory data based on search term
//   // const filteredCoupons = inventoryData.filter((coupon) =>
//   //   coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <View style={styles.container}>

// <View style={styles.headerContainer}>
//         {/* Inventory Title */}
//         <Text style={styles.title}>Coupons</Text>

//         {/* Buttons on the right */}
//         <View style={styles.buttonsContainer}>
//           {/* Green Button */}
//           <TouchableOpacity
//             style={[styles.iconButton, styles.greenButton]}
//             onPress={() => navigation.navigate('AddCoupon')}
//           >
//             <Plus width={50} height={50} />
//           </TouchableOpacity>

//         </View>
//       </View>

//       {/* Filter and Search Section */}
//       <View style={styles.filterContainer}>
//         {/* Date Filter */}
//         <TouchableOpacity style={styles.filterButton} onPress={() => setIsCalendarVisible(true)}>
//           <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
//         </TouchableOpacity>

//         {/* General Filter */}
//         <TouchableOpacity style={styles.filterButton}onPress={() => setModalVisible(true)}>
//           <Text style={styles.filterText}>{selectedFilter}</Text>
//         </TouchableOpacity>

//       {/* Search Input */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search coupons..."
//         placeholderTextColor="#999"
//         value={searchTerm}
//         onChangeText={setSearchTerm} // Update search term state
//       />
//       </View>
//       <Modal visible={isCalendarVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.calendarWrapper}>
//             <CommonCalendar onDateChange={handleDateChange} />
//             <TouchableOpacity style={styles.closeButton} onPress={() => setIsCalendarVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Loading Spinner */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" />
//       ) : (
//         <ScrollView horizontal>
//           <ScrollView>
//           {/* Header Row */}
//           <View style={styles.tableHeader}>
//             <Text style={styles.tableHeaderText}>Actions</Text>
//             <Text style={styles.tableHeaderText}>Code</Text>
//             <Text style={styles.tableHeaderText}>Type</Text>
//             <Text style={styles.tableHeaderText}>Amount (Rs)</Text>
//             <Text style={styles.tableHeaderText}>Usage Limit</Text>
//             <Text style={styles.tableHeaderText}>Expiry Date</Text>
//             <Text style={styles.tableHeaderText}>Status</Text>
//           </View>

//           {filteredCoupons.length > 0 ? (
//             filteredCoupons.map((coupon) => (
//               <View key={coupon._id} style={styles.tableRow}>
//                 <View style={styles.actionsContainer}>
//                   <TouchableOpacity onPress={() => handleEditCoupon(coupon)}>
//                     <Edit />
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => handleDeleteCoupon(coupon._id)}>
//                     <Delete />
//                   </TouchableOpacity>
//                 </View>
//                 <Text style={styles.tableCell}>{coupon.couponCode}</Text>
//                 <Text style={styles.tableCell}>{coupon.discountType}</Text>
//                 <Text style={styles.tableCell}>{`Rs ${coupon.couponAmount}`}</Text>
//                 <Text style={styles.tableCell}>{coupon.usageLimitPerCoupon}</Text>
//                 <Text style={styles.tableCell}>{formatDate(coupon.expiry)}</Text>
//                 <Text style={styles.tableCell}>{coupon.action}</Text>
//               </View>
//             ))
//           ) : (
//             <Text>No coupons found.</Text>
//           )}
//         </ScrollView>
//         </ScrollView>
//       )}

//       {/* Edit Modal */}
//       <Modal visible={editModalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Edit Coupon</Text>
//           <TextInput
//             value={editData.couponCode}
//             onChangeText={(text) => setEditData({ ...editData, couponCode: text })}
//             placeholder="Coupon Code"
//             style={styles.input}
//           />
//           <Text style={styles.label}>Discount Type</Text>
//           <TextInput
//             value={editData.discountType}
//             onChangeText={(text) => setEditData({ ...editData, discountType: text })}
//             placeholder="Discount Type"
//             style={styles.input}
//           />
//           <Text style={styles.label}>Coupon Amount</Text>
//           <TextInput
//             value={editData.couponAmount}
//             onChangeText={(text) => setEditData({ ...editData, couponAmount: text })}
//             placeholder="Coupon Amount"
//             keyboardType="numeric"
//             style={styles.input}
//           />
//           <Text style={styles.label}>Usage Limit</Text>
//           <TextInput
//             value={editData.usageLimitPerCoupon}
//             onChangeText={(text) => setEditData({ ...editData, usageLimitPerCoupon: text })}
//             placeholder="Usage Limit"
//             keyboardType="numeric"
//             style={styles.input}
//           />
//           <Text style={styles.label}>Expiry Date (YYYY-MM-DD)</Text>
//           <TextInput
//             value={editData.expiry}
//             onChangeText={(text) => setEditData({ ...editData, expiry: text })}
//             placeholder="Expiry (YYYY-MM-DD)"
//             style={styles.input}
//           />
//           <TouchableOpacity onPress={handleSaveEdit}>
//             <Text style={styles.saveButton}>Save</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setEditModalVisible(false)}>
//             <Text style={styles.cancelButton}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Modal for filter options */}
//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <View style={styles.modalContainer1}>
//           {filters.map((filter) => (
//             <TouchableOpacity key={filter} onPress={() => handleFilterSelect(filter)}>
//               <Text style={styles.modalOption}>{filter}</Text>
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#e0e0e0',
//     paddingVertical: 10,
//     paddingHorizontal: 6,
//     marginTop:hp(1)
//   },
//   tableHeaderText: {
//     width: 100, // Adjust width to ensure alignment
//     fontWeight: 'bold',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   tableCell: {
//     width: 100, // Adjust width to ensure alignment
//     textAlign: 'center',
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     width: 80,
//     justifyContent: 'space-between',
//   },
//   modalContainer: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   label: {
//     marginBottom: 5,
//   },
// saveButton: {
//   backgroundColor: '#007bff',
//   paddingVertical: 10,
//   textAlign: 'center',
//   color: '#fff',
//   borderRadius: 5,
// },
// cancelButton: {
//   marginTop: 10,
//   backgroundColor: '#dc3545',
//   paddingVertical: 10,
//   textAlign: 'center',
//   color: '#fff',
//   borderRadius: 5,
// },
//   headerContainer: {
//     flexDirection: 'row', // Align title and buttons in the same row
//     justifyContent: 'space-between', // Spread title and buttons across the row
//     alignItems: 'center', // Align items vertically in the center
//     marginBottom: hp(1),
//   },
//   title: {
//     fontSize: FontSize(25),
//     fontWeight: 'bold',
//     color: '#373737',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//   },
//   iconButton: {
//     width: wp(10),
//     height: wp(10),
//     borderRadius: wp(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: wp(1.5),
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   filterButton: {
//     backgroundColor: '#f1f1f1',
//     borderRadius: wp(2),
//     padding: wp(2.5),
//     marginHorizontal: wp(1.5),
//   },
//   filterText: {
//     color: '#666',
//     fontSize: FontSize(14),
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: '#f1f1f1',
//     borderRadius: wp(2),
//     paddingHorizontal: wp(2.5),
//     marginLeft: wp(2.5),
//     fontSize: FontSize(14),
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)', // Transparent background for modal
//   },
//   calendarWrapper: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     width: '90%',
//   },
// closeButton: {
//   marginTop: 10,
//   padding: 10,
//   backgroundColor: '#007bff',
//   borderRadius: 5,
//   alignItems: 'center',
// },
// closeButtonText: {
//   color: '#fff',
//   fontWeight: 'bold',
// },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
//   },
//   modalContainer1: {
//     width: 250,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 10,
//   },
//   modalHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },

//   modalItemText: {
//     fontSize: 16,
//   },
//   modalContainer1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
//   },
//   modalOption: {
//     fontSize: 18,
//     color: '#333',
//     paddingVertical: 2,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     backgroundColor: 'white', // Light background color
//     borderRadius: 6,
//     textAlign: 'center',
//     width: '100%',
//   },
// });

// export default Coupondata;

import React, {useEffect, useState} from 'react';
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
  FlatList,
  Switch,
} from 'react-native';
import axios from 'axios'; // Import Axios
import Edit from '../../assets/svg/Productsvg/Edit'; // Assuming you have Edit icon as SVG
import Delete from '../../assets/svg/Productsvg/Delete'; // Assuming you have Delete icon as SVG
import Plus from '../../assets/svg/Productsvg/Plus';
import {useNavigation} from '@react-navigation/native';
import CommonCalendar from '../../utils/datepicker';
import {wp, hp, FontSize} from '../../utils/responsiveUtils';
import Seen from '../../assets/svg/Productsvg/Seen';
import {Picker} from '@react-native-picker/picker';

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
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Filter by');
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isExcludeProductModalVisible, setIsExcludeProductModalVisible] =
    useState(false);

  const [editData, setEditData] = useState({
    couponCode: '',
    discountType: '',
    description: '',
    couponAmount: '',
    usageLimitPerCoupon: '',
    usageLimitPerUser: '',
    expiry: '',
    allowFreeShipping: false, // Initialize switch state here
    showOnStore: false,
    minimumSpend: '', // Add this field
    maximumSpend: '', // Add this field
    includedProducts: [],
    excludedProducts: [],
  }); // State for editing coupon data

  const filters = [
    'Percentage',
    'Percentage Discount',
    'Fixed Product Discount',
  ];

  const handleDateChange = date => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  const handleFilterSelect = filter => {
    setSelectedFilter(filter);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchCoupons();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterCoupons();
  }, [searchTerm, selectedDate, selectedFilter, inventoryData]);

  const filterCoupons = () => {
    let filtered = inventoryData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(coupon =>
        coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter(
        coupon =>
          new Date(coupon.createdAt).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString(),
      );
    }

    // Filter by selected discount type
    if (selectedFilter && selectedFilter !== 'Filter by') {
      filtered = filtered.filter(coupon =>
        coupon.discountType
          .toLowerCase()
          .includes(selectedFilter.toLowerCase()),
      );
    }

    setFilteredCoupons(filtered);
  };

  // Fetch coupon data
  const fetchCoupons = () => {
    axios
      .get('https://cm-backend-yk2y.onrender.com/user/coupons')
      .then(response => {
        setInventoryData(response.data.coupons); // Assuming coupons are in response.data.coupons
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even if there’s an error
      });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://cm-backend-yk2y.onrender.com/user/getallproduct',
      );
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle delete coupon
  const handleDeleteCoupon = couponId => {
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
              .delete(
                `https://cm-backend-yk2y.onrender.com/user/coupon/${couponId}`,
              )
              .then(response => {
                console.log(response.data.message); // Log success message
                setInventoryData(
                  inventoryData.filter(coupon => coupon._id !== couponId),
                );
                Alert.alert('Success', 'Coupon deleted successfully.');
              })
              .catch(error => {
                console.error('Error deleting coupon:', error);
                Alert.alert('Error', 'Failed to delete the coupon.');
              });
          },
        },
      ],
    );
  };

  // Handle edit coupon (Open modal)
  const handleEditCoupon = coupon => {
    setSelectedCoupon(coupon._id); // Store the selected coupon ID
    setEditData({
      couponCode: coupon.couponCode,
      discountType: coupon.discountType,
      description: coupon.description || '',
      couponAmount: coupon.couponAmount.toString(),
      usageLimitPerCoupon: coupon.usageLimitPerCoupon.toString(),
      usageLimitPerUser: coupon.usageLimitPerUser.toString(),
      expiry: formatDate(coupon.expiry),
      minimumSpend: coupon.minimumSpend ? coupon.minimumSpend.toString() : '',
      maximumSpend: coupon.maximumSpend ? coupon.maximumSpend.toString() : '',
      includedProducts: coupon.includedProducts || [],
      excludedProducts: coupon.excludedProducts || [],
    });
    setEditModalVisible(true); // Show the edit modal
  };

  // Handle save after editing
  const handleSaveEdit = async () => {
    const includedProductIds = editData.includedProducts.map(product =>
      typeof product === 'object' ? product._id : product,
    );

    const excludedProductIds = editData.excludedProducts.map(product =>
      typeof product === 'object' ? product._id : product,
    );

    // Ensure that showOnStore is set to either true or false
    const showOnStore =
      editData.showOnStore !== undefined ? editData.showOnStore : false;

    // Prepare data for the API request with the correct types according to the backend schema
    const updatedData = {
      couponCode: editData.couponCode.toString().trim(),
      discountType: editData.discountType.trim(),
      description: editData.description.toString().trim(),
      couponAmount: editData.couponAmount.toString(), // Convert to string as per schema
      usageLimitPerCoupon: Number(editData.usageLimitPerCoupon), // Keep as number
      usageLimitPerUser: Number(editData.usageLimitPerUser), // Keep as number
      expiry: editData.expiry.trim(),
      allowFreeShipping: editData.allowFreeShipping, // Boolean from editData
      showOnStore: showOnStore, // Add this boolean value
      includedProducts: includedProductIds, // Pass only IDs
      excludedProducts: excludedProductIds, // Pass only IDs
      minimumSpend: Number(editData.minimumSpend), // Keep as number
      maximumSpend: Number(editData.maximumSpend), // Keep as number
    };

    console.log('Updating coupon with data:', updatedData);

    try {
      const response = await axios.put(
        `https://cm-backend-yk2y.onrender.com/user/coupon/${selectedCoupon}`,
        updatedData,
      );

      console.log(response.data.message);

      const updatedInventoryData = inventoryData.map(coupon =>
        coupon._id === selectedCoupon ? {...coupon, ...updatedData} : coupon,
      );
      setInventoryData(updatedInventoryData);
      setFilteredCoupons(updatedInventoryData);

      setEditModalVisible(false);
      Alert.alert(
        'Success',
        response.data.message || 'Coupon updated successfully.',
      );
    } catch (error) {
      console.error('Error updating coupon:', error);

      if (error.response && error.response.data) {
        console.error('Server Response:', error.response.data);
        Alert.alert(
          'Error',
          `Failed to update the coupon: ${
            error.response.data.message || JSON.stringify(error.response.data)
          }`,
        );
      } else {
        Alert.alert('Error', 'Failed to update the coupon.');
      }
    }
  };

  // Format the date
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  // Filter inventory data based on search term
  // const filteredCoupons = inventoryData.filter((coupon) =>
  //   coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleProductSelect = productId => {
    setEditData(prevData => {
      // Toggle inclusion of product ID in includedProducts array
      const includedProducts = prevData.includedProducts.includes(productId)
        ? prevData.includedProducts.filter(id => id !== productId)
        : [...prevData.includedProducts, productId];

      return {...prevData, includedProducts};
    });
  };

  const handleExcludeProductSelect = productId => {
    setEditData(prevData => {
      // Toggle inclusion of product ID in excludedProducts array
      const excludedProducts = prevData.excludedProducts.includes(productId)
        ? prevData.excludedProducts.filter(id => id !== productId)
        : [...prevData.excludedProducts, productId];

      return {...prevData, excludedProducts};
    });
  };

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
            onPress={() => navigation.navigate('AddCoupon')}>
            <Plus width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter and Search Section */}
      <View style={styles.filterContainer}>
        {/* Date Filter */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
        </TouchableOpacity>

        {/* General Filter */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}>
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
      <Modal
        visible={isCalendarVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.calendarmodalContainer}>
          <View style={styles.calendarWrapper}>
            <CommonCalendar onDateChange={handleDateChange} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCalendarVisible(false)}>
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
              filteredCoupons.map(coupon => (
                <View key={coupon._id} style={styles.tableRow}>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleEditCoupon(coupon)}>
                      <Edit />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteCoupon(coupon._id)}>
                      <Delete />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.tableCell}>{coupon.couponCode}</Text>
                  <Text style={styles.tableCell}>{coupon.discountType}</Text>
                  <Text style={styles.tableCell}> ${coupon.couponAmount}</Text>
                  <Text style={styles.tableCell}>
                    {coupon.usageLimitPerCoupon}
                  </Text>
                  <Text style={styles.tableCell}>
                    {formatDate(coupon.expiry)}
                  </Text>
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
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Coupon</Text>
          <Text style={styles.label}>Coupon Code </Text>
          <TextInput
            value={editData.couponCode}
            onChangeText={text => setEditData({...editData, couponCode: text})}
            placeholder="Coupon Code"
            style={styles.input}
          />
          <Text style={styles.label}>Discount Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={editData.discountType}
              onValueChange={itemValue =>
                setEditData({...editData, discountType: itemValue})
              }
              style={styles.picker}>
              <Picker.Item label="Percentage" value="percentage" />
              <Picker.Item label="Fixed Product Discount" value="fixed" />
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={editData.description}
            onChangeText={text => setEditData({...editData, description: text})}
            placeholder="Description"
            style={styles.input}
          />
          <Text style={styles.label}>Coupon Amount</Text>
          <TextInput
            value={editData.couponAmount}
            onChangeText={text =>
              setEditData({...editData, couponAmount: text})
            }
            placeholder="Coupon Amount"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Usage Limit per Coupon</Text>

          <TextInput
            value={editData.usageLimitPerCoupon}
            onChangeText={text =>
              setEditData({...editData, usageLimitPerCoupon: text})
            }
            placeholder="Usage Limit per Coupon"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Usage Limit per User</Text>
          <TextInput
            value={editData.usageLimitPerUser}
            onChangeText={text =>
              setEditData({...editData, usageLimitPerUser: text})
            }
            placeholder="Usage Limit per User"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Expiry Date (YYYY-MM-DD)</Text>
          <TextInput
            value={editData.expiry}
            onChangeText={text => setEditData({...editData, expiry: text})}
            placeholder="Expiry (YYYY-MM-DD)"
            style={styles.input}
          />

          {/* Switches Section */}
          <View style={styles.switchContainer}>
            <View style={styles.switchItem}>
              <Text style={styles.label}>Allow Free Shipping</Text>
              <Switch
                value={editData.allowFreeShipping}
                onValueChange={value =>
                  setEditData({...editData, allowFreeShipping: value})
                }
              />
            </View>
            <View style={styles.switchItem}>
              <Text style={styles.label}>Show on Store</Text>
              <Switch
                value={editData.showOnStore}
                onValueChange={value =>
                  setEditData({...editData, showOnStore: value})
                }
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setIsProductModalVisible(true)}>
            <Text style={styles.selectButtonText}>
              Select Included Products
            </Text>
          </TouchableOpacity>

          <View style={styles.selectedProductsContainer}>
            {editData.includedProducts.length > 0 ? (
              editData.includedProducts.map(id => (
                <Text key={id} style={styles.selectedProduct}>
                  {products.find(product => product._id === id)?.title || ''}
                </Text>
              ))
            ) : (
              <Text style={styles.placeholderText}>
                No included products selected
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setIsExcludeProductModalVisible(true)}>
            <Text style={styles.selectButtonText}>
              Select Excluded Products
            </Text>
          </TouchableOpacity>

          <View style={styles.selectedProductsContainer}>
            {editData.excludedProducts.length > 0 ? (
              editData.excludedProducts.map(id => (
                <Text key={id} style={styles.selectedProduct}>
                  {products.find(product => product._id === id)?.title || ''}
                </Text>
              ))
            ) : (
              <Text style={styles.placeholderText}>
                No excluded products selected
              </Text>
            )}
          </View>
          {/* Minimum Spend */}
          <Text style={styles.label}>Minimum Spend</Text>
          <TextInput
            value={editData.minimumSpend}
            onChangeText={text =>
              setEditData({...editData, minimumSpend: text})
            }
            placeholder="Minimum Spend"
            keyboardType="numeric"
            style={styles.input}
          />
          {/* Maximum Spend */}
          <Text style={styles.label}>Maximum Spend</Text>
          <TextInput
            value={editData.maximumSpend}
            onChangeText={text =>
              setEditData({...editData, maximumSpend: text})
            }
            placeholder="Maximum Spend"
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.navigation}>
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={[styles.navButton, styles.previousButton]}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={[styles.navButton, styles.nextButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* Modal for filter options */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer1}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => handleFilterSelect(filter)}>
              <Text style={styles.modalOption}>{filter}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for selecting included products */}
      <Modal visible={isProductModalVisible} animationType="slide">
        <View style={styles.modalContainer5}>
          <Text style={styles.modalTitle}>Select Products to Include</Text>
          <FlatList
            data={products}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleProductSelect(item._id)}>
                <Text style={styles.productItem}>
                  {item.title}{' '}
                  {editData.includedProducts.includes(item._id)
                    ? '(Selected)'
                    : ''}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setIsProductModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={isExcludeProductModalVisible} animationType="slide">
        <View style={styles.modalContainer5}>
          <Text style={styles.modalTitle}>Select Products to Exclude</Text>
          <FlatList
            data={products}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleExcludeProductSelect(item._id)}>
                <Text style={styles.productItem}>
                  {item.title}{' '}
                  {editData.excludedProducts.includes(item._id)
                    ? '(Selected)'
                    : ''}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setIsExcludeProductModalVisible(false)}>
            <Text style={styles.closeButtonText1}>Close</Text>
          </TouchableOpacity>
        </View>
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginTop: hp(1),
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
    padding: 12,
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
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  navButton: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  previousButton: {
    backgroundColor: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#f44336', // Change this if you prefer a different color for the Cancel button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
  calendarmodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Transparent background for modal
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
  saveButton: {
    backgroundColor: 'green',
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
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // Semi-transparent background
    padding: 20,

    flex: 1,
  },
  modalOption: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white', // Light background color
    borderRadius: 6,
    textAlign: 'center',
    width: '100%',
  },
  modalContainer5: {padding: wp(5)},
  selectButton: {
    backgroundColor: '#007BFF',
    padding: wp(3),
    marginTop: hp(1),
    borderRadius: wp(1),
  },
  selectButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSize(18),
    marginTop: hp(2),
    fontWeight: 'bold',
  },
  selectedProduct: {
    color: 'green',
    fontSize: FontSize(16),
  },
  closeButtonText1: {
    textAlign: 'center',
    marginTop: hp(1),
    color: '#007BFF',
  },
  productItem: {
    padding: hp(1),
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: '#333',
    paddingLeft: 10,
  },
  switchContainer: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Coupondata;
