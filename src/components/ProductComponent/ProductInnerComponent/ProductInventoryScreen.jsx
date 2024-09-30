import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductInventoryScreen = ({ navigation }) => {
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [onBackorder, setOnBackorder] = useState(false);
  const [soldIndividually, setSoldIndividually] = useState(false);

  const handleSkuChange = (text) => {
    setSku(text);
  };

  const handleQuantityChange = (text) => {
    setQuantity(text);
  };

  const handleInStockChange = () => {
    setInStock(!inStock);
    setOutOfStock(false);
    setOnBackorder(false);
  };

  const handleOutOfStockChange = () => {
    setOutOfStock(!outOfStock);
    setInStock(false);
    setOnBackorder(false);
  };

  const handleOnBackorderChange = () => {
    setOnBackorder(!onBackorder);
    setInStock(false);
    setOutOfStock(false);
  };

  const handleSoldIndividuallyChange = () => {
    setSoldIndividually(!soldIndividually);
  };

  const handlePrevious = () => {
    navigation.goBack()
  };

  const handleNext = () => {
    navigation.navigate('ProductShippingScreen');
  };

  const handleSubmit = () => {
    console.log('SKU:', sku);
    console.log('Quantity:', quantity);
    console.log('In Stock:', inStock);
    console.log('Out of Stock:', outOfStock);
    console.log('On Backorder:', onBackorder);
    console.log('Sold Individually:', soldIndividually);
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
            onChangeText={handleSkuChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.label}>Stock Status</Text>
          <View style={styles.checkboxRow}>
            <View style={styles.checkboxItem}>
              <Switch value={inStock} onValueChange={handleInStockChange} />
              <Text>In Stock</Text>
            </View>
            <View style={styles.checkboxItem}>
              <Switch value={outOfStock} onValueChange={handleOutOfStockChange} />
              <Text>Out of Stock</Text>
            </View>
          </View>
          <View style={styles.checkboxItem}>
            <Switch value={onBackorder} onValueChange={handleOnBackorderChange} />
            <Text>On Backorder</Text>
          </View>
        </View>

        <View style={styles.checkboxItem}>
          <Switch value={soldIndividually} onValueChange={handleSoldIndividuallyChange} />
          <Text>Sold Individually</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
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
    padding: wp(5),                   // Responsive padding
    backgroundColor: '#fff',
  },
  titleCard: {
    padding: wp(5),                   // Responsive padding
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: hp(2.5),           // Responsive margin
  },
  inputCard: {
    padding: wp(5),                   // Responsive padding
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: FontSize(24),           // Responsive font size
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#373737',
  },
  inputContainer: {
    marginBottom: hp(1.5),           // Responsive margin
  },
  label: {
    fontSize: FontSize(16),           // Responsive font size
    marginBottom: hp(0.5),            // Responsive margin
  },
  input: {
    height: hp(5),                    // Responsive height
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(2.5),                 // Responsive padding
    borderRadius: 5,
  },
  statusContainer: {
    marginBottom: hp(1.5),            // Responsive margin
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),              // Responsive margin
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(5),               // Responsive margin
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),                // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5),         // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),         // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(16),           // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(16),           // Responsive font size
    color: '#fff',
  },
});

export default ProductInventoryScreen;
