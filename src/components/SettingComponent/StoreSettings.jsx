import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For dropdown

const StoreSettings = () => {
  const [storeName, setStoreName] = useState('');
  const [storeSlug, setStoreSlug] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeBannerType, setStoreBannerType] = useState('Static Image');
  const [storeListBannerType, setStoreListBannerType] = useState('Static Image');

  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    const newErrors = {};

    if (!storeName) newErrors.storeName = 'Store Name is required';
    if (!storeSlug) newErrors.storeSlug = 'Store Slug is required';
    if (!storeEmail) newErrors.storeEmail = 'Store Email is required';
    if (!storePhone) newErrors.storePhone = 'Store Phone is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // If no errors, proceed to save action
      console.log("Store settings saved!");
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <View style={styles.container}>
      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Store Settings</Text>
      </View>

      {/* Card for Form */}
      <View style={styles.card}>
        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>General Setting</Text>

          <Text style={styles.label}>Store Name*</Text>
          <TextInput 
            style={styles.input} 
            value={storeName} 
            onChangeText={setStoreName} 
            placeholder="Enter store name" 
          />
          {errors.storeName && <Text style={styles.error}>{errors.storeName}</Text>}

          <Text style={styles.label}>Store Slug*</Text>
          <TextInput 
            style={styles.input} 
            value={storeSlug} 
            onChangeText={setStoreSlug} 
            placeholder="Enter store slug" 
          />
          {errors.storeSlug && <Text style={styles.error}>{errors.storeSlug}</Text>} 

          <Text style={styles.label}>Store Email*</Text>
          <TextInput 
            style={styles.input} 
            value={storeEmail} 
            onChangeText={setStoreEmail} 
            placeholder="Enter store email" 
            keyboardType="email-address"
          />
          {errors.storeEmail && <Text style={styles.error}>{errors.storeEmail}</Text>} 

          <Text style={styles.label}>Store Phone*</Text>
          <TextInput 
            style={styles.input} 
            value={storePhone} 
            onChangeText={setStorePhone} 
            placeholder="Enter store phone" 
            keyboardType="phone-pad"
          />
          {errors.storePhone && <Text style={styles.error}>{errors.storePhone}</Text>} 
        </View>

        {/* Store Brand Setup */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>Store Brand Setup</Text>

          <Text style={styles.label}>Store Logo</Text>
          <TouchableOpacity style={styles.imagePicker}>
            {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} /> */}
          </TouchableOpacity>

          <Text style={styles.label}>Store Banner Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={storeBannerType}
              onValueChange={(itemValue) => setStoreBannerType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Static Image" value="Static Image" />
              <Picker.Item label="Dynamic Image" value="Dynamic Image" />
            </Picker>
          </View>

          <View style={styles.row}>
            <View style={styles.imagePickerContainer}>
              <Text style={styles.label}>Store Banner</Text>
              <TouchableOpacity style={styles.imagePicker}>
                {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} /> */}
              </TouchableOpacity>
            </View>

            <View style={styles.imagePickerContainer}>
              <Text style={styles.label}>Mobile Banner</Text>
              <TouchableOpacity style={styles.imagePicker}>
                {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Store List Banner Setup */}
        <View style={styles.section}>
          <Text style={styles.label}>Store List Banner Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={storeListBannerType}
              onValueChange={(itemValue) => setStoreListBannerType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Static Image" value="Static Image" />
              <Picker.Item label="Dynamic Image" value="Dynamic Image" />
            </Picker>
          </View>

          <Text style={styles.label}>Store List Banner</Text>
          <TouchableOpacity style={styles.imagePicker}>
            {/* <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} /> */}
          </TouchableOpacity>
        </View>

        {/* Shop Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Shop Description</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Enter shop description"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#373737',
  },
  section: {
    marginBottom: 24,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#373737',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-end',
    height: 50,
    width: 100,
    marginLeft: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default StoreSettings;
