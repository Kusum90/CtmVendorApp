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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributes, addAttributeValue } from '../../../redux/Product/ProductAttribute/CreateAttribute';
import AddAttribute from '../ProductInnerComponent/ProductAttributes/AddAttribute';
import { setProductDetails, fetchProductDetails } from '../../../redux/Product/ProductSlice';
import CustomToast from '../../../utils/CustomToast';

const ProductAttributeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { productId } = route.params || {};
  const { attributes, loading, error } = useSelector((state) => state.attributes);
  const { productDetails } = useSelector((state) => state.products);

  const [searchTerms, setSearchTerms] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [formData, setFormData] = useState({});
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [addingValue, setAddingValue] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAttributes()).then(() => {
      setFilteredAttributes(attributes); 
    });
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (attributes.length > 0) {
      setFilteredAttributes(attributes);
    }
  }, [attributes]);

  useEffect(() => {
    if (productId && productDetails && productDetails.attributes) {
      console.log('Populating fields with existing product data:', productDetails);
  
      // Initialize selectedAttributes and formData based on fetched product details
      const preselectedAttributes = {};
      const prefilledFormData = {};
  
      productDetails.attributes.forEach((attr) => {
        const attributeKey = attr.attribute_name; // Use lowercase for consistency
        preselectedAttributes[attr.attribute_name] = true; // Mark the attribute as selected
        prefilledFormData[attributeKey] = attr.values || []; // Add selected values
      });
  
      setSelectedAttributes(preselectedAttributes);
      setFormData(prefilledFormData);
  
      console.log('Selected Attributes:', preselectedAttributes);
      console.log('Form Data:', prefilledFormData);
    }
  }, [productDetails, productId]);
  

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

    const filtered = attributes.map(attr => {
      if (attr.attribute_name.toLowerCase() === attributeName.toLowerCase()) {
        return {
          ...attr,
          values: attr.values.filter(value => 
            value.toLowerCase().includes(text.toLowerCase())
          )
        };
      }
      return attr;
    });
    setFilteredAttributes(filtered);
  };

  const handleValueClick = (value, attributeName) => {
    const attributeKey = attributeName.toLowerCase();

    setFormData((prevData) => {
      const values = prevData[attributeKey] || [];
      return {
        ...prevData,
        [attributeKey]: values.includes(value)
          ? values.filter((val) => val !== value)
          : [...values, value],
      };
    });
  };

  const handleAddNewValue = (attributeId) => {
    setAddingValue(attributeId);
  };

  const handleSubmitNewValue = (attributeId) => {
    if (newValue.trim() === '') return;

    dispatch(addAttributeValue({ id: attributeId, value: newValue }))
      .unwrap()
      .then(() => {
        setNewValue('');
        setAddingValue(null);
        dispatch(fetchAttributes());
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
      })
      .catch((error) => console.error('Error adding value:', error));
  };

  const handleRemoveValue = (attributeName, value) => {
    const attributeKey = attributeName.toLowerCase();
    setFormData((prevData) => ({
      ...prevData,
      [attributeKey]: prevData[attributeKey].filter((val) => val !== value),
    }));
  };  

  const handleNext = () => {
    // Create the correct structure for attributes
    const formattedAttributes = filteredAttributes
      .filter(attr => selectedAttributes[attr.attribute_name]) // Only include selected attributes
      .map(attr => ({
        attributeId: attr._id, // Use _id as attributeId
        values: formData[attr.attribute_name.toLowerCase()] || [], // Include selected values
      }));
  
    // Log the formatted attributes for debugging
    console.log("Formatted attributes to send:", formattedAttributes);
  
    // Dispatch the product details, maintaining the backend-expected structure
    dispatch(setProductDetails({ attributes: formattedAttributes }));
  
    // Navigate to the next screen
    navigation.navigate('ProductLinkedScreen', { productId });
  };
  
  

  const CustomCheckBox = ({ isChecked, onPress, label }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={styles.checkbox}>{isChecked && <View style={styles.checked} />}</View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Attributes</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0EAB3D" />
        ) : error ? (
          <Text style={styles.errorText}>Failed to load attributes: {error}</Text>
        ) : (
          filteredAttributes.map((attribute) => (
            <View key={attribute._id} style={styles.attributeSection}>
              <CustomCheckBox
                isChecked={selectedAttributes[attribute.attribute_name] || false}
                onPress={() => handleAttributeCheckboxChange(attribute.attribute_name)}
                label={attribute.attribute_name}
              />

              {selectedAttributes[attribute.attribute_name] && (
                <View style={styles.attributeDetails}>
                  <Text style={styles.subHeader}>Search {attribute.attribute_name}</Text>
                  <TextInput
                    style={styles.searchInput}
                    value={searchTerms[attribute.attribute_name.toLowerCase()] || ''}
                    onChangeText={(text) => handleSearchChange(text, attribute.attribute_name)}
                    placeholder={`Search for ${attribute.attribute_name}`}
                  />

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

                  <TouchableOpacity
                    style={styles.addNewButton}
                    onPress={() => handleAddNewValue(attribute._id)}
                  >
                    <Text style={styles.addNewButtonText}>Add New</Text>
                  </TouchableOpacity>

                  {addingValue === attribute._id && (
                    <View style={styles.addNewValueContainer}>
                      <TextInput
                        style={styles.newValueInput}
                        value={newValue}
                        onChangeText={setNewValue}
                        placeholder="Enter new value"
                      />
                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => handleSubmitNewValue(attribute._id)}
                      >
                        <Text style={styles.submitButtonText}>
                          {loading ? 'Submitting...' : 'Submit'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.selectedValuesContainer}>
                    {formData[attribute.attribute_name.toLowerCase()]?.map((value) => (
                      <View key={value} style={styles.selectedValue}>
                        <Text>{value}</Text>
                        <TouchableOpacity onPress={() => handleRemoveValue(attribute.attribute_name, value)}>
                          <Text style={styles.removeText}>X</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))
        )}

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AddAttribute />
      <CustomToast visible={toastVisible} message="Value added successfully!" />
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
  selectedValuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  selectedValue: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  removeText: {
    color: 'red',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  addNewValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  newValueInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0EAB3D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#0EAB3D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProductAttributeScreen;
