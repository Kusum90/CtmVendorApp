import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductPoliciesScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation hook
  const [overrideFields, setOverrideFields] = useState(false);
  const [policyLabel, setPolicyLabel] = useState('');
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [exchangePolicy, setExchangePolicy] = useState('');

  const handleNext = () => {
    // Navigate to the ProductAdvanceScreen
    navigation.navigate('ProductAdvanceScreen');
  };

  const handlePrevious = () => {
    // Navigate to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevious}>
        <Text style={styles.backButton}> Product Policies</Text>
      </TouchableOpacity>
      
      <View style={styles.checkboxContainer}>
        <Switch
          value={overrideFields}
          onValueChange={(value) => setOverrideFields(value)}
        />
        <Text style={styles.checkboxLabel}>Override Policy Fields</Text>
      </View>

      {overrideFields && (
        <TextInput
          style={styles.input}
          placeholder="Policy Tab Label"
          value={policyLabel}
          onChangeText={setPolicyLabel}
        />
      )}

      <TextInput
        style={styles.textarea}
        placeholder="Shipping Policy"
        multiline
        value={shippingPolicy}
        onChangeText={setShippingPolicy}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Refund Policy"
        multiline
        value={refundPolicy}
        onChangeText={setRefundPolicy}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Cancellation/Return/Exchange Policy"
        multiline
        value={exchangePolicy}
        onChangeText={setExchangePolicy}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
          <Text style={styles.buttonText1}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4), // Responsive padding
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: FontSize(23), // Responsive font size
    color: '#333',
    marginBottom: hp(2), // Responsive margin
    color:'#373737'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive margin
  },
  checkboxLabel: {
    marginLeft: wp(2), // Responsive margin
    fontSize: FontSize(19), // Responsive font size
    color: '#333',
  },
  input: {
    height: hp(7), // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), // Responsive margin
    paddingHorizontal: wp(2), // Responsive padding
    fontSize: FontSize(19),
  },
  textarea: {
    height: hp(10), // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), // Responsive margin
    paddingHorizontal: wp(2), // Responsive padding
    paddingVertical: wp(2), // Responsive padding
    textAlignVertical: 'top', // Ensures text starts at the top in multiline input
    fontSize: FontSize(19),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2), // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  nextButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
  buttonText1: {
    fontSize: FontSize(19), // Responsive font size
    color: '#373737',
  },
});

export default ProductPoliciesScreen;
