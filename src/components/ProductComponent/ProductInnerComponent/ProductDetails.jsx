import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Switch, Image } from 'react-native';
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';
import { Picker } from '@react-native-picker/picker';

const ProductDetails = ({ navigation }) => {
  const [selectedProductType, setSelectedProductType] = useState('');
  const [category, setCategory] = useState('');
  
  // Toggles for Catalogue, Virtual, and Downloadable
  const [isCatalogue, setIsCatalogue] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [isDownloadable, setIsDownloadable] = useState(false);
  
  // Category Visibility Toggles
  const [categoryVisibility, setCategoryVisibility] = useState({
    shopSearch: false,
    shopOnly: false,
    searchResultOnly: false,
    hidden: false,
  });

  const toggleVisibility = (key) => {
    setCategoryVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = () => {
    // Navigate to the next screen when the Next button is pressed
    navigation.navigate('ProductInventoryScreen');  // Replace 'NextScreen' with your screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}> Product details</Text>
      </TouchableOpacity>

      {/* Image Upload Section */}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageBox}>
          {/* <Image style={styles.image} source={require('./path_to_image_placeholder.png')} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageBox}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageBox}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <Text style={styles.label}>Product Type</Text>
      <Picker
        selectedValue={selectedProductType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedProductType(itemValue)}
      >
        <Picker.Item label="Select Product Type" value="" />
        <Picker.Item label="Simple Product" value="Simple Product" />
        <Picker.Item label="Variable Product" value="Variable Product" />
      </Picker>

      {/* Catalogue, Virtual, and Downloadable Toggles */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Catalogue</Text>
        <Switch
          value={isCatalogue}
          onValueChange={(value) => setIsCatalogue(value)}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Virtual</Text>
        <Switch
          value={isVirtual}
          onValueChange={(value) => setIsVirtual(value)}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Downloadable</Text>
        <Switch
          value={isDownloadable}
          onValueChange={(value) => setIsDownloadable(value)}
        />
      </View>

      <TextInput placeholder="Product Name" style={styles.input} />
      <TextInput placeholder="Sale Price" style={styles.input} />
      <TextInput placeholder="Regular Price" style={styles.input} />
      <TextInput placeholder="Short Description" style={styles.textArea} multiline />
      <TextInput placeholder="Description" style={styles.textArea} multiline />

      {/* Category and Tags */}
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
      </Picker>

      <TextInput placeholder="Tags" style={styles.input} />

      {/* Category Visibility Toggle */}
      <Text style={styles.label1}>Category Visibility</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Shop & Search Results</Text>
        <Switch
          value={categoryVisibility.shopSearch}
          onValueChange={() => toggleVisibility('shopSearch')}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Shop Only</Text>
        <Switch
          value={categoryVisibility.shopOnly}
          onValueChange={() => toggleVisibility('shopOnly')}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Search Result Only</Text>
        <Switch
          value={categoryVisibility.searchResultOnly}
          onValueChange={() => toggleVisibility('searchResultOnly')}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Hidden</Text>
        <Switch
          value={categoryVisibility.hidden}
          onValueChange={() => toggleVisibility('hidden')}
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(5),                    // Responsive padding
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: hp(2.5),            // Responsive margin
  },
  backText: {
    fontSize: FontSize(18),            // Responsive font size
    color: '#000',
    fontWeight: '400',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2.5),            // Responsive margin
  },
  imageBox: {
    width: wp(20),                     // Responsive width
    height: wp(20),                    // Responsive height
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addText: {
    fontSize: FontSize(24),            // Responsive font size
    color: '#000',
  },
  label: {
    fontSize: FontSize(16),            // Responsive font size
    marginBottom: hp(1),               // Responsive margin
  },
  label1: {
    fontSize: FontSize(18),            // Responsive font size
    marginBottom: hp(1),               // Responsive margin
    color: '#373737',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: wp(2.5),                  // Responsive padding
    marginBottom: hp(1.5),              // Responsive margin
    borderRadius: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: wp(2.5),                  // Responsive padding
    marginBottom: hp(1.5),              // Responsive margin
    borderRadius: 8,
    height: hp(12),                     // Responsive height
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: hp(1.5),              // Responsive margin
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2.5),            // Responsive margin
  },
  nextButton: {
    backgroundColor: 'green',
    paddingVertical: hp(2),            // Responsive padding
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: wp(60),                // Responsive margin left
  },
  nextButtonText: {
    color: '#fff',
    fontSize: FontSize(16),            // Responsive font size
  },
});


export default ProductDetails;
