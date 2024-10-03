import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, fetchProducts } from '../../../redux/Coupon/Coupon'; // Adjust this path to where your slice is located
import { Picker } from '@react-native-picker/picker';

const AddCoupon = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.coupons.loading);
  const products = useSelector((state) => state.coupons.products);

  const [activeTab, setActiveTab] = useState('restriction');
  const [formData, setFormData] = useState({
    couponCode: '',
    description: '',
    discountType: 'Percentage Discount',
    couponAmount: '',
    expiry: '',
    allowFreeShipping: false,
    showOnStore: false,
    minimumSpend: 0,
    maximumSpend: 0,
    individualUseOnly: false,
    excludeSaleItems: false,
    products: [],
    excludedProducts: [],
    emailRestrictions: '',
    usageLimitPerCoupon: 0,
    limitUsageToXItems: 0,
    usageLimitPerUser: 0,
  });

  const [productSearch, setProductSearch] = useState('');

  // Fetch products based on search
  useEffect(() => {
    if (productSearch) {
      dispatch(fetchProducts(productSearch));
    }
  }, [productSearch, dispatch]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveCoupon = () => {
    const parsedExpiryDate = new Date(formData.expiry).toISOString(); // Convert to ISO string
  
    // Ensure the correct data types are used
    const couponData = {
      ...formData,
      expiry: parsedExpiryDate, // Set expiry as ISO string
      couponAmount: formData.couponAmount.toString(), // Ensure couponAmount is a string
      minimumSpend: parseFloat(formData.minimumSpend), // Ensure minimumSpend is a number
      maximumSpend: parseFloat(formData.maximumSpend), // Ensure maximumSpend is a number
      usageLimitPerCoupon: parseInt(formData.usageLimitPerCoupon), // Ensure usageLimitPerCoupon is a number
      limitUsageToXItems: parseInt(formData.limitUsageToXItems), // Ensure limitUsageToXItems is a number
      usageLimitPerUser: parseInt(formData.usageLimitPerUser), // Ensure usageLimitPerUser is a number
      products: formData.products || [], // Ensure products is an array
      excludedProducts: formData.excludedProducts || [], // Ensure excludedProducts is an array
      emailRestrictions: formData.emailRestrictions ? [formData.emailRestrictions] : [], // Ensure emailRestrictions is an array
    };
  
    console.log("Coupon Data:", couponData); // Log the data before sending it
  
    // Dispatch createCoupon action
    dispatch(createCoupon(couponData));
  };
  
  
  

  const renderRestrictionContent = () => (
    <>
      <Text style={styles.sectionTitle}>Restriction</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Minimum Spend</Text>
        <TextInput
          style={styles.input}
          value={formData.minimumSpend.toString()}
          onChangeText={(value) => handleChange('minimumSpend', value)}
          placeholder="Minimum Spend"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Maximum Spend</Text>
        <TextInput
          style={styles.input}
          value={formData.maximumSpend.toString()}
          onChangeText={(value) => handleChange('maximumSpend', value)}
          placeholder="Maximum Spend"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.switchContainer}>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Individual use only</Text>
          <Switch
            value={formData.individualUseOnly}
            onValueChange={(value) => handleChange('individualUseOnly', value)}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Exclude sale items</Text>
          <Switch
            value={formData.excludeSaleItems}
            onValueChange={(value) => handleChange('excludeSaleItems', value)}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Filter by Products</Text>
      <Picker
        selectedValue={formData.products}
        onValueChange={(itemValue) => handleChange('products', itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select product" value="" />
        {products.map((product) => (
          <Picker.Item key={product._id} label={product.title} value={product.title} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Exclude Products</Text>
      <Picker
        selectedValue={formData.excludedProducts}
        onValueChange={(itemValue) => handleChange('excludedProducts', itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select product" value="" />
        {products.map((product) => (
          <Picker.Item key={product._id} label={product.title} value={product.title} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Email Restriction</Text>
      <TextInput
        style={styles.input}
        value={formData.emailRestrictions}
        onChangeText={(value) => handleChange('emailRestrictions', value)}
        placeholder="Enter email restrictions"
      />
    </>
  );

  const renderLimitsContent = () => (
    <>
      <Text style={styles.sectionTitle}>Limits</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usage limit per coupon</Text>
        <TextInput
          style={styles.input}
          value={formData.usageLimitPerCoupon?.toString()}
          onChangeText={(value) => handleChange('usageLimitPerCoupon', value)}
          placeholder="Usage limit per coupon"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Limit usage to X items</Text>
        <TextInput
          style={styles.input}
          value={formData.limitUsageToXItems?.toString()}
          onChangeText={(value) => handleChange('limitUsageToXItems', value)}
          placeholder="Limit usage to X items"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usage limit per user</Text>
        <TextInput
          style={styles.input}
          value={formData.usageLimitPerUser?.toString()}
          onChangeText={(value) => handleChange('usageLimitPerUser', value)}
          placeholder="Usage limit per user"
          keyboardType="numeric"
        />
      </View>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Coupon</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Coupon Code</Text>
        <TextInput
          style={styles.input}
          value={formData.couponCode}
          onChangeText={(value) => handleChange('couponCode', value)}
          placeholder="Enter Coupon Code"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Description"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Discount Type</Text>
        <Picker
          selectedValue={formData.discountType}
          onValueChange={(itemValue) => handleChange('discountType', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Percentage Discount" value="Percentage Discount" />
          <Picker.Item label="Fixed Product Discount" value="Fixed Product Discount" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Coupon Amount</Text>
        <TextInput
          style={styles.input}
          value={formData.couponAmount.toString()}
          onChangeText={(value) => handleChange('couponAmount', value)}
          placeholder="Coupon Amount"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          value={formData.expiry}
          onChangeText={(value) => handleChange('expiry', value)}
          placeholder="yyyy-mm-dd"
        />
      </View>
      <View style={styles.switchContainer}>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Allow Free Shipping</Text>
          <Switch
            value={formData.allowFreeShipping}
            onValueChange={(value) => handleChange('allowFreeShipping', value)}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Show on Store</Text>
          <Switch
            value={formData.showOnStore}
            onValueChange={(value) => handleChange('showOnStore', value)}
          />
        </View>
      </View>
      <View style={{ padding: 20 }}>
        {/* Tab Navigation */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'restriction' && styles.activeTab]}
            onPress={() => setActiveTab('restriction')}
          >
            <Text style={styles.tabText}>Restriction</Text>
            {activeTab === 'restriction' && <View style={styles.underline} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'limits' && styles.activeTab]}
            onPress={() => setActiveTab('limits')}
          >
            <Text style={styles.tabText}>Limits</Text>
            {activeTab === 'limits' && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>

        {/* Render Content based on Active Tab */}
        {activeTab === 'restriction' && renderRestrictionContent()}
        {activeTab === 'limits' && renderLimitsContent()}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCoupon} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Add Coupon'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#373737',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 18,
    color: '#373737',
  },
  underline: {
    height: 3,
    backgroundColor: 'green',
    width: '100%',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#373737',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#373737',
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
