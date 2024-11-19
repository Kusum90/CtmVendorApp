import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';

const ProductUnitsScreen = ({ route }) => {
  const [unitsOfMeasure, setUnitsOfMeasure] = useState(''); // State for units of measure
  const { productId } = route.params || {}; // Get productId from route if available
  const dispatch = useDispatch(); // Initialize dispatch function
  const navigation = useNavigation(); // Initialize navigation hook

  // Access Redux state for product details and loading status
  const { productDetails, loading } = useSelector((state) => state.products);

  // Fetch product details if productId is provided (for editing)
  useEffect(() => {
    if (productId) {
      console.log('Fetching product details for productId:', productId);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate units of measure if editing an existing product
  useEffect(() => {
    if (productId && productDetails) {
      console.log('Populating units of measure:', productDetails.unitOfMeasure || '');
      setUnitsOfMeasure(productDetails.unitOfMeasure || '');
    }
  }, [productDetails, productId]);

  // Prepare the data to send to Redux and backend
  const prepareData = () => {
    return {
      _id: productId,
      unitOfMeasure: unitsOfMeasure,
    };
  };

  // Function to handle "Next" button press
  const handleNext = async () => {
    if (!unitsOfMeasure) {
      Alert.alert('Validation Error', 'Please enter the unit of measure');
      return;
    }

    const preparedData = prepareData();
    console.log('Prepared data being sent to Redux and backend:', preparedData);

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

    // Navigate to the next screen
    navigation.navigate('ProductPoliciesScreen', { productId });
    console.log('Navigating to ProductPoliciesScreen with productId:', productId);
  };

  return (
    <View style={styles.container}>
      {/* Display loading indicator if product details are being fetched */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading Product Details...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.label}>Units of Measure</Text>
          <TextInput
            style={styles.input}
            value={unitsOfMeasure}
            onChangeText={(value) => {
              setUnitsOfMeasure(value);
              dispatch(setProductDetails({ unitOfMeasure: value })); // Update Redux state immediately
            }}
            placeholder="e.g., kg, liter, piece"
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        {/* Previous Button */}
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity style={styles.buttonFilled} onPress={handleNext}>
          <Text style={styles.buttonText1}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: wp(5), // Responsive padding
    paddingTop: hp(3), // Responsive padding
  },
  label: {
    fontSize: FontSize(19), // Responsive font size
    marginBottom: hp(2), // Responsive margin
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp(3), // Responsive padding
    fontSize: FontSize(19), // Responsive font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: wp(5), // Responsive padding
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 5,
    padding: wp(3), // Responsive padding
    flex: 1,
    marginRight: wp(2), // Responsive margin
  },
  buttonFilled: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: wp(3), // Responsive padding
    flex: 1,
    marginLeft: wp(2), // Responsive margin
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize(19), // Responsive font size
  },
  buttonText1: {
    color: '#fff',
    textAlign: 'center',
    fontSize: FontSize(19), // Responsive font size
  },
});

export default ProductUnitsScreen;
