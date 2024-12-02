import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, updateVendor, clearVendorMessages } from '../../redux/StoreSetting/Setting'
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

const StoreInvoiceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { vendorData, loading, successMessage, errorMessage } = useSelector((state) => state.vendor);

  const [invoiceNoPrefix, setInvoiceNoPrefix] = useState('');
  const [invoiceNoSuffix, setInvoiceNoSuffix] = useState('');
  const [invoiceNoDigit, setInvoiceNoDigit] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');

  // Fetch vendor data on component mount
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  // Populate form fields when vendor data is loaded
  useEffect(() => {
    if (vendorData) {
      setInvoiceNoPrefix(vendorData.invoiceNoPrefix || '');
      setInvoiceNoSuffix(vendorData.invoiceNoSuffix || '');
      setInvoiceNoDigit(vendorData.invoiceNoDigit || '' );
      setGstNo(vendorData.gstNo || '');
      setDisclaimer(vendorData.disclaimer || '');
      setDigitalSignature(vendorData.digitalSignature || '');
    }
  }, [vendorData]);

  // Handle success and error messages
  useEffect(() => {
    if (successMessage) {
      Alert.alert('Success', successMessage, [{ text: 'OK', onPress: () => dispatch(clearVendorMessages()) }]);
    }
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: () => dispatch(clearVendorMessages()) }]);
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleUpdate = () => {
    const vendorDetails = {
      invoiceNoPrefix,
      invoiceNoSuffix,
      invoiceNoDigit:parseInt(invoiceNoDigit),
      gstNo,
      disclaimer,
      digitalSignature,
    };
    dispatch(updateVendor({ vendorDetails }));
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('SocialScreen');
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
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
          value={invoiceNoDigit.toString()} // Convert number to string
          onChangeText={(text) => setInvoiceNoDigit(text.replace(/[^0-9]/g, ''))} // Only allow numeric input
          placeholder=" "
          keyboardType="numeric"
        />
        <Text style={styles.label}>GST No.</Text>
        <TextInput style={styles.input} value={gstNo} onChangeText={setGstNo} placeholder=" " />
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
        <TouchableOpacity style={styles.navButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
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
    padding: wp(5),
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2),
    padding: wp(4),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.125) },
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    marginBottom: hp(2.5),
  },
  heading: {
    fontSize: FontSize(24),
    fontWeight: 'bold',
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14),
    marginBottom: hp(1),
    color: '#373737',
  },
  input: {
    borderWidth: wp(0.25),
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
});

export default StoreInvoiceScreen;
