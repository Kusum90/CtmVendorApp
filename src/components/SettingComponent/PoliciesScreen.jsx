import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';

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
    padding: wp(5), // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2), // Responsive padding
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.2) }, // Responsive shadow offset
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5), // Responsive shadow radius
    marginBottom: hp(2.5), // Responsive marginBottom
  },
  heading: {
    fontSize: FontSize(24), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(2.5), // Responsive marginBottom
    color: '#373737',
    textAlign: 'left',
  },
  subheading: {
    fontSize: FontSize(18), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(2.5), // Responsive marginBottom
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14), // Responsive font size
    marginBottom: hp(1), // Responsive marginBottom
    color: '#373737',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: wp(0.3), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2.5), // Responsive padding
    marginBottom: hp(2), // Responsive marginBottom
    minHeight: hp(7.5), // Responsive minHeight for multiline input
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
export default PoliciesScreen;
