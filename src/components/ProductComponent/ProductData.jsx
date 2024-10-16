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
import { deleteProduct, getAllProduct,updateProduct } from '../../redux/Product/ProductSlice';
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
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  useEffect(() => {
    dispatch(
      getAllProduct({
        page: 1,
        limit: 10,
        searchTerm,
        selectedDate: selectedDate || '',
        stockFilter: '',
        category: '',
      })
    );
  }, [dispatch, selectedDate, searchTerm]);


  useEffect(() => {
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

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedDate]);

  // Handle pull-to-refresh logic
  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getAllProduct({
        page: 1,
        limit: 10,
        searchTerm,
        selectedDate: selectedDate || '',
        stockFilter: '',
        category: '',
      })
    ).then(() => setIsRefreshing(false));
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
          onPress: () => {
            dispatch(deleteProduct(productId));
          },
        },
      ]
    );
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditModalVisible(true);
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
          <TouchableOpacity style={styles.editButton}onPress={() => handleEdit(item)}>
            <Edit width={50} height={50} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
            <Delete width={50} height={50} />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.image[0] }} style={styles.productImage} />
        <Text style={styles.tableCell}>{item.title}</Text>
        <Text style={styles.tableCell}>{item.sku}</Text>
        <Text style={styles.tableCell}>{item.status || 'Available'}</Text>
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
          <TouchableOpacity style={[styles.iconButton, styles.orangeButton]}>
            <Upload width={50} height={50} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.blueButton]}>
            <Download width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter by</Text>
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
                <TextInput
                  style={styles.input}
                  placeholder="Status"
                  value={currentProduct.status}
                  onChangeText={(text) => setCurrentProduct({ ...currentProduct, status: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Stock"
                  keyboardType="numeric"
                  value={currentProduct.stockQty?.toString()}
                  onChangeText={(text) => setCurrentProduct({ ...currentProduct, stockQty: Number(text) })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  keyboardType="numeric"
                  value={currentProduct.price?.toString()}
                  onChangeText={(text) => setCurrentProduct({ ...currentProduct, price: Number(text) })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Taxonomies"
                  value={Array.isArray(currentProduct.taxonomies) ? currentProduct.taxonomies.join(', ') : ''}
                  onChangeText={(text) => setCurrentProduct({ ...currentProduct, taxonomies: text.split(', ') })}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProduct}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#000" />
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
    paddingBottom: hp(2), // Add padding to the bottom of the list
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
export default ProductData;