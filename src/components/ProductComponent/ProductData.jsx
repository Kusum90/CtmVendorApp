import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  RefreshControl
} from 'react-native';
import { deleteProduct, getAllProduct, updateProduct } from '../../redux/Product/ProductSlice';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import Edit from '../../assets/svg/Productsvg/Edit';
import Delete from '../../assets/svg/Productsvg/Delete';
import { useNavigation } from '@react-navigation/native';
import CommonCalendar from '../../utils/datepicker';
import Plus from '../../assets/svg/Productsvg/Plus';
import Upload from '../../assets/svg/Productsvg/Upload';
import Download from '../../assets/svg/Productsvg/Download';

const ProductData = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Filter by');
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [isPaginationLoading, setIsPaginationLoading] = useState(false); // New loading state for pagination
  const productsPerPage = 10; // Defined by backend


  const filters = ['Published', 'Pending'];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, selectedDate, searchTerm, currentPage]);

  const fetchProducts = () => {
    setIsPaginationLoading(true); // Set loading for pagination
    dispatch(
      getAllProduct({
        page: currentPage,
        limit: productsPerPage,
        searchTerm,
        selectedDate: selectedDate || '',
        stockFilter: '',
        category: '',
      })
    ).finally(() => setIsPaginationLoading(false)); // Reset loading after fetch
  };

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedDate, selectedFilter, products]);

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((data) =>
        data.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (product) =>
          new Date(product.createdAt).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
    }

    console.log(products);
    const filteredProducts = products.filter(product => {
      console.log(product.title); // This will help you identify undefined titles
      return product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    

    setFilteredProducts(filtered);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchProducts();
    setIsRefreshing(false);
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleDelete = (productId) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Dispatch deleteProduct to update Redux state
              await dispatch(deleteProduct(productId)).unwrap();
  
              // Immediately update local state for instant feedback
              setFilteredProducts((prev) =>
                prev.filter((product) => product._id !== productId)
              );
  
              Alert.alert('Success', 'Product deleted successfully!');
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete the product. Please try again.');
            }
          },
        },
      ]
    );
  };
  
  

  const handleEdit = (productId) => {
    console.log(`Your Product id is ${productId}`);
    
    // Navigate to ProductDetails and pass productId as a parameter
    navigation.navigate('ProductDetails', { productId });
  };
  

  const handleUpdateProduct = () => {
    if (currentProduct) {
      dispatch(updateProduct(currentProduct));
      setIsEditModalVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item._id ? item._id.toString() : Math.random().toString()} style={styles.tableRow}>
        <View style={styles.actionsContainer}>
          {/* Edit button */}
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => handleEdit(item._id)} // Pass the current product's ID
          >
            <Edit width={50} height={50} />
          </TouchableOpacity>
  
          {/* Delete button */}
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => handleDelete(item._id)}
          >
            <Delete width={50} height={50} />
          </TouchableOpacity>
        </View>
  
        {/* Render other product information */}
        <Image source={{ uri: item.image[0] }} style={styles.productImage} />
        <Text style={styles.tableCell}>{item.title}</Text>
        <Text style={styles.tableCell}>{item.sku}</Text>
        <Text style={styles.tableCell}>{item.status}</Text>
        <Text style={styles.tableCell}>{item.stockQty}</Text>
        <Text style={styles.tableCell}>{item.price}</Text>
        <Text style={styles.tableCell}>{Array.isArray(item.taxonomies) ? item.taxonomies.join(', ') : 'N/A'}</Text>
        <Text style={styles.tableCell}>{item.productType}</Text>
        <Text style={styles.tableCell}>{item.views || 0}</Text>
        <Text style={styles.tableCell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    );
  };
  

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Actions</Text>
      <Text style={styles.tableHeaderText}>Image</Text>
      <Text style={styles.tableHeaderText}>Name</Text>
      <Text style={styles.tableHeaderText}>SKU</Text>
      <Text style={styles.tableHeaderText}>Status</Text>
      <Text style={styles.tableHeaderText}>Stock</Text>
      <Text style={styles.tableHeaderText}>Price</Text>
      <Text style={styles.tableHeaderText}>Taxonomies</Text>
      <Text style={styles.tableHeaderText}>Type</Text>
      <Text style={styles.tableHeaderText}>Views</Text>
      <Text style={styles.tableHeaderText}>Date</Text>
    </View>
  );

  const handleNextPage = () => {
    if (products.length === productsPerPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Inventory</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.iconButton, styles.greenButton]}
            onPress={() => navigation.navigate('ProductDetails')}
          >
            <Plus width={50} height={50} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.iconButton, styles.orangeButton]}>
            <Upload width={50} height={50} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.blueButton]}>
            <Download width={50} height={50} />
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterText}>{selectedFilter}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleSearchChange}
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

      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.editModal}>
            <Text style={styles.modalTitle}>Edit Product</Text>
            {currentProduct && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={currentProduct.title}
                  onChangeText={(text) => setCurrentProduct({ ...currentProduct, title: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="SKU"
                  value={currentProduct.sku}
                  onChangeText={(text) => setCurrentProduct({ ...currentProduct, sku: text })}
                />
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProduct}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.filterModal}>
            <Text style={styles.modalTitle}>Select Filter</Text>
            {filters.map((filter) => (
              <TouchableOpacity key={filter} onPress={() => handleFilterSelect(filter)}>
                <Text style={styles.filterOption}>{filter}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading || isPaginationLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="green" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {renderHeader()}
            
            <FlatList
              data={filteredProducts}
              renderItem={renderItem}
              keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh} // Add refresh control here
                />
              }
            />
            {filteredProducts && filteredProducts.length === 0 && <Text>No products found.</Text>}
            {error && (
              <Text style={styles.errorText}>
                {typeof error === 'string' ? error : (error.message ? error.message : 'An error occurred')}
              </Text>
            )}
             
          </View>
        </ScrollView>
      )}

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity onPress={handlePreviousPage} style={styles.paginationButton}>
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
        )}
        {products.length === productsPerPage && (
          <TouchableOpacity onPress={handleNextPage} style={styles.paginationButton}>
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(3),
  },
  flatListContainer: {
    paddingBottom: hp(2),
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  tableHeaderText: {
    width: wp(22.99),
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize(16),
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: wp(0.3),
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    width: wp(26),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {
    width: wp(12),
    height: wp(12),
    marginHorizontal: wp(2.5),
  },
  tableCell: {
    width: wp(24),
    textAlign: 'center',
    fontSize: FontSize(15),
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: FontSize(16),
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
    marginBottom: hp(1),
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
  editModal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalOption: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 6,
    textAlign: 'center',
    width: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: 'green', // Set pagination button color to green
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductData;
