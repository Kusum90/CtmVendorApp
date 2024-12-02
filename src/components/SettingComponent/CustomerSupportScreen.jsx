import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVendor, updateVendor, clearVendorMessages } from '../../redux/StoreSetting/Setting'
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

const CustomerSupportScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, vendorData, successMessage, errorMessage } = useSelector((state) => state.vendor);

  // State for form fields
  const [email, setEmail] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // Fetch vendor data on component mount
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  // Populate input fields when vendorData is fetched
  useEffect(() => {
    if (vendorData) {
      setEmail(vendorData.email || '');
      setStorePhone(vendorData.phone || '');
      setAddress1(vendorData.address1 || '');
      setAddress2(vendorData.address2 || '');
      setCountry(vendorData.country || '');
      setState(vendorData.state || '');
      setZip(vendorData.postcode_zip || '');
    }
  }, [vendorData]);

  // Show success or error messages
  useEffect(() => {
    if (successMessage) {
      Alert.alert('Success', successMessage, [{ text: 'OK', onPress: () => dispatch(clearVendorMessages()) }]);
    }
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: () => dispatch(clearVendorMessages()) }]);
    }
  }, [successMessage, errorMessage, dispatch]);

  // Handle update
  const handleNext = async () => {
    const vendorDetails = {
      email,
      phone: storePhone,
      address1,
      address2,
      country,
      state,
      zip,
    };

    try {
      console.log('Updating customer support details...');
      await dispatch(updateVendor({ vendorDetails })).unwrap();
      console.log('Details updated successfully.');
      Alert.alert('Success', 'Details updated successfully!');
      navigation.navigate('StoreInvoiceScreen'); // Navigate to the next screen
    } catch (error) {
      console.error('Error updating details:', error);
      Alert.alert('Error', 'Failed to update details.');
    }
  };
  const handlePrevious = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  return (
    <ScrollView style={styles.container}>
      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      )}

      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Customer Support</Text>
      </View>

      {/* Card for Input Fields and Buttons */}
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
        />

        <Text style={styles.label}>Store Phone</Text>
        <TextInput
          style={styles.input}
          value={storePhone}
          onChangeText={setStorePhone}
          placeholder="Enter Store Phone"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address 1</Text>
        <TextInput
          style={styles.input}
          value={address1}
          onChangeText={setAddress1}
          placeholder="Enter Address 1"
        />

        <Text style={styles.label}>Address 2</Text>
        <TextInput
          style={styles.input}
          value={address2}
          onChangeText={setAddress2}
          placeholder="Enter Address 2"
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Enter Country"
        />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={setState}
          placeholder="Enter State"
        />

        <Text style={styles.label}>PostCode/Zip</Text>
        <TextInput
          style={styles.input}
          value={zip}
          onChangeText={setZip}
          placeholder="Enter Zip Code"
          keyboardType="numeric"
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2),
    padding: wp(2.5),
    marginBottom: hp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5),
  },
  heading: {
    fontSize: FontSize(23),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14),
    marginBottom: hp(1.5),
    color: '#373737',
  },
  input: {
    borderWidth: hp(0.1),
    borderColor: '#ddd',
    borderRadius: wp(2),
    padding: wp(2.5),
    marginBottom: hp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5),
    borderRadius: wp(2),
    flex: 1,
    marginHorizontal: wp(1),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSize(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomerSupportScreen;
