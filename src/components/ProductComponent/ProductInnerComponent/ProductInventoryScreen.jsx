import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';

const ProductInventoryScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { productId } = route.params || {}; // Get productId from route params
  const { productDetails, loading } = useSelector((state) => state.products); // Fetch loading state and product details from Redux

  // Local state for form inputs
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [soldIndividually, setSoldIndividually] = useState(false);
  const [allowBackorders, setAllowBackorders] = useState('no');

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      console.log(`Fetching product details for product ID: ${productId}`);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate fields if editing an existing product
  useEffect(() => {
    if (productId && productDetails && productDetails._id === productId) {
      console.log('Populating fields with existing product data:', productDetails);
      setSku(productDetails.sku || '');
      setQuantity(productDetails.stockQty ? productDetails.stockQty.toString() : '');
      setSoldIndividually(productDetails.soldIndividually || false);
      setAllowBackorders(productDetails.allowBackorders || 'no');
    }
  }, [productDetails, productId]);

  // Handler to update Redux state with edited fields
  const updateField = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    dispatch(setProductDetails({ [field]: value }));
  };

  const handleNext = async () => {
    if (!sku || !quantity) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const inventoryData = {
      sku: sku || '',
      stockQty: quantity ? parseInt(quantity, 10) : 0,
      allowBackorders: allowBackorders || 'no',
      soldIndividually,
    };

    console.log('Inventory details being prepared for submission:', inventoryData);

    if (productId) {
      try {
        await dispatch(updateProduct({ ...inventoryData, _id: productId })).unwrap();
        console.log('Product inventory successfully updated in backend.');
      } catch (error) {
        console.error('Error updating product inventory:', error);
      }
    } else {
      dispatch(setProductDetails(inventoryData));
    }

    navigation.navigate('ProductShippingScreen', { productId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>{productId ? 'Edit Inventory' : 'Add Inventory'}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.inputCard}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>SKU</Text>
            <TextInput
              style={styles.input}
              value={sku}
              onChangeText={(text) => {
                setSku(text);
                updateField('sku', text);
              }}
              placeholder="Enter SKU"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={(text) => {
                setQuantity(text);
                updateField('stockQty', parseInt(text, 10));
              }}
              keyboardType="numeric"
              placeholder="Enter Quantity"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Allow Backorders</Text>
            <Picker
              selectedValue={allowBackorders}
              onValueChange={(value) => {
                setAllowBackorders(value);
                updateField('allowBackorders', value);
              }}
              style={styles.picker}
            >
              <Picker.Item label="No" value="no" />
              <Picker.Item label="Allow" value="allow" />
              <Picker.Item label="Notify" value="notify" />
            </Picker>
          </View>

          <View style={styles.checkboxItem}>
            <Switch
              value={soldIndividually}
              onValueChange={(value) => {
                setSoldIndividually(value);
                updateField('soldIndividually', value);
              }}
            />
            <Text style={styles.label}>Sold Individually</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.previousButton} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleNext}>
              <Text style={styles.buttonTextAdd}>{productId ? 'Update' : 'Next'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#fff',
  },
  titleCard: {
    padding: wp(5),
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: hp(2.5),
  },
  inputCard: {
    padding: wp(5),
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: FontSize(24),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#373737',
  },
  inputContainer: {
    marginBottom: hp(1.5),
  },
  label: {
    fontSize: FontSize(16),
    marginBottom: hp(0.5),
  },
  input: {
    height: hp(5),
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(2.5),
    borderRadius: 5,
  },
  picker: {
    height: hp(5),
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: hp(1.5),
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
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
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  buttonText: {
    fontSize: FontSize(16),
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(16),
    color: '#fff',
  },
});

export default ProductInventoryScreen;
