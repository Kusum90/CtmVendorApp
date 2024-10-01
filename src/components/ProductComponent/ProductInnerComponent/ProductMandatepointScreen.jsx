import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';
import { ScrollView } from 'react-native-gesture-handler';

const ProductMandatepointScreen = () => {
  const [assemblyRequired, setAssemblyRequired] = useState(false);
  const [powerSource, setPowerSource] = useState('');
  const [hsnCode, setHsnCode] = useState('');

  const navigation = useNavigation(); // Initialize navigation

  const handleAssemblyRequiredChange = (value) => {
    setAssemblyRequired(value);
  };

  const handlePowerSourceChange = (value) => {
    setPowerSource(value);
  };

  const handleHsnCodeChange = (value) => {
    setHsnCode(value);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title Card */}
      <View style={styles.titleCard}>
        <Text style={styles.title}>Mandate Point</Text>
      </View>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Is Assembly Required (Yes/No)</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handleAssemblyRequiredChange(true)}>
              <View style={styles.checkbox}>
                {assemblyRequired && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Yes</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handleAssemblyRequiredChange(false)}>
              <View style={styles.checkbox}>
                {!assemblyRequired && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>No</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Power Source</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handlePowerSourceChange('Battery Powered')}>
              <View style={styles.checkbox}>
                {powerSource === 'Battery Powered' && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Battery Powered</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handlePowerSourceChange('Solar Power')}>
              <View style={styles.checkbox}>
                {powerSource === 'Solar Power' && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Solar Power</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handlePowerSourceChange('Coarded')}>
              <View style={styles.checkbox}>
                {powerSource === 'Coarded' && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Coarded</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HSN Code</Text>
          <TextInput
            style={styles.input}
            placeholder="-Select-"
            value={hsnCode}
            onChangeText={handleHsnCodeChange}
          />
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
            onPress={() => navigation.navigate('ProductSustanibilityScreen')} // Navigate to next screen
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
    padding: wp(3), // Responsive padding
    backgroundColor: '#f2f2f2',
  },
  titleCard: {
    backgroundColor: '#ffffff',
    padding: wp(3), // Responsive padding
    borderRadius: 10,
    marginBottom: hp(3), // Responsive margin
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: FontSize(25), // Responsive font size
    fontWeight: 'bold',
    textAlign: 'left',
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
  section: {
    marginBottom: hp(3), // Responsive margin
  },
  sectionTitle: {
    fontSize: FontSize(21), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(2), // Responsive margin
    color: '#373737',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1), // Responsive margin
  },
  checkbox: {
    width: wp(5), // Responsive width
    height: wp(5), // Responsive height
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: wp(2), // Responsive margin
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIcon: {
    width: wp(3), // Responsive width
    height: wp(3), // Responsive height
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: FontSize(19), // Responsive font size
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: wp(3), // Responsive padding
    fontSize: FontSize(19), // Responsive font size
    color: '#373737',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2), // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
});


export default ProductMandatepointScreen;
