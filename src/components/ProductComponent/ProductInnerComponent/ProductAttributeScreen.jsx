import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributes } from '../../../redux/Product/ProductAttribute/CreateAttribute';
import AddAttribute from '../ProductInnerComponent/ProductAttributes/AddAttribute';
import { setProductDetails } from '../../../redux/Product/ProductSlice'; // Import action for setting product details

const ProductAttributeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch attributes from redux store
  const { attributes, loading, error } = useSelector((state) => state.attributes);

  const [searchTerms, setSearchTerms] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Dispatch the action to fetch attributes when the component mounts
    dispatch(fetchAttributes());
  }, [dispatch]);

  const handleAttributeCheckboxChange = (attributeName) => {
    setSelectedAttributes((prevState) => ({
      ...prevState,
      [attributeName]: !prevState[attributeName],
    }));
  };

  const handleSearchChange = (text, attributeName) => {
    setSearchTerms((prevState) => ({
      ...prevState,
      [attributeName.toLowerCase()]: text,
    }));
  };

  const handleValueClick = (value, attributeName) => {
    const attributeKey = attributeName.toLowerCase();

    if (!formData[attributeKey]?.includes(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [attributeKey]: [...(prevData[attributeKey] || []), value],
      }));
      setSearchTerms((prevState) => ({
        ...prevState,
        [attributeKey]: '',
      }));
    }
  };

  // Handle adding new value
  const handleAddNewValue = (attributeName) => {
    const attributeKey = attributeName.toLowerCase();
    const newValue = searchTerms[attributeKey];

    if (newValue && !formData[attributeKey]?.includes(newValue)) {
      setFormData((prevData) => ({
        ...prevData,
        [attributeKey]: [...(prevData[attributeKey] || []), newValue],
      }));
      setSearchTerms((prevState) => ({
        ...prevState,
        [attributeKey]: '',
      }));
    }
  };

  const handleNext = () => {
    // Format the attributes into an array of objects
    const formattedAttributes = Object.keys(formData).map((attributeName) => ({
      name: attributeName,
      values: formData[attributeName],
    }));

    // Dispatch selected attributes and values to the Redux store
    dispatch(setProductDetails({
      attributes: formattedAttributes, // Send attributes as an array
    }));

    // Navigate to the next screen
    navigation.navigate('ProductLinkedScreen');
  };

  const CustomCheckBox = ({ isChecked, onPress, label }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          {isChecked && <View style={styles.checked} />}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Scrollable Attribute Section */}
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Attributes</Text>

        {/* Show loading spinner while attributes are loading */}
        {loading ? (
          <ActivityIndicator size="large" color="#0EAB3D" />
        ) : error ? (
          <Text style={styles.errorText}>Failed to load attributes: {error}</Text>
        ) : (
          attributes.map((attribute) => (
            <View key={attribute._id} style={styles.attributeSection}>
              <View style={styles.checkboxContainer}>
                <CustomCheckBox
                  isChecked={selectedAttributes[attribute.attribute_name] || false}
                  onPress={() => handleAttributeCheckboxChange(attribute.attribute_name)}
                  label={attribute.attribute_name}
                />
              </View>

              {selectedAttributes[attribute.attribute_name] && (
                <View style={styles.attributeDetails}>
                  <Text style={styles.subHeader}>Search {attribute.attribute_name}</Text>
                  <TextInput
                    style={styles.searchInput}
                    value={searchTerms[attribute.attribute_name.toLowerCase()] || ''}
                    onChangeText={(text) =>
                      handleSearchChange(text, attribute.attribute_name)
                    }
                    placeholder={`Search for ${attribute.attribute_name}`}
                  />

                  {/* Display search results */}
                  {searchTerms[attribute.attribute_name.toLowerCase()] && (
                    <View style={styles.searchResults}>
                      {attribute.values
                        .filter((value) =>
                          value
                            .toLowerCase()
                            .includes(
                              searchTerms[attribute.attribute_name.toLowerCase()].toLowerCase()
                            )
                        )
                        .map((value) => (
                          <TouchableOpacity
                            key={value}
                            onPress={() => handleValueClick(value, attribute.attribute_name)}
                            style={styles.resultItem}
                          >
                            <Text>{value}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}

                  {/* Add New button */}
                  <TouchableOpacity
                    style={styles.addNewButton}
                    onPress={() => handleAddNewValue(attribute.attribute_name)}
                  >
                    <Text style={styles.addNewButtonText}>Add New</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}

        {/* Navigation buttons */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Import and render AddAttribute */}
      <AddAttribute />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  attributeSection: {
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0EAB3D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#0EAB3D',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  searchResults: {
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 150,
    padding: 8,
    borderRadius: 4,
  },
  resultItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addNewButton: {
    backgroundColor: '#0EAB3D',
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
  },
  addNewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  previousButton: {
    backgroundColor: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProductAttributeScreen;
