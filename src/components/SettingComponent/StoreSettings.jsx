import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For dropdown
import { ScrollView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import BackArrow from '../../assets/svg/Couponsvg/BackArrow';

const StoreSettings = () => {
const navigation = useNavigation();

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
    // if (!storeSlug) newErrors.storeSlug = 'Store Slug is required';
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
    navigation.navigate('LocationScreen')
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Store Settings</Text>
      </View>
    <ScrollView style={styles.container}>
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
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2.5), // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4), // Responsive padding
    marginBottom: hp(2), // Responsive marginBottom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) }, // Responsive shadowOffset
    shadowOpacity: 0.1,
    shadowRadius: wp(2), // Responsive shadowRadius
    elevation: 5,
  },
  heading: {
    fontSize: FontSize(20), // Responsive font size
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#373737',
  },
  section: {
    marginBottom: hp(3), // Responsive marginBottom
  },
  subHeading: {
    fontSize: FontSize(16), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(1), // Responsive marginBottom
    color: '#373737',
  },
  label: {
    fontSize: FontSize(14), // Responsive font size
    marginBottom: hp(0.5), // Responsive marginBottom
    color: '#373737',
  },
  input: {
    borderWidth: wp(0.25), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2), // Responsive padding
    marginBottom: hp(1), // Responsive marginBottom
  },
  pickerContainer: {
    borderWidth: wp(0.25), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    marginBottom: hp(2), // Responsive marginBottom
  },
  picker: {
    height: hp(6), // Responsive height
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
    width: wp(25), // Responsive width
    height: wp(25), // Responsive height
    borderRadius: wp(2), // Responsive borderRadius
    borderWidth: wp(0.25), // Responsive borderWidth
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive marginBottom
  },
  image: {
    width: wp(25), // Responsive width
    height: wp(25), // Responsive height
    borderRadius: wp(2), // Responsive borderRadius
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5), // Responsive padding
    borderRadius: wp(2), // Responsive borderRadius
    height: hp(6.5), // Responsive height
    width: wp(25), // Responsive width
    marginLeft: wp(60), // Responsive marginLeft
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: FontSize(16), // Responsive font size
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: hp(1), // Responsive marginBottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 80,
    color:'#373737',
  },
});

export default StoreSettings;
