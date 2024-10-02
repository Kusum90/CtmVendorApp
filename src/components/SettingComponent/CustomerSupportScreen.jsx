import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const CustomerSupportScreen = ({ navigation }) => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handlePrevious = () => {
    Alert.alert('Previous button clicked!');
    // Implement navigation to the previous screen if needed
  };

  const handleNext = () => {
    navigation.navigate('StoreInvoiceScreen'); // Navigate to StoreInvoiceScreen
  };

  return (
    <ScrollView style={styles.container}>
      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Customer Support</Text>
      </View>

      {/* Card for Input Fields and Buttons */}
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={address1}
          onChangeText={setAddress1}
          placeholder=" Enter Email"
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
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
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: hp(0.2) }, // Responsive shadowOffset
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5), // Responsive shadowRadius
  },
  heading: {
    fontSize: FontSize(23), // Responsive fontSize
    fontWeight: 'bold',
    marginBottom: hp(2), // Responsive marginBottom
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14), // Responsive fontSize
    marginBottom: hp(1.5), // Responsive marginBottom
    color: '#373737',
  },
  input: {
    borderWidth: hp(0.1), // Responsive borderWidth
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
    fontSize: FontSize(16), // Responsive fontSize for button text
  },
});

export default CustomerSupportScreen;
