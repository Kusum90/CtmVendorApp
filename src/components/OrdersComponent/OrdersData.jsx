import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  fetchOrders,
  selectOrders,
  selectLoading,
  selectError,
} from '../../redux/Order/OrderSlice';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import Seen from '../../assets/svg/Productsvg/Seen';
import Download from '../../assets/svg/Productsvg/Download';
import CommonCalendar from '../../utils/datepicker';

const OrdersData = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(selectLoading);
  const orders = useSelector(selectOrders);
  const error = useSelector(selectError);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All'); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  useEffect(() => {
    // Fetch orders when the component mounts
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    let filtered = orders;
  
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.products.some((product) => 
          product.product.title && product.product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  
    if (selectedDate) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
    }

    if (selectedFilter && selectedFilter !== 'All') {
      filtered = filtered.filter(order => order.paymentMethod === selectedFilter);
    }
  

    setFilteredProducts(filtered);
  }, [orders, searchTerm, selectedDate,selectedFilter]);
  
  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  // Function to handle navigation to order details
  const handleNavigateToOrderDetails = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const renderItem = ({ item }) => (
    item.products.map((product, index) => (
      <View key={`${item._id}-${index}`} style={styles.tableRow}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleNavigateToOrderDetails(item)}>
            <Seen width={50} height={50} />
          </TouchableOpacity>
        </View>

        {/* Order and Product Data */}
        <Text style={styles.tableCell}>{item._id}</Text>
        <Text style={styles.tableCell}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>

        {/* Conditionally render the image or placeholder */}
        {product.product.imageUrl ? (
          <Image
            source={{ uri: product.product.imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}

        <Text style={styles.tableCell}>{product.product.title}</Text>
        <Text style={styles.tableCell}>{product.quantity}</Text>
        <Text style={styles.tableCell}>
          {(item.shippingCost + item.discountAmount).toFixed(2)}
        </Text>
        <Text style={styles.tableCell}>{item.paymentMethod}</Text>
      </View>
    ))
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchOrders()).then(() => setIsRefreshing(false));
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsFilterModalVisible(false); // Close the modal after selection
  };

  return (
    <View style={styles.container}>
      {/* Title, Filter, and Search */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.iconButton, styles.blueButton]}>
            <Download width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}>
          <Text style={styles.filterText}>Filter By: {selectedFilter}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>


       {/* Filter Modal */}
       <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.filterModalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            {['All', 'Credit Card', 'PayPal', 'Bank Transfer'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={styles.filterOption}
                onPress={() => handleFilterSelect(filter)}>
                <Text style={styles.filterOptionText}>{filter}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFilterModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
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

      {/* Table Header and Content */}
      <ScrollView horizontal>
        <View>
          {/* Header Row */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Actions</Text>
            <Text style={styles.tableHeaderText}>Order ID</Text>
            <Text style={styles.tableHeaderText}>Order Date</Text>
            <Text style={styles.tableHeaderText}>Image</Text>
            <Text style={styles.tableHeaderText}>Product Name</Text>
            <Text style={styles.tableHeaderText}>Quantity</Text>
            <Text style={styles.tableHeaderText}>Total Order Value</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>

          {/* FlatList for rendering orders */}
          <FlatList
            data={filteredProducts.length > 0 ? filteredProducts : []}
            renderItem={renderItem}
            keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
            ListEmptyComponent={
              !loading && (
                <Text style={styles.noDataText}>No Orders Available</Text>
              )
            }
          />
        </View>
      </ScrollView>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: hp(2),
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  tableHeaderText: {
    width: wp(20),
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
    justifyContent: 'space-evenly',
  },
  productImage: {
    width: wp(12),
    height: hp(6),
    borderRadius: 8,
    marginHorizontal: wp(2.5),
    backgroundColor: '#ccc',
  },
  placeholderImage: {
    width: wp(12),
    height: hp(6),
    marginHorizontal: wp(2.5),
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    width: wp(20),
    textAlign: 'center',
    fontSize: FontSize(12),
    color: '#373737',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: FontSize(16),
    marginTop: hp(2),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: FontSize(16),
    marginTop: hp(2),
  },
  noDataText: {
    textAlign: 'center',
    fontSize: FontSize(16),
    marginTop: hp(2),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarWrapper: {
    width: wp(80),
    padding: wp(5),
    backgroundColor: '#fff',
    borderRadius: wp(2),
  },
  closeButton: {
    marginTop: hp(2),
    paddingVertical: hp(1),
    backgroundColor: '#007bff',
    borderRadius: wp(2),
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: FontSize(14),
  },
});

export default OrdersData;
