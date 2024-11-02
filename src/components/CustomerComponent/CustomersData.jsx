import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Button, TextInput } from 'react-native';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer, setCurrentPage } from '../../redux/Customer/CustomerSlice';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';
import { useNavigation } from '@react-navigation/native';


const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; // Handle missing dates
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'N/A' : date.toISOString().split('T')[0]; // Format or return 'N/A' if invalid
};

const CustomersData = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Get data from the Redux store
  const { loading, customers, error, currentPage, totalPages } = useSelector((state) => state.customers);

  // Modal state for displaying customer details
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Search term state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch customer data when the component mounts or when search or page changes
  useEffect(() => {
    dispatch(getCustomer({ page: currentPage, limit: 10, searchTerm, selectedDate }));
  }, [dispatch, currentPage, searchTerm, selectedDate]);

  // Function to open modal and set selected customer
  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCustomer(null);
  };

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  // Function to go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
<View style={{ flex: 1 }}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer</Text>
      </View>

    <View style={styles.container}>
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by username"
          value={searchTerm}
          onChangeText={setSearchTerm} // Update the search term as user types
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => dispatch(setCurrentPage(1))} // Reset to the first page when searching
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Header Row */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Actions</Text>
              <Text style={styles.tableHeaderText}>Name</Text>
              <Text style={styles.tableHeaderText}>User Name</Text>
              <Text style={styles.tableHeaderText}>Email</Text>
              <Text style={styles.tableHeaderText}>Phone</Text>
              <Text style={styles.tableHeaderText}>Money Spent</Text>
              <Text style={styles.tableHeaderText}>Last Order</Text>
            </View>

            {/* Data Rows */}
            {customers.map((item) => (
              <View key={item._id} style={styles.tableRow}>
                {/* Actions (View/Seen Buttons) */}
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => openModal(item)}>
                    <Seen width={50} height={50} style={styles.centeredIcon} />
                  </TouchableOpacity>
                </View>

                {/* Customer Data */}
                <Text style={styles.tableCell}>{`${item.firstname} ${item.lastname}`}</Text>
                <Text style={styles.tableCell}>{item.username}</Text>
                <Text style={styles.tableCell}>{item.email}</Text>
                <Text style={styles.tableCell}>{item.phone}</Text>
                <Text style={styles.tableCell}>{`Rs ${item.totalSpent}`}</Text>
                <Text style={styles.tableCell}>{formatDate(item.lastOrderDate)}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1}>
          <Text style={styles.pageButton}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>Page {currentPage} of {totalPages}</Text>
        <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
          <Text style={styles.pageButton}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Customer Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCustomer && (
              <>
                <Text style={styles.modalTitle}>Customer Details</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Name:</Text> {`${selectedCustomer.firstname} ${selectedCustomer.lastname}`}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Username:</Text> {selectedCustomer.username}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Email:</Text> {selectedCustomer.email}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Phone:</Text> {selectedCustomer.phone}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Total Spent:</Text> Rs {selectedCustomer.totalSpent}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Last Order Date:</Text> {formatDate(selectedCustomer.lastOrderDate)}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Joined On:</Text> {formatDate(selectedCustomer.createdAt)}</Text>
                <Button title="Close" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(2.5),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  searchInput: {
    flex: 1,
    padding: hp(1),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: wp(2),
    backgroundColor: '#007BFF',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(1.25),
  },
  tableHeaderText: {
    width: wp(22),
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(14),
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(22),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centeredIcon: {
    alignSelf: 'center', // Center the icon
  },
  tableCell: {
    width: wp(23),
    textAlign: 'center',
    fontSize: FontSize(12),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  pageButton: {
    fontSize: FontSize(14),
    marginHorizontal: wp(2),
    color: '#007BFF',
  },
  pageNumber: {
    fontSize: FontSize(14),
  },
  errorText: {
    fontSize: FontSize(16),
    color: 'red',
    textAlign: 'center',
    marginVertical: hp(2),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for modal
  },
  modalContent: {
    width: wp(80),
    padding: hp(2),
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: FontSize(20),
    fontWeight: 'bold',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  modalText: {
    fontSize: FontSize(14),
    marginBottom: hp(1),
  },
  bold: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 80,
    color:'#373737',
  },
});

export default CustomersData;
