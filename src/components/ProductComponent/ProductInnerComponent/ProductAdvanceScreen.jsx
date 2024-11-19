import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useNavigation } from '@react-navigation/native';
import { setProductDetails, createProduct, updateProduct, fetchDashboardData } from '../../../redux/Product/ProductSlice';

const ProductAdvanceScreen = ({ route }) => {
  const { productId } = route.params || {}; // Get productId if editing
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.products.productDetails);

  // Local state for final fields on this screen
  const [enableReviews, setEnableReviews] = useState(false);
  const [purchaseNote, setPurchaseNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Populate fields if editing an existing product
  useEffect(() => {
    if (productId && productDetails) {
      setEnableReviews(productDetails.enableReviews || false);
      setPurchaseNote(productDetails.purchaseNote || '');
    }
  }, [productDetails, productId]);

  const handleAddOrUpdate = async () => {
    try {
      setLoading(true);

      // Only send updates for this screen when editing
      const currentPageData = {
        enableReviews,
        purchaseNote,
      };

      if (productId) {
        console.log('Updating only Advance Settings:', currentPageData);
        const result = await dispatch(updateProduct({ _id: productId, ...currentPageData })).unwrap();
        console.log('Product updated successfully:', result);
        showToastMessage('Product updated successfully!');
        navigation.navigate('ProductScreen');
      } else {
        console.log('Creating product with all details:', productDetails);
        const result = await dispatch(createProduct({ ...productDetails, ...currentPageData })).unwrap();
        console.log('Product created successfully:', result);
        showToastMessage('Product created successfully!');
        dispatch(fetchDashboardData()); // Refresh dashboard data
        navigation.navigate('ProductScreen');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error creating/updating product:', error);

      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`Validation Error ${index + 1}:`, err);
        });
      }

      showToastMessage('Failed to create/update the product. Please try again.');
      setLoading(false);
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Advance Settings</Text>

      <View style={styles.checkboxContainer}>
        <Switch
          value={enableReviews}
          onValueChange={(value) => setEnableReviews(value)}
        />
        <Text style={styles.checkboxLabel}>Enable reviews</Text>
      </View>

      <TextInput
        style={styles.textarea}
        placeholder="Purchase Note"
        multiline
        value={purchaseNote}
        onChangeText={setPurchaseNote}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#28a745" />
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={handleAddOrUpdate}>
            <Text style={styles.buttonText}>{productId ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {showToast && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  header: {
    fontSize: FontSize(18),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  checkboxLabel: {
    marginLeft: wp(2),
    fontSize: FontSize(16),
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: wp(2),
    fontSize: FontSize(14),
    marginVertical: hp(1),
  },
  buttonContainer: {
    marginTop: hp(3),
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize(16),
    fontWeight: 'bold',
  },
  toastContainer: {
    position: 'absolute',
    bottom: hp(10),
    alignSelf: 'center',
    backgroundColor: '#333',
    padding: wp(4),
    borderRadius: 4,
  },
  toastText: {
    color: '#fff',
    fontSize: FontSize(14),
  },
});

export default ProductAdvanceScreen;
