import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; 
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { setProductDetails, createProduct } from '../../../redux/Product/ProductSlice'; 

const ProductAdvanceScreen = () => {
  const dispatch = useDispatch(); 
  const productDetails = useSelector((state) => state.products.productDetails); 

  const [enableReviews, setEnableReviews] = useState(false);
  const [purchaseNote, setPurchaseNote] = useState('');
  const [loading, setLoading] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  const [showToast, setShowToast] = useState(false); 

  const handleAdd = async () => {
    try {
      setLoading(true);
      
      // Log and update product details with data from the final screen
      dispatch(setProductDetails({ enableReviews, purchaseNote }));

      // Validate required fields from product details
      if (!productDetails.title || !productDetails.price) {
        alert('Product title and price are required!');
        setLoading(false);
        return;
      }

      // Create the product with the final collected product details
      const result = await dispatch(createProduct(productDetails)).unwrap();
      console.log('Product created successfully:', result);

      // Show success toast
      showToastMessage('Product created successfully!');
      setLoading(false);

    } catch (error) {
      console.error('Error creating product:', error);

      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`Validation Error ${index + 1}:`, err);
        });
      }

      showToastMessage('Failed to create the product. Please try again.');
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
      <Text style={styles.backButton}>Advance</Text>
      
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
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonTextAdd}>Add</Text>
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
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: FontSize(23), 
    color: '#333',
    marginBottom: hp(2), 
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2), 
  },
  checkboxLabel: {
    marginLeft: wp(2), 
    fontSize: FontSize(19), 
    color: '#333',
  },
  textarea: {
    height: hp(10), 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), 
    paddingHorizontal: wp(2), 
    paddingVertical: wp(2), 
    textAlignVertical: 'top', 
    fontSize: FontSize(19),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2), 
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), 
    paddingHorizontal: wp(6), 
  },
  buttonTextAdd: {
    fontSize: FontSize(19), 
    color: '#fff',
  },
  toastContainer: {
    position: 'absolute',
    bottom: hp(5), 
    left: wp(5),
    right: wp(5),
    backgroundColor: '#333',
    padding: wp(3), 
    borderRadius: 5,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: FontSize(16), 
  },
});

export default ProductAdvanceScreen;
