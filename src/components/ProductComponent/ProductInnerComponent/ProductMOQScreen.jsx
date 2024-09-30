import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#373737'
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color:'#373737'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10, 
  },
  buttonFilled: {
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 10, 
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText1: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProductMOQScreen;
