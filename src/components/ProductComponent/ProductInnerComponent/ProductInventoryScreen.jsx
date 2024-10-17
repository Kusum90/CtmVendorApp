import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch } from 'react-redux';
import { setProductDetails } from '../../../redux/Product/ProductSlice';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const ProductInventoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [soldIndividually, setSoldIndividually] = useState(false);
  const [allowBackorders, setAllowBackorders] = useState('no'); // Initialize allowBackorders state

  const handleNext = () => {
    if (!sku || !quantity) {
      alert('Please fill in all required fields.');
      return;
    }

    // Dispatch the inventory details to Redux store dynamically
    dispatch(
      setProductDetails({
        sku: sku || '', // Set SKU or empty string
        stockQty: quantity ? parseInt(quantity, 10) : 0, // Convert quantity to integer, or set default
        allowBackorders: allowBackorders || 'no', // Default to 'no' if not selected
        soldIndividually: soldIndividually, // Boolean for soldIndividually
      })
    );

    // Navigate to the next screen
    navigation.navigate('ProductShippingScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>Inventory</Text>
      </View>

      <View style={styles.inputCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>SKU</Text>
          <TextInput
            style={styles.input}
            value={sku}
            onChangeText={setSku}
            placeholder="Enter SKU"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="Enter Quantity"
          />
        </View>

        {/* Allow Backorders Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Allow Backorders</Text>
          <Picker
            selectedValue={allowBackorders}
            onValueChange={(itemValue) => setAllowBackorders(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="No" value="no" />
            <Picker.Item label="Allow" value="allow" />
            <Picker.Item label="Notify" value="notify" />
          </Picker>
        </View>

        <View style={styles.checkboxItem}>
          <Switch value={soldIndividually} onValueChange={setSoldIndividually} />
          <Text style={styles.label}>Sold Individually</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={handleNext}>
            <Text style={styles.buttonTextAdd}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
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
