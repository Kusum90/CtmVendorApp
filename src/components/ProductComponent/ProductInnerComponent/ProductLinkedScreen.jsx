import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductLinkedScreen = ({ navigation }) => {
  const [selectedUpSell, setSelectedUpSell] = useState('');
  const [selectedCrossSell, setSelectedCrossSell] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Up - sells</Text>
        <Picker
          selectedValue={selectedUpSell}
          onValueChange={(itemValue) => setSelectedUpSell(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Find by Product" value="" />
          {/* Add more product options here */}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Cross-sells</Text>
        <Picker
          selectedValue={selectedCrossSell}
          onValueChange={(itemValue) => setSelectedCrossSell(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Find by Product" value="" />
          {/* Add more product options here */}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()} // Navigate to previous screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('ProductSeoScreen')} // Navigate to next screen
          >
            <Text style={styles.buttonTextAdd}>Next</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
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
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ProductLinkedScreen;
