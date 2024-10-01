import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

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
    padding: wp(5), // Responsive padding
  },
  section: {
    marginBottom: hp(2.5), // Responsive margin
  },
  header: {
    fontSize: FontSize(22), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(1), // Responsive margin
    color:'#373737'
  },
  picker: {
    height: hp(6), // Responsive height
    width: '100%',
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
    paddingVertical: hp(2), // Responsive vertical padding
    paddingHorizontal: wp(6), // Responsive horizontal padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(2), // Responsive vertical padding
    paddingHorizontal: wp(6), // Responsive horizontal padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
});
export default ProductLinkedScreen;
