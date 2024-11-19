import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, fetchProductDetails, updateProduct } from '../../../redux/Product/ProductSlice';

const ProductPoliciesScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { productId } = route.params || {}; // Get productId if editing an existing product

  // Local state for policy fields
  const [overrideFields, setOverrideFields] = useState(false);
  const [policyLabel, setPolicyLabel] = useState('');
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [exchangePolicy, setExchangePolicy] = useState('');

  // Access product details and loading/error status from Redux
  const { productDetails, loading } = useSelector((state) => state.products);

  // Fetch product details if productId is provided
  useEffect(() => {
    if (productId) {
      console.log('Fetching product details for productId:', productId);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate policy fields with existing data if editing
  useEffect(() => {
    if (productId && productDetails) {
      console.log('Populating policy fields with existing data:', productDetails);
      setOverrideFields(productDetails.overridePolicyFields || false);
      setPolicyLabel(productDetails.policyTabLabel || '');
      setShippingPolicy(productDetails.shippingPolicy || '');
      setRefundPolicy(productDetails.refundPolicy || '');
      setExchangePolicy(productDetails.cancelReturnExchangePolicy || '');
    }
  }, [productDetails, productId]);

  // Prepare the data to send to Redux and backend
  const prepareData = () => {
    return {
      _id: productId,
      overridePolicyFields: overrideFields,
      policyTabLabel: policyLabel,
      shippingPolicy,
      refundPolicy,
      cancelReturnExchangePolicy: exchangePolicy,
    };
  };

  // Function to handle "Next" button press
  const handleNext = async () => {
    const preparedData = prepareData();
    console.log('Policy data being sent to Redux and backend:', preparedData);

    if (productId) {
      try {
        await dispatch(updateProduct(preparedData)).unwrap();
        console.log('Product policies successfully updated in backend.');
      } catch (error) {
        console.error('Error updating product policies:', error);
        Alert.alert('Error', 'Failed to update product policies. Please try again.');
        return;
      }
    } else {
      dispatch(setProductDetails(preparedData));
    }

    navigation.navigate('ProductAdvanceScreen', { productId });
    console.log('Navigating to ProductAdvanceScreen with productId:', productId);
  };

  const handlePrevious = () => {
    console.log('Navigating back to the previous screen');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading Product Policies...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.header}>Product Policies</Text>

          <View style={styles.checkboxContainer}>
            <Switch
              value={overrideFields}
              onValueChange={(value) => {
                setOverrideFields(value);
                dispatch(setProductDetails({ overridePolicyFields: value }));
                console.log('Override Policy Fields set to:', value);
              }}
            />
            <Text style={styles.checkboxLabel}>Override Policy Fields</Text>
          </View>

          {overrideFields && (
            <TextInput
              style={styles.input}
              placeholder="Policy Tab Label"
              value={policyLabel}
              onChangeText={(value) => {
                setPolicyLabel(value);
                dispatch(setProductDetails({ policyTabLabel: value }));
              }}
            />
          )}

          <TextInput
            style={styles.textarea}
            placeholder="Shipping Policy"
            multiline
            value={shippingPolicy}
            onChangeText={(value) => {
              setShippingPolicy(value);
              dispatch(setProductDetails({ shippingPolicy: value }));
            }}
          />

          <TextInput
            style={styles.textarea}
            placeholder="Refund Policy"
            multiline
            value={refundPolicy}
            onChangeText={(value) => {
              setRefundPolicy(value);
              dispatch(setProductDetails({ refundPolicy: value }));
            }}
          />

          <TextInput
            style={styles.textarea}
            placeholder="Cancellation/Return/Exchange Policy"
            multiline
            value={exchangePolicy}
            onChangeText={(value) => {
              setExchangePolicy(value);
              dispatch(setProductDetails({ cancelReturnExchangePolicy: value }));
            }}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
              <Text style={styles.buttonText1}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4), // Responsive padding
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: FontSize(23), // Responsive font size
    color: '#333',
    marginBottom: hp(2), // Responsive margin
    color: '#373737'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive margin
  },
  checkboxLabel: {
    marginLeft: wp(2), // Responsive margin
    fontSize: FontSize(19), // Responsive font size
    color: '#333',
  },
  input: {
    height: hp(7), // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), // Responsive margin
    paddingHorizontal: wp(2), // Responsive padding
    fontSize: FontSize(19),
  },
  textarea: {
    height: hp(10), // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), // Responsive margin
    paddingHorizontal: wp(2), // Responsive padding
    paddingVertical: wp(2), // Responsive padding
    textAlignVertical: 'top', // Ensures text starts at the top in multiline input
    fontSize: FontSize(19),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2), // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  nextButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
  buttonText1: {
    fontSize: FontSize(19), // Responsive font size
    color: '#373737',
  },
});

export default ProductPoliciesScreen;
