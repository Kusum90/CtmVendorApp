import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/Coupon/Coupon'; // Action to fetch products
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';

const ProductLinkedScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { productId } = route.params || {}; // Product ID for editing if available
  const { productDetails, loading } = useSelector((state) => state.products);

  const [upSells, setUpSellsState] = useState([]);
  const [crossSells, setCrossSellsState] = useState([]);
  const [searchUpSell, setSearchUpSell] = useState('');
  const [searchCrossSell, setSearchCrossSell] = useState('');
  const [upSellProducts, setUpSellProducts] = useState([]);
  const [crossSellProducts, setCrossSellProducts] = useState([]);
  const [selectedUpSellTitles, setSelectedUpSellTitles] = useState({});
  const [selectedCrossSellTitles, setSelectedCrossSellTitles] = useState({});

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      console.log(`Fetching product details for product ID: ${productId}`);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate up-sells and cross-sells if editing
  useEffect(() => {
    if (productId && productDetails && productDetails._id === productId) {
      console.log('Populating up-sells and cross-sells from product details:', productDetails);
      const upSellsIds = productDetails.upSells?.map((upSell) => upSell.id) || [];
      const crossSellsIds = productDetails.crossSells?.map((crossSell) => crossSell.id) || [];
      const upSellsTitles = {};
      const crossSellsTitles = {};
      productDetails.upSells?.forEach((upSell) => {
        upSellsTitles[upSell.id] = upSell.title;
      });
      productDetails.crossSells?.forEach((crossSell) => {
        crossSellsTitles[crossSell.id] = crossSell.title;
      });

      setUpSellsState(upSellsIds);
      setCrossSellsState(crossSellsIds);
      setSelectedUpSellTitles(upSellsTitles);
      setSelectedCrossSellTitles(crossSellsTitles);
    }
  }, [productDetails, productId]);

  // Fetch products for up-sell search
  useEffect(() => {
    if (searchUpSell) {
      dispatch(fetchProducts(searchUpSell))
        .unwrap()
        .then((products) => setUpSellProducts(products))
        .catch((error) => Alert.alert('Error', `Failed to fetch up-sell products: ${error}`));
    } else {
      setUpSellProducts([]);
    }
  }, [searchUpSell, dispatch]);

  // Fetch products for cross-sell search
  useEffect(() => {
    if (searchCrossSell) {
      dispatch(fetchProducts(searchCrossSell))
        .unwrap()
        .then((products) => setCrossSellProducts(products))
        .catch((error) => Alert.alert('Error', `Failed to fetch cross-sell products: ${error}`));
    } else {
      setCrossSellProducts([]);
    }
  }, [searchCrossSell, dispatch]);

  // Prepare data for saving
  const prepareData = () => {
    return {
      _id: productId,
      upSells,
      crossSells,
    };
  };

  // Handle "Next" button click
  const handleNext = async () => {
    const preparedData = prepareData();
    console.log('Data being sent to backend:', preparedData);

    if (productId) {
      try {
        await dispatch(updateProduct(preparedData)).unwrap();
        console.log('Product successfully updated in backend.');
      } catch (error) {
        console.error('Error updating product:', error);
        Alert.alert('Error', 'Failed to update product.');
        return;
      }
    } else {
      dispatch(setProductDetails(preparedData));
    }

    navigation.navigate('ProductSeoScreen', { productId });
  };

  // Toggle selected up-sell product
  const toggleUpSell = (product) => {
    const updatedUpSells = upSells.includes(product._id)
      ? upSells.filter((item) => item !== product._id)
      : [...upSells, product._id];
    setUpSellsState(updatedUpSells);

    const updatedTitles = { ...selectedUpSellTitles };
    if (upSells.includes(product._id)) {
      delete updatedTitles[product._id];
    } else {
      updatedTitles[product._id] = product.title;
    }
    setSelectedUpSellTitles(updatedTitles);
  };

  // Toggle selected cross-sell product
  const toggleCrossSell = (product) => {
    const updatedCrossSells = crossSells.includes(product._id)
      ? crossSells.filter((item) => item !== product._id)
      : [...crossSells, product._id];
    setCrossSellsState(updatedCrossSells);

    const updatedTitles = { ...selectedCrossSellTitles };
    if (crossSells.includes(product._id)) {
      delete updatedTitles[product._id];
    } else {
      updatedTitles[product._id] = product.title;
    }
    setSelectedCrossSellTitles(updatedTitles);
  };

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0EAB3D" />
          <Text>Loading product details...</Text>
        </View>
      )}

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
                {selectedUpSellTitles[productId] || 'Product'}
              </Text>
              <TouchableOpacity onPress={() => toggleUpSell({ _id: productId })}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <FlatList
          data={upSellProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.productItem, upSells.includes(item._id) && styles.selectedProduct]}
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
                {selectedCrossSellTitles[productId] || 'Product'}
              </Text>
              <TouchableOpacity onPress={() => toggleCrossSell({ _id: productId })}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <FlatList
          data={crossSellProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.productItem, crossSells.includes(item._id) && styles.selectedProduct]}
              onPress={() => toggleCrossSell(item)}
            >
              <Text style={styles.productText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.previousButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleNext}>
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
