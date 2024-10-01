import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductMOQScreen = () => {
  const [moq, setMoq] = useState('');
  const navigation = useNavigation(); // Initialize navigation hook

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerText}>MOQ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Minimum Order Quantity</Text>
        <TextInput
          style={styles.input}
          value={moq}
          onChangeText={setMoq}
          keyboardType="numeric" 
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
          onPress={() => navigation.navigate('ProductUnitsScreen')} // Navigate to ProductUnitsScreen
        >
          <Text style={styles.buttonText1}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: wp(5), // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: FontSize(24), // Responsive font size
    fontWeight: 'bold',
    color: '#373737',
  },
  content: {
    paddingHorizontal: wp(5), // Responsive padding
    paddingTop: hp(5), // Responsive padding
  },
  label: {
    fontSize: FontSize(19), // Responsive font size
    marginBottom: hp(2), // Responsive margin
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp(3), // Responsive padding
    fontSize: FontSize(16), // Responsive font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: wp(5), // Responsive padding
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 5,
    padding: wp(3), // Responsive padding
    flex: 1,
    marginRight: wp(2), // Responsive margin
  },
  buttonFilled: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: wp(3), // Responsive padding
    flex: 1,
    marginLeft: wp(2), // Responsive margin
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize(19), // Responsive font size
  },
  buttonText1: {
    color: '#fff',
    textAlign: 'center',
    fontSize: FontSize(19), // Responsive font size
  },
});


export default ProductMOQScreen;
