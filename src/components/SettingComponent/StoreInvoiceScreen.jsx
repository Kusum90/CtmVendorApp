import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

const StoreInvoiceScreen = ({ navigation }) => {
  const [invoiceNoPrefix, setInvoiceNoPrefix] = useState('');
  const [invoiceNoSuffix, setInvoiceNoSuffix] = useState('');
  const [invoiceNoDigit, setInvoiceNoDigit] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');

  const handlePrevious = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleNext = () => {
    navigation.navigate('SocialScreen'); // Navigate to SocialScreen
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Store Invoice</Text>
      </View>

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.125) }, // Responsive shadowOffset
    shadowOpacity: 0.1,
    shadowRadius: wp(1), // Responsive shadowRadius
    marginBottom: hp(2.5), // Responsive marginBottom
  },
  heading: {
    fontSize: FontSize(24), // Responsive font size
    fontWeight: 'bold',
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14), // Responsive font size
    marginBottom: hp(1), // Responsive marginBottom
    color: '#373737',
  },
  input: {
    borderWidth: wp(0.25), // Responsive borderWidth
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
  navButton: {
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
export default StoreInvoiceScreen;
