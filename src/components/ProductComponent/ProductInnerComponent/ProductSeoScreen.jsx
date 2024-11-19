import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { setProductDetails, fetchProductDetails } from '../../../redux/Product/ProductSlice';

const ProductSeoScreen = ({ route }) => {
  const { productId } = route.params || {}; // Get product ID if editing an existing product
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { productDetails, loading } = useSelector((state) => state.products); // Fetch product details and loading state

  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Fetch product details if editing an existing product
  useEffect(() => {
    if (productId) {
      console.log(`Fetching product details for product ID: ${productId}`);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate SEO fields if editing an existing product
  useEffect(() => {
    if (productId && productDetails) {
      console.log('Populating SEO fields with product data:', productDetails);
      setFocusKeyword(productDetails.focusKeyword || '');
      setMetaDescription(productDetails.metaDescription || '');
    }
  }, [productId, productDetails]);

  const handleNext = () => {
    const seoDetails = {
      focusKeyword: focusKeyword.trim(),
      metaDescription: metaDescription.trim(),
    };

    console.log('SEO Details passed to Redux:', seoDetails);

    // Dispatch SEO details to Redux store
    dispatch(setProductDetails(seoDetails));

    // Navigate to the next screen
    navigation.navigate('ProductMandatePointScreen', { productId });
  };

  return (
    <View style={styles.container}>
      {/* Loading indicator while fetching product details */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0EAB3D" />
          <Text>Loading SEO details...</Text>
        </View>
      ) : (
        <>
          {/* Main Content Card */}
          <View style={styles.contentCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter a focus keyword</Text>
              <TextInput
                style={styles.input}
                value={focusKeyword}
                onChangeText={(text) => setFocusKeyword(text)}
                multiline
                placeholder="Enter keyword for SEO optimization"
              />

              <Text style={styles.label}>Meta description</Text>
              <TextInput
                style={styles.input}
                value={metaDescription}
                onChangeText={(text) => setMetaDescription(text)}
                multiline
                placeholder="Enter description for SEO"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonOutline}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={handleNext}
              >
                <Text style={styles.buttonText1}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5), // Responsive padding
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: wp(5), // Responsive padding
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: hp(3), // Responsive margin
  },
  label: {
    marginBottom: hp(1), // Responsive margin
    color: '#373737',
    fontSize: FontSize(19),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(3), // Responsive padding
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: FontSize(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#28a745',
    padding: wp(3), // Responsive padding
    borderRadius: 5,
    marginRight: wp(2), // Responsive margin
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: wp(3), // Responsive padding
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize(19),
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize(19),
  },
});

export default ProductSeoScreen;
