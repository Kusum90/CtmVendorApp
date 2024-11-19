import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';

const ProductShippingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { productId } = route.params || {}; // Retrieve productId from route params
  const { productDetails, loading } = useSelector((state) => state.products); // Fetch loading state and product details

  // Local state for form inputs
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [selectedProcessingTime, setSelectedProcessingTime] = useState('1 business day');
  const [selectedShippingClass, setSelectedShippingClass] = useState('Free Shipping');

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
      setWeight(productDetails.weight ? productDetails.weight.toString() : '');
      setDimensions({
        length: productDetails.length ? productDetails.length.toString() : '',
        width: productDetails.width ? productDetails.width.toString() : '',
        height: productDetails.height ? productDetails.height.toString() : '',
      });
      setSelectedShippingClass(productDetails.shippingClass || 'Free Shipping');
      setSelectedProcessingTime(productDetails.processingTime || '1 business day');
    }
  }, [productDetails, productId]);

  const handleDimensionChange = (key, value) => {
    setDimensions((prevDimensions) => ({ ...prevDimensions, [key]: value }));
    updateField(key, parseFloat(value) || '');
  };

  const updateField = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    dispatch(setProductDetails({ [field]: value }));
  };

  const handleNext = async () => {
    const shippingData = {
      weight: weight ? parseFloat(weight) : null,
      length: dimensions.length ? parseFloat(dimensions.length) : null,
      width: dimensions.width ? parseFloat(dimensions.width) : null,
      height: dimensions.height ? parseFloat(dimensions.height) : null,
      shippingClass: selectedShippingClass,
      processingTime: selectedProcessingTime,
    };

    console.log('Shipping details being prepared for submission:', shippingData);

    if (productId) {
      try {
        await dispatch(updateProduct({ ...shippingData, _id: productId })).unwrap();
        console.log('Shipping details successfully updated in backend.');
      } catch (error) {
        console.error('Error updating shipping details:', error);
      }
    } else {
      dispatch(setProductDetails(shippingData));
    }

    navigation.navigate('ProductTaxScreen', { productId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>{productId ? 'Edit Shipping Details' : 'Add Shipping Details'}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.card}>
          {/* Weight Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Weight (gms)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={(text) => {
                setWeight(text);
                updateField('weight', parseFloat(text));
              }}
              keyboardType="numeric"
              placeholder="Enter product weight"
            />
          </View>

          {/* Dimensions Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Dimensions</Text>
            <View style={styles.dimensionButtons}>
              <TextInput
                placeholder="Length"
                value={dimensions.length}
                onChangeText={(value) => handleDimensionChange('length', value)}
                style={styles.dimensionInput}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Width"
                value={dimensions.width}
                onChangeText={(value) => handleDimensionChange('width', value)}
                style={styles.dimensionInput}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Height"
                value={dimensions.height}
                onChangeText={(value) => handleDimensionChange('height', value)}
                style={styles.dimensionInput}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Shipping Class Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Shipping Class</Text>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => {
                setSelectedShippingClass('Free Shipping');
                updateField('shippingClass', 'Free Shipping');
              }}
            >
              <View
                style={[
                  styles.radioButtonIcon,
                  selectedShippingClass === 'Free Shipping' && styles.radioButtonIconChecked,
                ]}
              />
              <Text style={styles.radioButtonText}>Free Shipping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => {
                setSelectedShippingClass('Third Party Shipping');
                updateField('shippingClass', 'Third Party Shipping');
              }}
            >
              <View
                style={[
                  styles.radioButtonIcon,
                  selectedShippingClass === 'Third Party Shipping' && styles.radioButtonIconChecked,
                ]}
              />
              <Text style={styles.radioButtonText}>Third Party Shipping</Text>
            </TouchableOpacity>
          </View>

          {/* Processing Time Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Processing Time</Text>
            {[
              '1 business day',
              '1-2 business days',
              '1-3 business days',
              '3-5 business days',
              '1-2 weeks',
              '2-3 weeks',
              '3-4 weeks',
              '4-6 weeks',
              '6-8 weeks',
            ].map((time, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioButton}
                onPress={() => {
                  setSelectedProcessingTime(time);
                  updateField('processingTime', time);
                }}
              >
                <View
                  style={[
                    styles.radioButtonIcon,
                    selectedProcessingTime === time && styles.radioButtonIconChecked,
                  ]}
                />
                <Text style={styles.radioButtonText}>{time}</Text>
              </TouchableOpacity>
            ))}
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
        </View>
      )}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(5),
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: wp(4),
    marginBottom: hp(2.5),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  headerText: {
    fontSize: FontSize(24),
    fontWeight: 'bold',
    color: '#373737',
  },
  section: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: FontSize(18),
    marginBottom: hp(1),
  },
  input: {
    height: hp(5),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(1),
  },
  dimensionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionInput: {
    width: wp(25),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: wp(2),
    height: hp(5),
    textAlign: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  radioButtonIcon: {
    width: wp(5),
    height: wp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: wp(2),
  },
  radioButtonIconChecked: {
    backgroundColor: 'green',
  },
  radioButtonText: {
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
    fontSize: FontSize(18),
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(18),
    color: '#fff',
  },
});

export default ProductShippingScreen;
