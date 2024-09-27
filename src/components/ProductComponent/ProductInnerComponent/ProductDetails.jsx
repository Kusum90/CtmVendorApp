import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductDetails = () => {
  const [productType, setProductType] = useState('');
  const [isCatalogue, setIsCatalogue] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [productName, setProductName] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isShopAndSearch, setIsShopAndSearch] = useState(false);
  const [isShopOnly, setIsShopOnly] = useState(false);
  const [isSearchResultOnly, setIsSearchResultOnly] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.header}>Product details</Text>
      </View>

      <View style={styles.contentCard}>
        {/* Image Upload Section */}
        <View style={styles.imageUploadContainer}>
          {/* Replace with actual image upload component */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Upload Image</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Product Type */}
        <Text style={styles.label}>Product Type</Text>
        <Picker
          selectedValue={productType}
          style={styles.picker}
          onValueChange={(itemValue) => setProductType(itemValue)}>
          <Picker.Item label="Select Type" value="" />
          {/* Add your product types here */}
          <Picker.Item label="Type 1" value="type1" />
          <Picker.Item label="Type 2" value="type2" />
        </Picker>

        {/* Checkboxes */}
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxItem}>
            <Switch
              value={isCatalogue}
              onValueChange={setIsCatalogue}
            />
            <Text>Catalogue</Text>
          </View>
          <View style={styles.checkboxItem}>
            <Switch
              value={isVirtual}
              onValueChange={setIsVirtual}
            />
            <Text>Virtual</Text>
          </View>
          <View style={styles.checkboxItem}>
            <Switch
              value={isDownloadable}
              onValueChange={setIsDownloadable}
            />
            <Text>Downloadable</Text>
          </View>
        </View>

        {/* Product Name */}
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />

        {/* Sale Price */}
        <Text style={styles.label}>Sale Price</Text>
        <TextInput
          style={styles.input}
          value={salePrice}
          onChangeText={setSalePrice}
          keyboardType="numeric" // Allow only numbers
        />

        {/* Regular Price */}
        <Text style={styles.label}>Regular Price</Text>
        <TextInput
          style={styles.input}
          value={regularPrice}
          onChangeText={setRegularPrice}
          keyboardType="numeric"
        />

        {/* Short Description */}
        <Text style={styles.label}>Short Description</Text>
        <TextInput
          style={styles.input}
          value={shortDescription}
          onChangeText={setShortDescription}
          multiline
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Select Category" value="" />
          {/* Add your categories here */}
          <Picker.Item label="Category 1" value="category1" />
          <Picker.Item label="Category 2" value="category2"/>
  </Picker>

{/* Tags */}
<Text style={styles.label}>Tags</Text>
<TextInput
  style={styles.input}
  value={tags}
  onChangeText={setTags}
/>

{/* Category Visibility */}
<Text style={styles.label}>Category Visibility</Text>
<View style={styles.checkboxContainer}>
  <View style={styles.checkboxItem}>
    <Switch
      value={isShopAndSearch}
      onValueChange={setIsShopAndSearch}
    />
    <Text>Shop & Search Results</Text>
  </View>
  <View style={styles.checkboxItem}>
    <Switch
      value={isShopOnly}
      onValueChange={setIsShopOnly}
    />
    <Text>Shop Only</Text>
  </View>
  <View style={styles.checkboxItem}>
    <Switch
      value={isSearchResultOnly}
      onValueChange={setIsSearchResultOnly}
    />
    <Text>Search Result only</Text>
  </View>
  <View style={styles.checkboxItem}>
    <Switch value={isHidden} onValueChange={setIsHidden} />
    <Text>Hidden</Text>
  </View>
</View>

{/* Next Button */}
<TouchableOpacity style={styles.nextButton}>
  <Text style={styles.nextButtonText}>Next</Text>
</TouchableOpacity>
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 10,
},
headerCard: {
backgroundColor: 'white',
padding: 16,
marginBottom: 16,
borderRadius: 8,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 2,
},
header: {
fontSize: 20,
fontWeight: 'bold',
},
contentCard: {
backgroundColor: 'white',
padding: 16,
borderRadius: 8,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 2,
elevation: 2,
},
// ... (rest of the styles)
imageUploadContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
},
imagePlaceholder: {
width: 80,
height: 80,
borderWidth: 1,
borderColor: '#ccc',
justifyContent: 'center',
alignItems: 'center',
marginRight: 16,
},
imagePlaceholderText: {
color: '#aaa',
},
addButton: {
backgroundColor: '#4CAF50', // Green color for add button
width: 40,
height: 40,
borderRadius: 20,
justifyContent: 'center',
alignItems: 'center',
marginLeft: 16,
},
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ProductDetails;