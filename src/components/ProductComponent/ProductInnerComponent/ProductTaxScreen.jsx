import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';
import { Picker } from '@react-native-picker/picker';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';

const ProductTaxScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { productId } = route.params || {}; // Retrieve productId from route params
  const { productDetails, loading } = useSelector((state) => state.products); // Fetch loading state and product details

  // Local state for form inputs
  const [taxStatus, setTaxStatus] = useState('taxable'); // Default value
  const [taxClass, setTaxClass] = useState('standard'); // Default value

  // Log the received productId for debugging
  useEffect(() => {
    console.log('Received productId:', productId);
  }, [productId]);

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
      setTaxStatus(productDetails.taxStatus || 'taxable');
      setTaxClass(productDetails.taxClass || 'standard');
    }
  }, [productDetails, productId]);

  // Update the specific field in Redux and log the changes
  const updateField = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    dispatch(setProductDetails({ [field]: value }));
  };

  const handleNext = async () => {
    const taxData = {
      taxStatus,
      taxClass,
    };

    console.log('Tax details being prepared for submission:', taxData);

    if (productId) {
      try {
        await dispatch(updateProduct({ ...taxData, _id: productId })).unwrap();
        console.log('Tax details successfully updated in backend.');
      } catch (error) {
        console.error('Error updating tax details:', error);
      }
    } else {
      dispatch(setProductDetails(taxData));
    }

    console.log('Tax details updated in Redux:', taxData);

    // Navigate to the next screen and pass productId
    navigation.navigate('ProductAttributeScreen', { productId });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Show loader while fetching product details */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.card}>
          {/* Tax Status Picker */}
          <View style={styles.section}>
            <Text style={styles.title}>Tax Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={taxStatus}
                onValueChange={(itemValue) => {
                  setTaxStatus(itemValue);
                  updateField('taxStatus', itemValue);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Taxable" value="taxable" />
                <Picker.Item label="Shipping Only" value="shipping only" />
                <Picker.Item label="None" value="none" />
              </Picker>
            </View>
          </View>

          {/* Tax Class Picker */}
          <View style={styles.section}>
            <Text style={styles.title}>Tax Class</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={taxClass}
                onValueChange={(itemValue) => {
                  setTaxClass(itemValue);
                  updateField('taxClass', itemValue);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Standard" value="standard" />
                <Picker.Item label="Reduced Rate" value="reduced rate" />
                <Picker.Item label="Zero Rate" value="zero rate" />
              </Picker>
            </View>
          </View>

          {/* Navigation Buttons */}
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
        </View>
      )}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),                    // Responsive padding
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: hp(2.5),             // Responsive margin
  },
  title: {
    fontSize: FontSize(21),            // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(1),               // Responsive margin
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: hp(5),                     // Responsive height
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),                 // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5),          // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),          // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19),            // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19),            // Responsive font size
    color: '#fff',
  },
});

export default ProductTaxScreen;
