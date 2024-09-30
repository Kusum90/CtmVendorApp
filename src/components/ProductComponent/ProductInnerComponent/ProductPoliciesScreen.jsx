import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

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
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textarea: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlignVertical: 'top', // Ensures text starts at the top in multiline input
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  nextButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonText1: {
    fontSize: 16,
    color: '#373737',
  },
});

export default ProductPoliciesScreen;
