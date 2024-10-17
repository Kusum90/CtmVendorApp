import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch } from 'react-redux'; 
import { setProductDetails } from '../../../redux/Product/ProductSlice'; // Assuming the action is already defined in the slice
import { Picker } from '@react-native-picker/picker'; 

const ProductTaxScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch(); 

  const [taxStatus, setTaxStatus] = useState('taxable'); // Default value for taxStatus
  const [taxClass, setTaxClass] = useState('standard');  // Default value for taxClass

  // Function to handle next button click
  const handleNext = () => {
    // Dispatch taxStatus and taxClass to Redux store
    dispatch(setProductDetails({
      taxStatus, // Valid value directly from the state
      taxClass,  // Valid value directly from the state
    }));

    console.log("Tax Details Dispatched:", { taxStatus, taxClass });

    // Navigate to the next screen
    navigation.navigate('ProductAttributeScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Tax Details</Text>
      </View>

      {/* Tax Status Picker */}
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.title}>Tax Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={taxStatus}
              onValueChange={(itemValue) => setTaxStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Taxable" value="taxable" />
              <Picker.Item label="Shipping Only" value="shipping only" />
              <Picker.Item label="None" value="none" />
            </Picker>
          </View>
        </View>

        {/* Tax Class Picker */}
        <View style={styles.section}>
          <Text style={styles.title}>Tax Class</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={taxClass}
              onValueChange={(itemValue) => setTaxClass(itemValue)}
              style={styles.ppicker}
            >
              <Picker.Item label="Standard" value="standard" />
              <Picker.Item label="Reduced Rate" value="reduced rate" />
              <Picker.Item label="Zero Rate" value="zero rate" />
            </Picker>
          </View>
        </View>

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()} // Navigate to previous screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleNext} // Dispatch Redux action and navigate
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
    marginBottom: hp(1),               // Responsive margin
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: hp(5),                     // Responsive height
    width: '100%',
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
    paddingHorizontal: wp(6),          // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),          // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
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
