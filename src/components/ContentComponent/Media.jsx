import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import { useNavigation } from '@react-navigation/native';
import CommonCalendar from '../../utils/datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../redux/Product/ProductSlice';
import Seen from '../../assets/svg/Productsvg/Seen';
import Delete from '../../assets/svg/Productsvg/Delete';
import Category from '../../assets/svg/Productsvg/Category';

// Function to calculate the image size (mock value for demonstration)
const calculateImageSize = (imageUrl) => {
  return 500000; // Mock size of 500 KB
};

// Utility function to shorten URLs
const shortenUrl = (url) => {
  const maxLength = 40;
  if (url.length <= maxLength) return url;
  return `${url.slice(0, 30)}...${url.slice(-10)}`;
};

// Function to convert bytes into human-readable size
const humanReadableSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
};

// Dashboard Card component for media information
const DashboardCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.mainValue}>{item.value}</Text>
        <View style={styles.iconContainer}>{item.icon}</View>
      </View>
    </View>
  );
};

const Media = () => {
  const navigation = useNavigation();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data || []);
  const loading = useSelector((state) => state.products?.loading);
  const totalPages = useSelector((state) => state.products?.totalPages || 1);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getAllProduct({ page: currentPage, limit: itemsPerPage, searchTerm, selectedDate }));
  }, [dispatch, currentPage, searchTerm, selectedDate]);

  const totalSpaceUsed = products.reduce((total, product) => {
    const imageSize = product.image?.reduce((size, img) => size + calculateImageSize(img), 0) || 0;
    return total + imageSize;
  }, 0);

  const handleSearchChange = (text) => setSearchTerm(text);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const dashboardData = [
    {
      id: '1',
      label: 'Total Space Used',
      value: humanReadableSize(totalSpaceUsed),
      icon: <Category />,
    },
  ];

  const handleSeenIconClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dashboardData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DashboardCard item={item} />}
        style={styles.dashboardList}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Media</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>

      <Modal visible={isCalendarVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <CommonCalendar onDateChange={handleDateChange} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          {selectedProduct && (
            <>
              <Text style={styles.modalTitle}>Media Details</Text>
              {selectedProduct.image && selectedProduct.image.length > 0 && (
                <Image source={{ uri: selectedProduct.image[0] }} style={styles.modalImage} />
              )}
              <Text style={styles.modalText}>File: {selectedProduct.file}</Text>
              <Text style={styles.modalText}>Associate: {selectedProduct.title}</Text>
              <Text style={styles.modalText}>
                Size: {humanReadableSize(selectedProduct.image?.reduce((totalSize, img) => totalSize + calculateImageSize(img), 0) || 0)}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Actions</Text>
              <Text style={styles.tableHeaderText}>Image</Text>
              <Text style={styles.tableHeaderText}>File</Text>
              <Text style={styles.tableHeaderText}>Associate</Text>
              <Text style={styles.tableHeaderText}>Size</Text>
            </View>

            {products.map((product) => (
              <View key={product.id} style={styles.tableRow}>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleSeenIconClick(product)}>
                    <Seen width={50} height={50} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Delete width={50} height={50} />
                  </TouchableOpacity>
                </View>

                {product.image && product.image.length > 0 && (
                  <Image source={{ uri: product.image[0] }} style={styles.productImage} />
                )}
                <Text style={styles.tableCell1}>{product.file}</Text>
                <Text style={styles.url}>{shortenUrl(product.image?.[0] || '')}</Text>
                <Text style={styles.tableCell}>{product.title}</Text>
                <Text style={styles.imageSize}>
                  Size: {humanReadableSize(product.image?.reduce((totalSize, img) => totalSize + calculateImageSize(img), 0) || 0)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  tableHeaderText: {
    width: wp(25),
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
    width: wp(13),
    height: hp(6),
    marginHorizontal: wp(2.5),
  },
  tableCell: {
    width: wp(20),
    textAlign: 'center',
    fontSize: FontSize(12),
    color:'#373737'
  },
  tableCell1: {
    width: wp(11),
    textAlign: 'center',
    fontSize: FontSize(12),
    color:'#373737'
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  url: {
    width: wp(30),
    fontSize:FontSize(14),
    color: "#555",
    textAlign: "center",
    marginBottom: 4,
  },
  imageSize: {
     width: wp(29),
    fontSize:FontSize(14),
    textAlign: "center",
    color: "#373737",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(3), // Responsive borderRadius
    margin: wp(2), // Responsive margin
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.5) }, // Responsive shadowOffset
    shadowOpacity: 0.2,
    shadowRadius: wp(2), // Responsive shadowRadius
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.5), // Responsive marginTop
    marginLeft: wp(0.5), // Responsive marginLeft
  },
  label: {
    fontSize: FontSize(16), // Responsive font size
    color: '#666',
    fontWeight: '500',
    marginLeft: wp(0.5), // Responsive marginLeft
  },
  mainValue: {
    fontSize: FontSize(20), // Responsive font size
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(0.5), // Responsive marginLeft
  },
  iconContainer: {
    borderRadius: wp(12.5), // Responsive borderRadius (50 as a percentage of the width for a circular shape)
    marginBottom: hp(1), // Responsive marginBottom
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: wp(20),
    height: hp(20),
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default Media;
