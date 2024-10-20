import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/Coupon/Coupon'; // Action to fetch products
import { setProductDetails } from '../../../redux/Product/ProductSlice'; // Action to update product details

const ProductLinkedScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Fetching up-sells and cross-sells from Redux state
  const {
    upSells: initialUpSells = [],
    crossSells: initialCrossSells = [],
    loading,
    error,
  } = useSelector((state) => state.products.productDetails);

  const [upSells, setUpSellsState] = useState(initialUpSells || []);
  const [crossSells, setCrossSellsState] = useState(initialCrossSells || []);
  const [searchUpSell, setSearchUpSell] = useState('');
  const [searchCrossSell, setSearchCrossSell] = useState('');

  const [upSellProducts, setUpSellProducts] = useState([]);
  const [crossSellProducts, setCrossSellProducts] = useState([]);

  // Fetch products for up-sell based on search input
  useEffect(() => {
    if (searchUpSell) {
      dispatch(fetchProducts(searchUpSell))
        .unwrap()
        .then((products) => setUpSellProducts(products))
        .catch((error) =>
          ToastAndroid.showWithGravity(
            `Error: ${error}`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
        );
    } else {
      setUpSellProducts([]); // Clear products list when search term is empty
    }
  }, [searchUpSell, dispatch]);

  // Fetch products for cross-sell based on search input
  useEffect(() => {
    if (searchCrossSell) {
      dispatch(fetchProducts(searchCrossSell))
        .unwrap()
        .then((products) => setCrossSellProducts(products))
        .catch((error) =>
          ToastAndroid.showWithGravity(
            `Error: ${error}`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
        );
    } else {
      setCrossSellProducts([]); // Clear products list when search term is empty
    }
  }, [searchCrossSell, dispatch]);

  // Toggle selected up-sell product
  const toggleUpSell = (product) => {
    const updatedUpSells = upSells.includes(product._id)
      ? upSells.filter((item) => item !== product._id)
      : [...upSells, product._id];
    setUpSellsState(updatedUpSells);
    dispatch(setProductDetails({ upSells: updatedUpSells }));
  };

  // Toggle selected cross-sell product
  const toggleCrossSell = (product) => {
    const updatedCrossSells = crossSells.includes(product._id)
      ? crossSells.filter((item) => item !== product._id)
      : [...crossSells, product._id];
    setCrossSellsState(updatedCrossSells);
    dispatch(setProductDetails({ crossSells: updatedCrossSells }));
  };

  // Handle "Next" button click
  const handleNext = () => {
    // Log the current up-sells and cross-sells
    console.log('Up-sells passed:', upSells);
    console.log('Cross-sells passed:', crossSells);

    // Navigate to the next screen
    navigation.navigate('ProductSeoScreen');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Display error if any */}
      {error && (
        <Text style={styles.errorText}>Error fetching products: {error}</Text>
      )}

      {/* Show loading indicator */}
      {loading && <Text style={styles.loadingText}>Loading products...</Text>}

      {/* Up-sells Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Up-sells</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Up-sell Products"
          value={searchUpSell}
          onChangeText={setSearchUpSell}
        />
        <View style={styles.selectedContainer}>
          {upSells.map((productId) => (
            <View key={productId} style={styles.selectedBox}>
              <Text style={styles.selectedText}>
                {upSellProducts.find((p) => p._id === productId)?.title || 'Product'}
              </Text>
              <TouchableOpacity onPress={() => toggleUpSell({ _id: productId })}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {upSellProducts.length === 0 && !loading && searchUpSell && (
          <Text>No products found for Up-sell.</Text>
        )}
        <FlatList
          data={upSellProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.productItem,
                upSells.includes(item._id) && styles.selectedProduct,
              ]}
              onPress={() => toggleUpSell(item)}
            >
              <Text style={styles.productText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Cross-sells Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Cross-sells</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Cross-sell Products"
          value={searchCrossSell}
          onChangeText={setSearchCrossSell}
        />
        <View style={styles.selectedContainer}>
          {crossSells.map((productId) => (
            <View key={productId} style={styles.selectedBox}>
              <Text style={styles.selectedText}>
                {crossSellProducts.find((p) => p._id === productId)?.title || 'Product'}
              </Text>
              <TouchableOpacity onPress={() => toggleCrossSell({ _id: productId })}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {crossSellProducts.length === 0 && !loading && searchCrossSell && (
          <Text>No products found for Cross-sell.</Text>
        )}
        <FlatList
          data={crossSellProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.productItem,
                crossSells.includes(item._id) && styles.selectedProduct,
              ]}
              onPress={() => toggleCrossSell(item)}
            >
              <Text style={styles.productText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Buttons for navigation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleNext}
        >
          <Text style={styles.buttonTextAdd}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
  },
  section: {
    marginBottom: hp(2.5),
  },
  header: {
    fontSize: FontSize(22),
    fontWeight: 'bold',
    marginBottom: hp(1),
    color: '#373737',
  },
  searchInput: {
    height: hp(6),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: hp(1.5),
    paddingHorizontal: wp(3),
  },
  productItem: {
    padding: hp(2),
    backgroundColor: '#f9f9f9',
    marginBottom: hp(1),
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  productText: {
    fontSize: FontSize(18),
  },
  selectedProduct: {
    backgroundColor: '#d1e7dd',
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp(1),
  },
  selectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f0ff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    marginRight: wp(2),
    marginBottom: hp(1),
    borderRadius: 4,
  },
  selectedText: {
    fontSize: FontSize(16),
  },
  removeText: {
    marginLeft: wp(2),
    color: 'red',
    fontSize: FontSize(18),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
  },
  buttonText: {
    fontSize: FontSize(19),
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19),
    color: '#fff',
  },
  loadingText: {
    fontSize: FontSize(16),
    color: 'gray',
    textAlign: 'center',
  },
  errorText: {
    fontSize: FontSize(16),
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductLinkedScreen;
