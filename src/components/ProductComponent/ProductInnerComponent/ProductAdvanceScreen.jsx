import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { setProductDetails, createProduct } from '../../../redux/Product/ProductSlice'; // Import actions

const ProductAdvanceScreen = ({ navigation }) => {
  const dispatch = useDispatch(); // Initialize the Redux dispatch
  const productDetails = useSelector((state) => state.products.productDetails); // Get product details from Redux store

  const [enableReviews, setEnableReviews] = useState(false);
  const [purchaseNote, setPurchaseNote] = useState('');
  const [loading, setLoading] = useState(false); // State for loader
  const [toastMessage, setToastMessage] = useState(''); // State for toast message
  const [showToast, setShowToast] = useState(false); // State to show/hide toast

  const handleAdd = async () => {
    console.log('adddddddddddddd');
    
    try {
      // Start the loader
      setLoading(true);

      // Log the data collected from this screen before dispatching
      console.log('Collecting data from this screen:', {
        enableReviews,
        purchaseNote,
      });
  
      // Dispatch the latest data from this screen to Redux
      dispatch(
        setProductDetails({
          enableReviews,
          purchaseNote,
        })
      );
  
      console.log('Product details in Redux after update:', productDetails);
  
      // Validate required fields or data types before posting
      if (!productDetails.title || !productDetails.price) {
        console.error('Error: Product title and price are required.');
        alert('Product title and price are required!');
        setLoading(false); // Stop the loader on error
        return;
      }
  
      // Post all the product data collected so far
      console.log('Posting the product details to the backend API:', productDetails);
  
      const result = await dispatch(createProduct(productDetails)).unwrap();
  
      console.log('Product created successfully:', result);

      // Show success toast
      showToastMessage('Product created successfully!');
  
      // Stop the loader
      setLoading(false);
  
      // Optionally navigate to a success or summary page
      navigation.navigate('ProductSummaryScreen');
  
    } catch (error) {
      // Log the entire error object
      console.error('Error creating product:', error);
  
      // Log specific error messages from Zod validation (or any backend validation)
      if (error?.errors) {
        console.error('Validation errors received from backend:', error.errors);
  
        // Display individual error messages for debugging
        error.errors.forEach((err, index) => {
          console.error(`Error ${index + 1}:`, err);
        });
      }
  
      // Show error toast
      showToastMessage('Failed to create the product. Please try again.');
  
      // Stop the loader
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    // Handle previous navigation
    navigation.goBack();
  };

  // Function to show toast message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevious}>
        <Text style={styles.backButton}>Advance</Text>
      </TouchableOpacity>
      
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
        <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#28a745" />
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonTextAdd}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Toast message */}
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
    padding: wp(4), // Responsive padding
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: FontSize(23), // Responsive font size
    color: '#333',
    marginBottom: hp(2), // Responsive margin
    fontWeight: 'bold',
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
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
  toastContainer: {
    position: 'absolute',
    bottom: hp(5), // Position toast above the bottom of the screen
    left: wp(5),
    right: wp(5),
    backgroundColor: '#333',
    padding: wp(3), // Padding inside the toast
    borderRadius: 5,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: FontSize(16), // Responsive font size
  },
});

export default ProductAdvanceScreen;
