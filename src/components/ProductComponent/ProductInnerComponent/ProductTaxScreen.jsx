import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductTaxScreen = () => {
  const navigation = useNavigation(); // Get the navigation prop

  // Using arrays to hold the selected options
  const [taxStatus, setTaxStatus] = useState([]);
  const [taxClass, setTaxClass] = useState([]);

  // Function to toggle tax status options
  const handleTaxStatusChange = (option) => {
    setTaxStatus((prev) => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  // Function to toggle tax class options
  const handleTaxClassChange = (option) => {
    setTaxClass((prev) => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Tax</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.title}>Tax Status</Text>
          {['Taxable', 'Shipping Only', 'None'].map(option => (
            <TouchableOpacity key={option} style={styles.option} onPress={() => handleTaxStatusChange(option)}>
              <Text style={styles.optionText}>{option}</Text>
              <Switch 
                value={taxStatus.includes(option)} 
                onValueChange={() => handleTaxStatusChange(option)} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Tax Class</Text>
          {['Standard', 'Reduced Rate', 'Zero rate'].map(option => (
            <TouchableOpacity key={option} style={styles.option} onPress={() => handleTaxClassChange(option)}>
              <Text style={styles.optionText}>{option}</Text>
              <Switch 
                value={taxClass.includes(option)} 
                onValueChange={() => handleTaxClassChange(option)} 
              />
            </TouchableOpacity>
          ))}
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
            onPress={() => navigation.navigate('ProductAttributeScreen')} // Navigate to next screen
          >
            <Text style={styles.buttonTextAdd}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),                    // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: wp(4),                    // Responsive padding
    marginBottom: hp(2.5),             // Responsive margin
    elevation: 3,                      // For Android shadow
    shadowColor: '#000',               // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.2,                // For iOS shadow
    shadowRadius: 1.5,                 // For iOS shadow
  },
  header: {
    fontSize: FontSize(24),            // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(1),             // Responsive margin
    color:'#373737'
  },
  section: {
    marginBottom: hp(2.5),             // Responsive margin
  },
  title: {
    fontSize: FontSize(21),            // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(1),               // Responsive margin
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),            // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: FontSize(19),            // Responsive font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),                 // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5),          // Responsive padding
    paddingHorizontal: wp(6),           // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),          // Responsive padding
    paddingHorizontal: wp(6),           // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19),            // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19),            // Responsive font size
    color: '#fff',
  },
});

export default ProductTaxScreen;
