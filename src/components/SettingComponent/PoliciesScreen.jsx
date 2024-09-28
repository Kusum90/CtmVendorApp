import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PoliciesScreen = ({ navigation }) => { // Add navigation prop here
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [cancelPolicy, setCancelPolicy] = useState('');

  const handlePrevious = () => {
    Alert.alert('Navigating to the previous screen!');
    navigation.goBack(); // Navigate to the previous screen
  };

  const handleNext = () => {
    navigation.navigate('CustomerSupportScreen'); // Navigate to CustomerScreen
  };

  return (
    <ScrollView style={styles.container}>
      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Store Policies</Text>
      </View>

      {/* Card for Policies Input Fields */}
      <View style={styles.card}>
        <Text style={styles.subheading}>Policies Setting</Text>
        <Text style={styles.label}>Policy Tab Label</Text>
        <TextInput
          style={styles.input}
          value={shippingPolicy}
          onChangeText={setShippingPolicy}
          placeholder=" "
          multiline
          numberOfLines={2}
        />
        <Text style={styles.label}>Shipping Policy</Text>
        <TextInput
          style={styles.input}
          value={shippingPolicy}
          onChangeText={setShippingPolicy}
          placeholder=" "
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Refund Policy</Text>
        <TextInput
          style={styles.input}
          value={refundPolicy}
          onChangeText={setRefundPolicy}
          placeholder=" "
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Cancel Policy</Text>
        <TextInput
          style={styles.input}
          value={cancelPolicy}
          onChangeText={setCancelPolicy}
          placeholder=" "
          multiline
          numberOfLines={4}
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
    </ScrollView>
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
    padding: 8,
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
    textAlign: 'left',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#373737',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 60, // Minimum height for multiline input
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

export default PoliciesScreen;
