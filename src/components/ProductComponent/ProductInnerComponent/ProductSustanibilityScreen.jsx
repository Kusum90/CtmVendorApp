import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductSustanibilityScreen = () => {
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const navigation = useNavigation(); // Hook to handle navigation

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Sustainability Fields</Text>
      </View>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sustainability Remark</Text>
          <TextInput
            style={styles.input}
            value={focusKeyword}
            onChangeText={setFocusKeyword}
            multiline
          />

          <Text style={styles.label}>CarbonFootprint</Text>
          <TextInput
            style={styles.input}
            value={metaDescription}
            onChangeText={setMetaDescription}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Previous Button */}
          <TouchableOpacity 
            style={styles.buttonOutline} 
            onPress={() => navigation.goBack()} // Go back to the previous screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity 
            style={styles.buttonFilled} 
            onPress={() => navigation.navigate('ProductMOQScreen')} // Navigate to ProductMOQ screen
          >
            <Text style={styles.buttonText1}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#373737',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top', // Allow multiline text to start from top
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductSustanibilityScreen;
