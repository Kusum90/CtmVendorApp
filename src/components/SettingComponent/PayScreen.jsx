import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PayScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { label: 'Choose Withdrawal Method', value: '' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Cash', value: 'cash' },
  ];

  const handlePrevious = () => {
    Alert.alert('Navigating to the previous screen!');
    // Implement navigation to the previous screen if needed
  };

  const handleNext = () => {
    if (selectedMethod === '') {
      Alert.alert('Please select a payment method!');
    } else {
    //   Alert.alert(Navigating to the next screen! Selected payment method: ${selectedMethod});
    console.log('a');
    
      // Implement navigation to the next screen if needed
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Payment</Text>
        <Text style={styles.label}>Preferred Payment Method</Text>

        <Picker
          selectedValue={selectedMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMethod(itemValue)}
        >
          {paymentMethods.map((method) => (
            <Picker.Item key={method.value} label={method.label} value={method.value} />
          ))}
        </Picker>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#373737',
    textAlign: 'center',
  },
  label: {
    fontSize: 17,
    marginBottom: 8,
    color: '#373737',
    fontWeight:'bold'
  },
  picker: {
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
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

export default PayScreen;