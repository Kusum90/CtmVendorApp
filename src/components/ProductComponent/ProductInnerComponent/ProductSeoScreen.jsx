import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductSeoScreen = () => {
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const navigation = useNavigation(); // Access the navigation object

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>SEO</Text>
      </View>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter a focus keyword</Text>
          <TextInput
            style={styles.input}
            value={focusKeyword}
            onChangeText={setFocusKeyword}
            multiline
          />

          <Text style={styles.label}>Meta description</Text>
          <TextInput
            style={styles.input}
            value={metaDescription}
            onChangeText={setMetaDescription}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.goBack()} // Navigate to ProductLinked screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonFilled}
            onPress={() => navigation.navigate('ProductMandatePointScreen')} // Navigate to ProductMandatePoint screen
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
    padding: wp(5), // Responsive padding
  },
  headerCard: {
    backgroundColor: '#f8f9fa',
    padding: wp(5), // Responsive padding
    borderRadius: 10,
    marginBottom: hp(3), // Responsive margin
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: FontSize(22), // Responsive font size
    fontWeight: 'bold',
    color: '#373737',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: wp(5), // Responsive padding
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: hp(3), // Responsive margin
    
  },
  label: {
    marginBottom: hp(1), // Responsive margin
    color: '#373737',
    fontSize: FontSize(19),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(3), // Responsive padding
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: FontSize(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#28a745',
    padding: wp(3), // Responsive padding
    borderRadius: 5,
    marginRight: wp(2), // Responsive margin
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: wp(3), // Responsive padding
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize(19),
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize(19),
  },
});

export default ProductSeoScreen;
