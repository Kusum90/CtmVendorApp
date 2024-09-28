import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';

const ProductTaxScreen = () => {
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 1.5, // For iOS shadow
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProductTaxScreen;