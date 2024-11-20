import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const PayScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const paymentMethods = [
    { label: 'Choose Withdrawal Method', value: '' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Cash', value: 'cash' },
  ];

  const handlePrevious = () => {
    navigation.goBack(); // Navigate to the previous screen
  };
  

  const handleNext = () => {
      // Navigate to the Policies screen when "Next" is clicked
      navigation.navigate('PoliciesScreen');
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
    padding: wp(5), // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(4), // Responsive padding
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: hp(0.2) }, // Responsive shadow offset
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5), // Responsive shadowRadius
    marginBottom: hp(2.5), // Responsive marginBottom
  },
  heading: {
    fontSize: FontSize(24), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(2.5), // Responsive marginBottom
    color: '#373737',
    textAlign: 'center',
  },
  label: {
    fontSize: FontSize(17), // Responsive font size
    marginBottom: hp(1), // Responsive marginBottom
    color: '#373737',
    fontWeight: 'bold',
  },
  picker: {
    height: hp(6), // Responsive height for picker
    marginBottom: hp(2), // Responsive marginBottom
    borderWidth: wp(0.3), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2.5), // Responsive marginTop
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5), // Responsive padding
    borderRadius: wp(2), // Responsive borderRadius
    flex: 1,
    marginHorizontal: wp(1.5), // Responsive marginHorizontal
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSize(16), // Responsive font size
  },
});
export default PayScreen;
