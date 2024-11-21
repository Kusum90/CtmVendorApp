import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails, fetchProductDetails,updateProduct } from '../../../redux/Product/ProductSlice';

const ProductSustanibilityScreen = ({ route }) => {
  const [sustainability, setsustainability] = useState('');
  const [carbonfootprint, setcarbonfootprint] = useState('');
  const { productId } = route.params || {}; // Get productId from route if available

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Access Redux state for product details and loading status
  const { productDetails, loading } = useSelector((state) => state.products);

  // Fetch product details if productId is provided (for editing)
  useEffect(() => {
    if (productId) {
      console.log('Fetching product details for productId:', productId);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate fields if product details are available
  useEffect(() => {
    if (productId && productDetails && productDetails._id === productId) {
      console.log('Populating fields with existing product data:', productDetails);
      setsustainability(productDetails.sustainability || '');
      setcarbonfootprint(productDetails.carbonfootprint || '');
    }
  }, [productDetails, productId]);

  const prepareData = () => {
    return {
      _id: productId,
      sustainability: sustainability || '',
      carbonfootprint: carbonfootprint || '',
    };
  };

  const handleNext = async () => {
    const preparedData = prepareData();
    console.log('Sustainability Data:', preparedData);

    if (productId) {
      try {
        await dispatch(updateProduct(preparedData)).unwrap();
        console.log('Sustainability data updated successfully.');
      } catch (error) {
        console.error('Error updating sustainability data:', error);
      }
    } else {
      dispatch(setProductDetails(preparedData));
      console.log('Sustainability data saved locally.');
    }

    // Navigate to the next screen
    navigation.navigate('ProductMOQScreen', { productId });
  };

  return (
    <View style={styles.container}>
      {/* Display loader while fetching product details */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading Product Details...</Text>
        </View>
      ) : (
        <View style={styles.contentCard}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sustainability Remark</Text>
            <TextInput
              style={styles.input}
              value={sustainability}
              onChangeText={setsustainability}
              multiline
              placeholder="Enter sustainability remarks"
            />

            <Text style={styles.label}>Carbon Footprint</Text>
            <TextInput
              style={styles.input}
              value={carbonfootprint}
              onChangeText={setcarbonfootprint}
              multiline
              placeholder="Enter carbon footprint value"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={() => {
                console.log('Navigating back to the previous screen');
                navigation.goBack();
              }}
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
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
  },
  headerCard: {
    backgroundColor: '#f8f9fa',
    padding: wp(5),
    borderRadius: 10,
    marginBottom: hp(3),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: FontSize(22),
    fontWeight: 'bold',
    color: '#373737',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: wp(5),
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: hp(3),
  },
  label: {
    marginBottom: hp(1),
    color: '#373737',
    fontSize: FontSize(19),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(3),
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: FontSize(19),
    color: '#373737',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#28a745',
    padding: wp(3),
    borderRadius: 5,
    marginRight: wp(2),
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: wp(3),
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

export default ProductSustanibilityScreen;
