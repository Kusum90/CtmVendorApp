import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const StoreInvoiceScreen = () => {
  const [invoiceNoPrefix, setInvoiceNoPrefix] = useState('');
  const [invoiceNoSuffix, setInvoiceNoSuffix] = useState('');
  const [invoiceNoDigit, setInvoiceNoDigit] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');

  const handlePrevious = () => {
    Alert.alert('Navigating to the previous screen!');
    // Implement navigation to the previous screen
  };

  const handleNext = () => {
    Alert.alert('Navigating to the next screen!');
    // Implement navigation to the next screen
  };

  return (
    <View style={styles.container}>
      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Store Invoice</Text>
      </View>

      {/* Card for Input Fields */}
      <View style={styles.card}>
        <Text style={styles.label}>Invoice No Prefix</Text>
        <TextInput
          style={styles.input}
          value={invoiceNoPrefix}
          onChangeText={setInvoiceNoPrefix}
          placeholder=" "
        />

        <Text style={styles.label}>Invoice No Suffix</Text>
        <TextInput
          style={styles.input}
          value={invoiceNoSuffix}
          onChangeText={setInvoiceNoSuffix}
          placeholder=" "
        />

        <Text style={styles.label}>Invoice No Digit</Text>
        <TextInput
          style={styles.input}
          value={invoiceNoDigit}
          onChangeText={setInvoiceNoDigit}
          placeholder=" "
          keyboardType="numeric"
        />

        <Text style={styles.label}>GST No.</Text>
        <TextInput
          style={styles.input}
          value={gstNo}
          onChangeText={setGstNo}
          placeholder=" "
        />

        <Text style={styles.label}>Disclaimer</Text>
        <TextInput
          style={styles.input}
          value={disclaimer}
          onChangeText={setDisclaimer}
          placeholder=" "
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Digital Signature</Text>
        <TextInput
          style={styles.input}
          value={digitalSignature}
          onChangeText={setDigitalSignature}
          placeholder=" "
        />
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

export default StoreInvoiceScreen;