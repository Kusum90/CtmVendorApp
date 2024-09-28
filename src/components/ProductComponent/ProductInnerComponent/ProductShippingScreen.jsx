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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProductTaxScreen')}>
            {/* Navigate to ProductTaxScreen */}
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
    backgroundColor: '#fff',
    padding: 10,
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dimensionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionButton: {
    width: 80,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimensionButtonActive: {
    backgroundColor: '#ccc',
  },
  dimensionButtonText: {
    fontSize: 14,
  },
  dimensionButtonTextActive: {
    color: '#fff',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  radioButtonIconChecked: {
    backgroundColor: 'green',
  },
  radioButtonText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ProductShippingScreen;
