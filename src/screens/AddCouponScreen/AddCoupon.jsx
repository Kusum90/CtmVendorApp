import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddCoupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [couponAmount, setCouponAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [allowFreeShipping, setAllowFreeShipping] = useState(false);
  const [showOnStore, setShowOnStore] = useState(false);
  const [minimumSpend, setMinimumSpend] = useState('');
  const [maximumSpend, setMaximumSpend] = useState('');
  const [individualUseOnly, setIndividualUseOnly] = useState(false);
  const [excludeSaleItem, setExcludeSaleItem] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState('');
  const [excludedProducts, setExcludedProducts] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');
  const [excludedCategories, setExcludedCategories] = useState('');
  const [emailRestriction, setEmailRestriction] = useState('');

  const products = [
    { label: 'Product 1', value: 'product1' },
    { label: 'Product 2', value: 'product2' },
    { label: 'Product 3', value: 'product3' },
  ];

  const categories = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ];

  const handleSaveCoupon = () => {
    console.log('Coupon Data:', {
      couponCode,
      description,
      discountType,
      couponAmount,
      expiryDate,
      allowFreeShipping,
      showOnStore,
      minimumSpend,
      maximumSpend,
      individualUseOnly,
      excludeSaleItem,
      selectedProducts,
      excludedProducts,
      selectedCategories,
      excludedCategories,
      emailRestriction,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Coupon</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Coupon Code</Text>
        <TextInput
          style={styles.input}
          value={couponCode}
          onChangeText={setCouponCode}
          placeholder="Enter Coupon Code"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Discount Type</Text>
        <Picker
          selectedValue={discountType}
          onValueChange={(itemValue) => setDiscountType(itemValue)}
        >
          <Picker.Item label="Select Discount Type" value="" />
          <Picker.Item label="Percentage" value="percentage" />
          <Picker.Item label="Fixed Amount" value="fixedAmount" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Coupon Amount</Text>
        <TextInput
          style={styles.input}
          value={couponAmount}
          onChangeText={setCouponAmount}
          placeholder="Coupon Amount"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder="dd-mm-yy"
        />
      </View>
      <View style={styles.switchContainer}>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Allow Free Shipping</Text>
          <Switch
            value={allowFreeShipping}
            onValueChange={setAllowFreeShipping}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Show on Store</Text>
          <Switch
            value={showOnStore}
            onValueChange={setShowOnStore}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Restriction</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Minimum Spend</Text>
        <TextInput
          style={styles.input}
          value={minimumSpend}
          onChangeText={setMinimumSpend}
          placeholder="Minimum Spend"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Maximum Spend</Text>
        <TextInput
          style={styles.input}
          value={maximumSpend}
          onChangeText={setMaximumSpend}
          placeholder="Maximum Spend"
        />
      </View>
      <View style={styles.switchContainer}>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Individual use only</Text>
          <Switch
            value={individualUseOnly}
            onValueChange={setIndividualUseOnly}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Exclude sale item</Text>
          <Switch
            value={excludeSaleItem}
            onValueChange={setExcludeSaleItem}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Products</Text>
      <Picker
        selectedValue={selectedProducts}
        onValueChange={(itemValue) => setSelectedProducts(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Filter by product" value="" />
        {products.map((product) => (
          <Picker.Item key={product.value} label={product.label} value={product.value} />
        ))}
      </Picker>
      <Text style={styles.sectionTitle}>Exclude Products</Text>
      <Picker
        selectedValue={excludedProducts}
        onValueChange={(itemValue) => setExcludedProducts(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Filter by product" value="" />
        {products.map((product) => (
          <Picker.Item key={product.value} label={product.label} value={product.value} />
        ))}
      </Picker>
      <Text style={styles.sectionTitle}>Product Categories</Text>
      <Picker
        selectedValue={selectedCategories}
        onValueChange={(itemValue) => setSelectedCategories(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose categories" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.value} label={category.label} value={category.value} style={styles.categories}/>
        ))}
      </Picker>
      <Text style={styles.sectionTitle}>Exclude Categories</Text>
      <Picker
        selectedValue={excludedCategories}
        onValueChange={(itemValue) => setExcludedCategories(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="No categories" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.value} label={category.label} value={category.value} />
        ))}
      </Picker>
      <Text style={styles.sectionTitle}>Email Restriction</Text>
      <Picker
        selectedValue={emailRestriction}
        onValueChange={(itemValue) => setEmailRestriction(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="No restriction" value="" />
        <Picker.Item label="Restrict by Email" value="restrictByEmail" />
      </Picker>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCoupon}>
        <Text style={styles.saveButtonText}>Add Coupon</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#373737'
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color:'#373737'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddCoupon;
