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
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

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

  const handleSaveCoupon = async () => {
    try {
      // Log the input expiry date
      console.log('Expiry Date:', expiryDate);
  
      // Assuming the user inputs the expiry date in the format 'YYYY-MM-DD', we can directly use it.
      const parsedExpiryDate = new Date(expiryDate).toISOString(); // Convert to ISO string
  
      // Log the parsed date
      console.log('Parsed Expiry Date:', parsedExpiryDate);
  
      // Ensure all number inputs are valid numbers
      const couponAmountNum = parseFloat(couponAmount);
      const minimumSpendNum = parseFloat(minimumSpend);
      const maximumSpendNum = parseFloat(maximumSpend);
  
      // Validate the numerical values
      if (isNaN(couponAmountNum) || isNaN(minimumSpendNum) || isNaN(maximumSpendNum)) {
        console.error('Invalid numbers for coupon amount, minimum spend, or maximum spend.');
        return;
      }
  
      // Log validation of number inputs
      console.log('Coupon Amount:', couponAmountNum);
      console.log('Minimum Spend:', minimumSpendNum);
      console.log('Maximum Spend:', maximumSpendNum);
  
      // Ensure fields that need arrays are passed as arrays
      const couponData = {
        couponCode,
        description,
        discountType,
        couponAmount: couponAmount.toString(), // Convert to string
        expiry: parsedExpiryDate, // Use the manually parsed ISO date
        allowFreeShipping,
        showOnStore,
        minimumSpend: minimumSpendNum,
        maximumSpend: maximumSpendNum,
        individualUseOnly,
        excludeSaleItems: excludeSaleItem,
        products: selectedProducts ? [selectedProducts] : [], // Ensure it's an array
        excludedProducts: excludedProducts ? [excludedProducts] : [], // Ensure it's an array
        productCategories: selectedCategories ? [selectedCategories] : [], // Ensure it's an array
        excludedProductCategories: excludedCategories ? [excludedCategories] : [], // Ensure it's an array
        emailRestrictions: emailRestriction ? [emailRestriction] : [],
        usageLimitPerCoupon: 100, // Example value, adjust as necessary
        limitUsageToXItems: 10, // Example value, adjust as necessary
        usageLimitPerUser: 5, // Example value, adjust as necessary
        action: 'Active', // Default action, can be adjusted
        usageCount: 0, // Default usage count
      };
  
      // Log the data to be sent
      console.log('Coupon Data:', couponData);
  
      const response = await axios.post(
        'https://cm-backend-yk2y.onrender.com/user/coupon',
        couponData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Log the success response
      console.log('Coupon saved successfully:', response.data);
      // Handle success (e.g., show success message or redirect)
    } catch (error) {
      // Log error details
      console.error('Error saving coupon:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  
  

  return (
    <ScrollView style={styles.container}>
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
          <Picker.Item label="Percentage Discount" value="Percentage Discount" />
          <Picker.Item label="Fixed Product Discount" value="Fixed Product Discount" />
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
    </ScrollView>
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
