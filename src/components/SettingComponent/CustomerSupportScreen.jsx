import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CustomerSupportScreen = () => {
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
    Alert.alert('Next button clicked!');
    // Implement navigation to the next screen if needed
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 9,
    marginBottom: 15,
    elevation: 2, // for Android shadow effect
    shadowColor: '#000', // for iOS shadow effect
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomerSupportScreen;