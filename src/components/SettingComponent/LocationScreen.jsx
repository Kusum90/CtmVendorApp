import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { wp, hp, FontSize } from '../../utils/responsiveUtils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, updateVendor } from '../../redux/StoreSetting/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Redux state for vendor data
  const { vendorData, loading, errorMessage, successMessage } = useSelector(
    (state) => state.vendor
  );

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city,setcity]=useState('');
  const [zip, setZip] = useState('');

  // Fetch vendor data when the screen is mounted
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVendor());
    };

    fetchData();
  }, [dispatch]);

  // Fill in the form with fetched vendor data
  useEffect(() => {
    if (vendorData) {
      setAddress1(vendorData?.address1 || '');
      setAddress2(vendorData?.address2 || '');
      setCountry(vendorData?.country || '');
      setState(vendorData?.state || '');
      setcity(vendorData?.city_town || '');
      setZip(vendorData?.postcode_zip || '');
    }
  }, [vendorData]);



  const handlePrevious = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  const handleNext = () => {
    navigation.navigate('PayScreen');
  }
  

  const handleSave = async () => {
    const vendorDetails = { address1, address2, country, state,city, zip };
   dispatch(updateVendor({ vendorDetails }));
  };
    

  return (
    <ScrollView style={styles.container}>
      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Store Address</Text>
      </View>

      {/* Card for Input Fields and Buttons */}
      <View style={styles.card}>
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
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setcity}
          placeholder="Enter City"
        />

        <Text style={styles.label}>PostCode/Zip</Text>
        <TextInput
          style={styles.input}
          value={zip}
          onChangeText={setZip}
          placeholder="Enter Zip Code"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
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
    padding: wp(3), // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2.5), // Responsive padding
    marginBottom: hp(2), // Responsive marginBottom
    elevation: 2, // Android shadow effect
    shadowColor: '#000', // iOS shadow effect
    shadowOffset: { width: 0, height: hp(0.2) }, // Responsive shadow offset
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5), // Responsive shadow radius
  },
  heading: {
    fontSize: FontSize(23), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(2), // Responsive marginBottom
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14), // Responsive font size
    marginBottom: hp(1.5), // Responsive marginBottom
    color: '#373737',
  },
  input: {
    borderWidth: hp(0.1), // Responsive border width
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2.5), // Responsive padding
    marginBottom: hp(2), // Responsive marginBottom
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2.5), // Responsive marginTop
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5), // Responsive padding
    borderRadius: wp(2), // Responsive borderRadius
    flex: 1,
    marginHorizontal: wp(1), // Responsive marginHorizontal
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSize(16), // Responsive font size
  },
});

export default LocationScreen;
