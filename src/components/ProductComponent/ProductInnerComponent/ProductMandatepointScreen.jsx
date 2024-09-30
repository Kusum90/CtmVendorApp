import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  titleCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#373737',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    color: '#373737',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ProductMandatepointScreen;
