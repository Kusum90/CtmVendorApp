import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { searchCategories } from '../../../../redux/Product/ProductAttribute/ProductAttribute'; // Import your category search action

const CategorySearch = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // To control visibility of dropdown

  useEffect(() => {
    if (categorySearchTerm) {
      dispatch(searchCategories(categorySearchTerm)); // Trigger category search when search term changes
      setShowDropdown(true); // Show dropdown when search term is not empty
    } else {
      setShowDropdown(false); // Hide dropdown when search term is empty
    }
  }, [categorySearchTerm, dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set the selected category
    setCategorySearchTerm(''); // Clear the search term after selection
    setShowDropdown(false); // Hide dropdown after selection
  };

  const handleCategoryRemove = () => {
    setSelectedCategory(null); // Remove the selected category
  };

  return (
    <View>
      <Text style={styles.label}>Search for Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Category..."
        value={categorySearchTerm}
        onChangeText={(text) => setCategorySearchTerm(text)}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      )}

      {/* Dropdown will only be visible when showDropdown is true */}
      {showDropdown && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id} // Assuming categories have an 'id'
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategorySelect(item)} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      {/* Show selected category with a box */}
      {selectedCategory && (
        <View style={styles.selectedCategoryContainer}>
          <Text style={styles.selectedCategoryText}>{selectedCategory.name}</Text>
          <TouchableOpacity onPress={handleCategoryRemove} style={styles.removeSelectedCategory}>
            <Text style={styles.removeSelectedCategoryText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  dropdown: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#eef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selectedCategoryText: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  removeSelectedCategory: {
    backgroundColor: '#ff6666',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeSelectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default CategorySearch;
