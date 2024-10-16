import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch } from 'react-redux'; // Import Redux hook
import { setProductDetails } from '../../../redux/Product/ProductSlice'; // Import Redux action

const ProductSustanibilityScreen = () => {
  const [sustainabilityRemark, setSustainabilityRemark] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState('');

  const dispatch = useDispatch(); // Initialize dispatch
  const navigation = useNavigation(); // Hook to handle navigation

  // Handle the next button click to dispatch data to Redux and navigate to the next screen
  const handleNext = () => {
    // Dispatch the values to Redux store
    dispatch(setProductDetails({
      sustainabilityRemark,
      carbonFootprint,
    }));

    // Navigate to the next screen
    navigation.navigate('ProductMOQScreen');
  };

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
            value={sustainabilityRemark}
            onChangeText={setSustainabilityRemark}
            multiline
          />

          <Text style={styles.label}>Carbon Footprint</Text>
          <TextInput
            style={styles.input}
            value={carbonFootprint}
            onChangeText={setCarbonFootprint}
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
            onPress={handleNext} // Handle dispatch and navigate to next screen
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
    padding: wp(3), // Responsive padding
  },
  headerCard: {
    backgroundColor: '#f8f9fa',
    padding: wp(5), // Responsive padding
    borderRadius: 10,
    marginBottom: hp(3), // Responsive margin
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
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
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
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
    textAlignVertical: 'top', // Allow multiline text to start from top
    fontSize: FontSize(19), // Responsive font size
    color: '#373737',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2), // Responsive margin
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
    fontSize: FontSize(19),
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize(19), // Responsive font size
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize(19), // Responsive font size
  },
});

export default ProductSustanibilityScreen;
