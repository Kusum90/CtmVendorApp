import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails } from '../../../redux/Product/ProductSlice';
import { MandatePoints } from '../../../redux/Product/ProductAttribute/ProductAttribute';

const ProductMandatepointScreen = () => {
  const [assemblyRequired, setAssemblyRequired] = useState(false);
  const [powerSource, setPowerSource] = useState('');
  const [hsnSearchTerm, setHsnSearchTerm] = useState('');
  const [selectedHsnCodeId, setSelectedHsnCodeId] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { loading, hsnCodes, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (hsnSearchTerm) {
      dispatch(MandatePoints(hsnSearchTerm));
    }
  }, [hsnSearchTerm, dispatch]);

  const handleNext = () => {
    if (!powerSource || !selectedHsnCodeId) {
      Alert.alert('Validation Error', 'Please select a power source and enter an HSN code.');
      return;
    }

    dispatch(
      setProductDetails({
        isAssemblyRequired: assemblyRequired,
        powerSource,
        hsnCode: [selectedHsnCodeId],
      })
    );

    navigation.navigate('ProductSustanibilityScreen');
  };

  const handleAssemblyRequiredChange = (value) => {
    setAssemblyRequired(value);
  };

  const handlePowerSourceChange = (value) => {
    setPowerSource(value);
  };

  const handleHsnCodeChange = (value) => {
    setHsnSearchTerm(value);
  };

  const handleSelectHsnCode = (hsnCodeId) => {
    setSelectedHsnCodeId(hsnCodeId);
    setHsnSearchTerm('');
  };

  const handleRemoveHsnCode = () => {
    setSelectedHsnCodeId('');
    setHsnSearchTerm('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>Mandate Point</Text>
      </View>

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
            <TouchableOpacity onPress={() => handlePowerSourceChange('Solar Powered')}>
              <View style={styles.checkbox}>
                {powerSource === 'Solar Powered' && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Solar Powered</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handlePowerSourceChange('Corded')}>
              <View style={styles.checkbox}>
                {powerSource === 'Corded' && <View style={styles.checkedIcon} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Corded</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HSN Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Search HSN Code..."
            value={hsnSearchTerm}
            onChangeText={handleHsnCodeChange}
            editable={!selectedHsnCodeId}
          />

          {loading && <Text>Loading HSN Codes...</Text>}

          {!selectedHsnCodeId && hsnCodes?.length > 0 && (
            <FlatList
              data={hsnCodes}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectHsnCode(item._id)}>
                  <Text style={styles.hsnCodeItem}>{item.hsnCode}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {selectedHsnCodeId && (
            <View style={styles.selectedHsnCode}>
              <Text>Selected HSN Code ID: {selectedHsnCodeId}</Text>
              <TouchableOpacity onPress={handleRemoveHsnCode}>
                <Text style={styles.removeButton}>X</Text>
              </TouchableOpacity>
            </View>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleNext}
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
    padding: wp(3),
    backgroundColor: '#f2f2f2',
  },
  titleCard: {
    backgroundColor: '#ffffff',
    padding: wp(3),
    borderRadius: 10,
    marginBottom: hp(3),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: FontSize(25),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#373737',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: wp(5),
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: FontSize(21),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: '#373737',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  checkbox: {
    width: wp(5),
    height: wp(5),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIcon: {
    width: wp(3),
    height: wp(3),
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: FontSize(19),
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: wp(3),
    fontSize: FontSize(19),
    color: '#373737',
  },
  hsnCodeItem: {
    padding: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedHsnCode: {
    marginTop: hp(2),
    padding: hp(1),
    backgroundColor: '#e7f4ff',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    fontSize: FontSize(18),
    color: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: hp(1),
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
    fontSize: FontSize(19),
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19),
    color: '#fff',
  },
});

export default ProductMandatepointScreen;
