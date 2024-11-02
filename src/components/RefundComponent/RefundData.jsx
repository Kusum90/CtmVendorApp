import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Seen from '../../assets/svg/Productsvg/Seen';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

// Main Screen Component
const RefundData = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const inventoryData = [
    {
      id: 1,
      Requestid: '0957746KJLY',
      orderid: '11214521245',
      amount: 'Rs 500',
      type: 'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024',
    },
    {
      id: 2,
      Requestid: '0957746KJLY',
      orderid: '11214521245',
      amount: 'Rs 700',
      type: 'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024',
    },
    {
      id: 3,
      Requestid: '0957746KJLZ',
      orderid: '11214521245',
      amount: 'Rs 900',
      type: 'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024',
    },
    {
      id: 4,
      Requestid: '0957746KJLZ',
      orderid: '11214521245',
      amount: 'Rs 400',
      type: 'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024',
    },
    {
      id: 5,
      Requestid: '0957746KJLZ',
      orderid: '11214521245',
      amount: 'Rs 1000',
      type: 'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024',
    },
    {
      id: 6,
      Requestid: '0957746KJLZ',
      orderid: '11214521245',
      amount: 'Rs 5000',
      type: 'Dress Material',
      reason: 'Quality Issues',
      Date: '12-05-2024',
    },
    // Add more data as needed
  ];

  const openModal = (data) => {
    setSelectedData(data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedData(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Header Row */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Actions</Text>
            <Text style={styles.tableHeaderText}>Request ID</Text>
            <Text style={styles.tableHeaderText}>Order ID</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
            <Text style={styles.tableHeaderText}>Type</Text>
            <Text style={styles.tableHeaderText}>Reason</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
          </View>

          {/* Data Rows */}
          {inventoryData.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              {/* Actions (Seen Icon Button) */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => openModal(item)}>
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

      {/* Modal */}
      {selectedData && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <RequestDetails data={selectedData} />
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Request Details Component
const RequestDetails = ({ data }) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.label}>Request ID: {data.Requestid}</Text>
      <Text style={styles.label}>Order ID: {data.orderid}</Text>
      <Text style={styles.label}>Amount: {data.amount}</Text>
      <Text style={styles.label}>Type: {data.type}</Text>
      <Text style={styles.label}>Reason: {data.reason}</Text>
      <Text style={styles.label}>Date: {data.Date}</Text>
    </View>
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
    justifyContent: 'center',
  },
  tableCell: {
    width: wp(23), // Responsive width to match the header
    textAlign: 'center',
    fontSize: FontSize(12), // Responsive font size
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
});

export default RefundData;
