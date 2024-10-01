import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductShippingScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const [selectedProcessingTime, setSelectedProcessingTime] = useState(null);
  const [selectedStockStatus, setSelectedStockStatus] = useState(null);

  const handleDimensionChange = (key, value) => {
    setDimensions((prevDimensions) => ({ ...prevDimensions, [key]: value }));
  };

  const handleProcessingTimeChange = (value) => {
    setSelectedProcessingTime(value);
  };

  const handleStockStatusChange = (value) => {
    setSelectedStockStatus(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>Shipping</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.label}>Weight (gms)</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Dimensions</Text>
          <View style={styles.dimensionButtons}>
            <TouchableOpacity
              style={[
                styles.dimensionButton,
                dimensions.length && styles.dimensionButtonActive,
              ]}
              onPress={() => handleDimensionChange('length', '...')}>
              <Text
                style={[
                  styles.dimensionButtonText,
                  dimensions.length && styles.dimensionButtonTextActive,
                ]}>
                Length
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dimensionButton,
                dimensions.width && styles.dimensionButtonActive,
              ]}
              onPress={() => handleDimensionChange('width', '...')}>
              <Text
                style={[
                  styles.dimensionButtonText,
                  dimensions.width && styles.dimensionButtonTextActive,
                ]}>
                Width
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dimensionButton,
                dimensions.height && styles.dimensionButtonActive,
              ]}
              onPress={() => handleDimensionChange('height', '...')}>
              <Text
                style={[
                  styles.dimensionButtonText,
                  dimensions.height && styles.dimensionButtonTextActive,
                ]}>
                Height
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Stock Status</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleStockStatusChange('Free Shipping')}>
            <View
              style={[
                styles.radioButtonIcon,
                selectedStockStatus === 'Free Shipping' &&
                  styles.radioButtonIconChecked,
              ]}
            />
            <Text style={styles.radioButtonText}>Free Shipping</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleStockStatusChange('Third Party Shipping')}>
            <View
              style={[
                styles.radioButtonIcon,
                selectedStockStatus === 'Third Party Shipping' &&
                  styles.radioButtonIconChecked,
              ]}
            />
            <Text style={styles.radioButtonText}>Third Party Shipping</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Processing Time</Text>
          {[
            'ready To ship in',
            '1 business Day',
            '1-2 business day',
            '1-3 business day',
            '3-5 business day',
            '1-2 weeks',
            '2-3 weeks',
            '3-4 weeks',
            '4-6 weeks',
            '6-7 weeks',
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()} // Navigate to previous screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('ProductTaxScreen')} // Navigate to next screen
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
    backgroundColor: '#fff',
    padding: wp(5),                   // Responsive padding
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: wp(4),                   // Responsive padding
    marginBottom: hp(2.5),           // Responsive margin
    elevation: 3,                     // For Android shadow
    shadowColor: '#000',              // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.2,               // For iOS shadow
    shadowRadius: 1.5,                // For iOS shadow
  },
  headerText: {
    fontSize: FontSize(24),           // Responsive font size
    fontWeight: 'bold',
    color:'#373737'
  },
  section: {
    marginBottom: hp(2.5),           // Responsive margin
  },
  label: {
    fontSize: FontSize(18),           // Responsive font size
    marginBottom: hp(1),              // Responsive margin
  },
  input: {
    height: hp(5),                    // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: wp(2.5),       // Responsive padding
    paddingVertical: hp(1),            // Responsive padding
  },
  dimensionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionButton: {
    width: wp(20),                    // Responsive width
    height: hp(4),                    // Responsive height
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimensionButtonActive: {
    backgroundColor: '#ccc',
  },
  dimensionButtonText: {
    fontSize: FontSize(16),           // Responsive font size
  },
  dimensionButtonTextActive: {
    color: '#fff',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),              // Responsive margin
  },
  radioButtonIcon: {
    width: wp(5),                     // Responsive width
    height: wp(5),                    // Responsive height
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: wp(2),               // Responsive margin
  },
  radioButtonIconChecked: {
    backgroundColor: 'green',
  },
  radioButtonText: {
    fontSize: FontSize(18),           // Responsive font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),                // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5),         // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5),         // Responsive padding
    paddingHorizontal: wp(6),          // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(18),           // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(18),           // Responsive font size
    color: '#fff',
  },
});

export default ProductShippingScreen;
