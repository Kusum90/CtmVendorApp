import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Switch } from 'react-native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import { setProductDetails } from '../../../redux/Product/ProductSlice';
import CategorySearch from '../../../components/ProductComponent/ProductInnerComponent/ProductAttributes/CategorySearch';

const ProductDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [isCatalogue, setIsCatalogue] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState('shop'); 
  const [imageBoxes, setImageBoxes] = useState([null]);
  const [title, setTitle] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [price, setPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleNext = () => {
    dispatch(
      setProductDetails({
        productType: selectedProductType,
        category: selectedCategory ? selectedCategory.id : '',
        isCatalogue,
        isVirtual,
        isDownloadable,
        categoryVisibility: selectedVisibility, 
        images: imageBoxes.filter((img) => img !== null), 
        title,
        salePrice: parseFloat(salePrice), 
        price: parseFloat(price), 
        shortDescription,
        description,
        tags: tags.split(',').map((tag) => tag.trim()), 
      })
    );
    navigation.navigate('ProductInventoryScreen');
  };

  const handleUpload = async (index) => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'documentDirectory',
      });

      if (res.size / (1024 * 1024) > 100) {
        alert('Image size should be below 100MB');
        return;
      }

      const updatedBoxes = [...imageBoxes];
      updatedBoxes[index] = res.uri;
      setImageBoxes(updatedBoxes);

      if (imageBoxes.length < 5 && !imageBoxes[index + 1]) {
        setImageBoxes((prev) => [...prev, null]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Cancelled');
      } else {
        throw err;
      }
    }
  };

  const handleRemoveImage = (index) => {
    const updatedBoxes = [...imageBoxes];
    updatedBoxes.splice(index, 1);

    if (updatedBoxes.length === 0) {
      updatedBoxes.push(null);
    }

    setImageBoxes(updatedBoxes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Product Images</Text>
        <View style={styles.imageContainer}>
          {imageBoxes.map((image, index) => (
            <View key={index} style={styles.imageBox}>
              {image ? (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => handleUpload(index)} style={styles.uploadButton}>
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Product Type</Text>
        <Picker
          selectedValue={selectedProductType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedProductType(itemValue)}
        >
          <Picker.Item label="Select Product Type" value="" />
          <Picker.Item label="simple" value="simple" />
          <Picker.Item label="variable" value="variable" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Product Settings</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Catalogue</Text>
          <Switch value={isCatalogue} onValueChange={(value) => setIsCatalogue(value)} />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Downloadable</Text>
          <Switch value={isDownloadable} onValueChange={(value) => setIsDownloadable(value)} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Product Information</Text>
        <TextInput
          placeholder="Product Name"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Sale Price"
          style={styles.input}
          value={salePrice}
          onChangeText={setSalePrice}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Regular Price"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Short Description"
          style={styles.textArea}
          value={shortDescription}
          onChangeText={setShortDescription}
          multiline
        />
        <TextInput
          placeholder="Description"
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Category</Text>
        <CategorySearch
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Tags</Text>
        <TextInput
          placeholder="Tags (comma separated)"
          style={styles.input}
          value={tags}
          onChangeText={setTags}
        />
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.heading}>Catalog Visibility</Text>
        <Picker
          selectedValue={selectedVisibility}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedVisibility(itemValue)}
        >
          <Picker.Item label="shop" value="shop" />
          <Picker.Item label="search" value="search" />
          <Picker.Item label="hidden" value="hidden" />
        </Picker>
      </View> */}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: hp(2),
    padding: wp(3),
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  heading: {
    fontSize: FontSize(18),
    color: '#333',
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(5),
  },
  imageBox: {
    width: wp(25),
    height: wp(25),
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 8,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  uploadText: {
    fontSize: FontSize(16),
    color: '#000',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: hp(1.5),
    padding: wp(2),
    backgroundColor: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  label: {
    fontSize: FontSize(16),
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: wp(2.5),
    marginBottom: hp(1.5),
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: wp(2.5),
    marginBottom: hp(1.5),
    borderRadius: 8,
    height: hp(10),
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: 'green',
    paddingVertical: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: FontSize(16),
  },
});

export default ProductDetails;
