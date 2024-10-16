import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch } from 'react-redux';
import { setShippingDetails } from '../../../redux/Product/ProductSlice';

const ProductShippingScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch(); 

  const [weight, setWeight] = useState(''); 
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  // Default valid enum values
  const [selectedProcessingTime, setSelectedProcessingTime] = useState('1 business day'); 
  const [selectedShippingClass, setSelectedShippingClass] = useState('Free Shipping'); 

  const handleDimensionChange = (key, value) => {
    setDimensions((prevDimensions) => ({ ...prevDimensions, [key]: value }));
  };

  const handleProcessingTimeChange = (value) => {
    setSelectedProcessingTime(value);
  };

  const handleShippingClassChange = (value) => {
    setSelectedShippingClass(value);
  };

  const handleNext = () => {
    // Ensure all fields are valid before dispatching to the backend
    dispatch(
      setShippingDetails({
        weight: weight ? Number(weight) : null, // Convert weight to number
        length: dimensions.length ? Number(dimensions.length) : null, 
        width: dimensions.width ? Number(dimensions.width) : null, 
        height: dimensions.height ? Number(dimensions.height) : null, 
        shippingClass: selectedShippingClass, // Valid value from enum
        processingTime: selectedProcessingTime, // Valid value from enum
      })
    );

    // Navigate to the next screen
    navigation.navigate('ProductTaxScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>Shipping</Text>
      </View>

      <View style={styles.card}>
        {/* Weight Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Weight (gms)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>

        {/* Dimensions Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Dimensions</Text>
          <View style={styles.dimensionButtons}>
            <TextInput
              placeholder="Length"
              value={dimensions.length}
              onChangeText={(value) => handleDimensionChange('length', value)}
              style={styles.dimensionInput}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Width"
              value={dimensions.width}
              onChangeText={(value) => handleDimensionChange('width', value)}
              style={styles.dimensionInput}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Height"
              value={dimensions.height}
              onChangeText={(value) => handleDimensionChange('height', value)}
              style={styles.dimensionInput}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Shipping Class Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Shipping Class</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleShippingClassChange('Free Shipping')}>
            <View
              style={[
                styles.radioButtonIcon,
                selectedShippingClass === 'Free Shipping' &&
                styles.radioButtonIconChecked,
              ]}
            />
            <Text style={styles.radioButtonText}>Free Shipping</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleShippingClassChange('Third Party Shipping')}>
            <View
              style={[
                styles.radioButtonIcon,
                selectedShippingClass === 'Third Party Shipping' &&
                styles.radioButtonIconChecked,
              ]}
            />
            <Text style={styles.radioButtonText}>Third Party Shipping</Text>
          </TouchableOpacity>
        </View>

        {/* Processing Time Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Processing Time</Text>
          {[
            '1 business day',
            '1-2 business days',
            '1-3 business days',
            '3-5 business days',
            '1-2 weeks',
            '2-3 weeks',
            '3-4 weeks',
            '4-6 weeks',
            '6-8 weeks',
          ].map((time, index) => (
            <TouchableOpacity
              key={index}
              style={styles.radioButton}
              onPress={() => handleProcessingTimeChange(time)}>
              <View
                style={[
                  styles.radioButtonIcon,
                  selectedProcessingTime === time &&
                  styles.radioButtonIconChecked,
                ]}
              />
              <Text style={styles.radioButtonText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleNext}>
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
    backgroundColor: '#fff',
    padding: wp(5),
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: wp(4),
    marginBottom: hp(2.5),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  headerText: {
    fontSize: FontSize(24),
    fontWeight: 'bold',
    color: '#373737',
  },
  section: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: FontSize(18),
    marginBottom: hp(1),
  },
  input: {
    height: hp(5),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(1),
  },
  dimensionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionInput: {
    width: wp(25),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: wp(2),
    height: hp(5),
    textAlign: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  radioButtonIcon: {
    width: wp(5),
    height: wp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: wp(2),
  },
  radioButtonIconChecked: {
    backgroundColor: 'green',
  },
  radioButtonText: {
    fontSize: FontSize(18),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  buttonText: {
    fontSize: FontSize(18),
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(18),
    color: '#fff',
  },
});

export default ProductShippingScreen;
