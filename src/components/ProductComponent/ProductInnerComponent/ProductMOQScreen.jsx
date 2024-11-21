import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';

const ProductMOQScreen = ({ route }) => {
  const [moq, setMoq] = useState('');
  const [quantities, setQuantities] = useState([{ minQty: '', maxQty: '', price: '' }]);
  const [savedQuantities, setSavedQuantities] = useState([]);
  const { productId } = route.params || {}; // Get productId from route if available

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { productDetails, loading } = useSelector((state) => state.products);

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      console.log('Fetching product details for editing:', productId);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate fields if editing an existing product
  useEffect(() => {
    if (productId && productDetails && productDetails._id === productId) {
      console.log('Populating fields with existing product data:', productDetails);
      setMoq(productDetails.minimumOrderQuantity ? String(productDetails.minimumOrderQuantity) : '');
      setSavedQuantities(productDetails.priceRanges || []);
    }
  }, [productDetails, productId]);

  // Handler to update Redux state with edited fields
  const updateField = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    dispatch(setProductDetails({ [field]: value }));
  };

  const prepareData = () => {
    return {
      _id: productId,
      minimumOrderQuantity: moq ? parseInt(moq, 10) : 0,
      priceRanges: savedQuantities,
    };
  };

  const handleNext = async () => {
    if (!moq) {
      Alert.alert('Validation Error', 'Please enter a valid minimum order quantity.');
      return;
    }

    // if (savedQuantities.length === 0) {
    //   Alert.alert('Validation Error', 'Please add at least one quantity range.');
    //   return;
    // }

    const preparedData = prepareData();
    console.log('Data being sent to backend:', preparedData);

    if (productId) {
      try {
        await dispatch(updateProduct(preparedData)).unwrap();
        console.log('Product successfully updated in backend.');
      } catch (error) {
        console.error('Error updating product:', error);
        Alert.alert('Error', 'Failed to update product. Please try again.');
        return;
      }
    } else {
      dispatch(setProductDetails(preparedData));
    }

    navigation.navigate('ProductUnitsScreen', { productId });
    console.log('Navigating to ProductUnitsScreen with productId:', productId);
  };

  const handleAddMore = () => {
    if (quantities.length < 5) {
      setQuantities([...quantities, { minQty: '', maxQty: '', price: '' }]);
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 5 quantity ranges.');
    }
  };

  const handleDone = () => {
    if (quantities.some((q) => (q.minQty || q.maxQty || q.price) && (!q.minQty || !q.maxQty || !q.price))) {
      Alert.alert('Validation Error', 'Please complete all fields in the range before saving.');
      return;
    }
    const newQuantities = quantities.filter((q) => q.minQty && q.maxQty && q.price);

    console.log('Saving quantities:', newQuantities);

    setSavedQuantities([...savedQuantities, ...newQuantities]);
    setQuantities([{ minQty: '', maxQty: '', price: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuantities = quantities.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuantities(updatedQuantities);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading Product Details...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>MOQ</Text>
          </View>

          <Text style={styles.label}>Minimum Order Quantity</Text>
          <TextInput
            style={styles.input}
            value={moq}
            onChangeText={(value) => {
              setMoq(value);
              updateField('minimumOrderQuantity', value);
            }}
            keyboardType="numeric"
            placeholder="Enter MOQ"
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Quantity</Text>
            {quantities.map((quantity, index) => (
              <View key={index} style={styles.quantityContainer}>
                <TextInput
                  style={styles.quantityInput}
                  placeholder="Min Quantity"
                  value={quantity.minQty}
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(index, 'minQty', value)}
                />
                <TextInput
                  style={styles.quantityInput}
                  placeholder="Max Quantity"
                  value={quantity.maxQty}
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(index, 'maxQty', value)}
                />
                <TextInput
                  style={styles.quantityInput}
                  placeholder="Price"
                  value={quantity.price}
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(index, 'price', value)}
                />
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={handleAddMore}>
                <Text style={styles.buttonTextAdd}>Add More</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.buttonTextAdd}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Quantities</Text>
            {savedQuantities.map((quantity, index) => (
              <View key={index} style={styles.savedBox}>
                <Text style={styles.savedText}>
                  {`Min: ${quantity.minQty}, Max: ${quantity.maxQty}, Price: ${quantity.price}`}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.previousButton} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonTextNext}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: wp(5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: FontSize(24),
    fontWeight: 'bold',
    color: '#373737',
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  label: {
    fontSize: FontSize(19),
    marginBottom: hp(2),
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp(3),
    fontSize: FontSize(16),
  },
  section: {
    marginTop: hp(3),
  },
  sectionTitle: {
    fontSize: FontSize(21),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: '#373737',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  quantityInput: {
    width: wp(25),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: wp(2),
    fontSize: FontSize(18),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  doneButton: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: FontSize(19),
    color: 'black',
  },
  buttonTextNext: {
    fontSize: FontSize(19),
    color: '#fff',
  },
  buttonTextAdd: {
    fontSize: FontSize(19),
    color: '#fff',
  },
  savedBox: {
    backgroundColor: '#e1f0ff',
    padding: wp(2),
    marginBottom: hp(1),
    borderRadius: 4,
  },
  savedText: {
    fontSize: FontSize(16),
    color: '#373737',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
    paddingHorizontal: wp(5),
  },
  previousButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 5,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  nextButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default ProductMOQScreen;
