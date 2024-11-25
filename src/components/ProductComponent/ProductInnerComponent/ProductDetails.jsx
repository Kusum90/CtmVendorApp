import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {wp, hp, FontSize} from '../../../utils/responsiveUtils';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {
  setProductDetails,
  fetchProductDetails,
  updateProduct,
  createProduct,
} from '../../../redux/Product/ProductSlice';
import CategorySearch from '../../../components/ProductComponent/ProductInnerComponent/ProductAttributes/CategorySearch';

const ProductDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {productId} = route.params || {}; // Get productId from route if available
  const {productDetails, loading} = useSelector(state => state.products); // Get loading state and product details

  // Local state for form inputs
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
  const [uploading, setUploading] = useState(false);

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      console.log('Fetching product details for editing:', productId);
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  // Populate fields if editing an existing product
  useEffect(() => {
    if (productId && productDetails && productDetails._id === productId) {
      setTitle(productDetails.title || '');
      setSalePrice(
        productDetails.salePrice ? productDetails.salePrice.toString() : '',
      );
      setPrice(productDetails.price ? productDetails.price.toString() : '');
      setShortDescription(productDetails.shortDescription || '');
      setDescription(productDetails.description || '');
      setSelectedProductType(productDetails.productType || 'simple');
      setSelectedVisibility(productDetails.catalogVisibility || 'shop');
      setTags(productDetails.tags ? productDetails.tags.join(', ') : '');
      setIsCatalogue(productDetails.isCatalogue || false);
      setIsVirtual(productDetails.isVirtual || false);
      setIsDownloadable(productDetails.isDownloadable || false);

      // Set category and images if available
      if (productDetails.categories && productDetails.categories.length > 0) {
        setSelectedCategory({
          _id: productDetails.categories[0].id,
          name: productDetails.categories[0].name,
        });
      }
      if (productDetails.image && productDetails.image.length > 0) {
        setImageBoxes(productDetails.image);
      }
    }
  }, [productDetails, productId]);

  // Handler to update Redux state with edited fields
  const updateField = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    dispatch(setProductDetails({[field]: value}));
  };

  const prepareData = () => {
    const formattedImages = imageBoxes.filter(img => img !== null);

    return {
      _id: productId,
      productType: selectedProductType || 'simple',
      categories: selectedCategory?._id ? [selectedCategory._id] : [],
      catalogVisibility: selectedVisibility || 'shop',
      image: formattedImages,
      title: title || 'Untitled Product',
      salePrice: salePrice ? parseFloat(salePrice) : 0,
      price: price ? parseFloat(price) : 0,
      shortDescription: shortDescription || '',
      description: description || '',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isVirtual,
      isDownloadable,
      isCatalogue,
    };
  };

  const handleNext = async () => {
    if (!selectedCategory || !selectedCategory._id) {
      Alert.alert('Please select a valid category');
      return;
    }

    if (imageBoxes.filter(img => img !== null).length === 0) {
      Alert.alert('Please upload at least one image.');
      return;
    }

    const preparedData = prepareData();
    console.log('Data being sent to backend:', preparedData);

    if (productId) {
      try {
        await dispatch(updateProduct(preparedData)).unwrap();
        console.log('Product successfully updated in backend.');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      dispatch(setProductDetails(preparedData));
    }

    navigation.navigate('ProductInventoryScreen', {productId});
  };

  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'documentDirectory',
      });

      const formData = new FormData();
      formData.append('file', {
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
      formData.append('upload_preset', 'cleanTechMart');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/datf6laqn/image/upload',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      // Add the uploaded image URL as an object to the state
      const uploadedUrl = response.data.secure_url;
      console.log('Uploaded Image URL:', uploadedUrl);

      setImageBoxes(prev => [...prev, uploadedUrl]);

      Alert.alert('Image uploaded successfully!');
    } catch (err) {
      console.log('Error uploading image:', err);
      Alert.alert('Failed to upload image. Please try again.');
    }
  };

  const handleRemoveImage = index => {
    const updatedBoxes = [...imageBoxes];
    updatedBoxes.splice(index, 1);

    if (updatedBoxes.length === 0) {
      updatedBoxes.push(null);
    }

    setImageBoxes(updatedBoxes);
    updateField(
      'images',
      updatedBoxes.filter(img => img !== null),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {productId ? 'Edit Product' : 'Create Product'}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Product Images Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>Product Images</Text>
            <View style={styles.imageContainer}>
              {imageBoxes.map((image, index) => (
                <View key={index} style={styles.imageBox}>
                  {image ? (
                    <View style={styles.imageWrapper}>
                      <Image source={{uri: image}} style={styles.image} />
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(index)}
                        style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>X</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleUpload(index)}
                      style={styles.uploadButton}>
                      <Text style={styles.uploadText}>Upload</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Product Type Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>Product Type</Text>
            <Picker
              selectedValue={selectedProductType}
              style={styles.picker}
              onValueChange={value => {
                setSelectedProductType(value);
                updateField('productType', value);
              }}>
              <Picker.Item label="Select Product Type" value="" />
              <Picker.Item label="simple" value="simple" />
              <Picker.Item label="variable" value="variable" />
            </Picker>
          </View>

          {/* Product Settings */}
          <View style={styles.section}>
            <Text style={styles.heading}>Product Settings</Text>
            <View style={styles.toggleContainer}>
              <Text style={styles.label}>Catalogue</Text>
              <Switch
                value={isCatalogue}
                onValueChange={value => {
                  setIsCatalogue(value);
                  updateField('isCatalogue', value);
                }}
              />
            </View>
            <View style={styles.toggleContainer}>
              <Text style={styles.label}>Downloadable</Text>
              <Switch
                value={isDownloadable}
                onValueChange={value => {
                  setIsDownloadable(value);
                  updateField('isDownloadable', value);
                }}
              />
            </View>
          </View>

          {/* Product Information Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>Product Information</Text>
            <TextInput
              placeholder="Product Name"
              style={styles.input}
              value={title}
              onChangeText={text => {
                setTitle(text);
                updateField('title', text);
              }}
            />
            <TextInput
              placeholder="Sale Price"
              style={styles.input}
              value={salePrice}
              onChangeText={text => {
                setSalePrice(text);
                updateField('salePrice', text);
              }}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Regular Price"
              style={styles.input}
              value={price}
              onChangeText={text => {
                setPrice(text);
                updateField('price', text);
              }}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Short Description"
              style={styles.textArea}
              value={shortDescription}
              onChangeText={text => {
                setShortDescription(text);
                updateField('shortDescription', text);
              }}
              multiline
            />
            <TextInput
              placeholder="Description"
              style={styles.textArea}
              value={description}
              onChangeText={text => {
                setDescription(text);
                updateField('description', text);
              }}
              multiline
            />
          </View>

          {/* Category Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>Category</Text>
            <CategorySearch
              selectedCategory={selectedCategory}
              setSelectedCategory={(category) => {
                setSelectedCategory(category); // Update the selected category
              }}
            />
            <Text style={styles.categoryDisplay}>
              {selectedCategory?.name || 'No category selected'}
            </Text>
          </View>

          {/* Tags Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>Tags</Text>
            <TextInput
              placeholder="Tags (comma separated)"
              style={styles.input}
              value={tags}
              onChangeText={text => {
                setTags(text);
                updateField(
                  'tags',
                  text.split(',').map(tag => tag.trim()),
                );
              }}
            />
          </View>

          {/* Catalog Visibility Section */}
          <View style={styles.section}>
            <Text style={styles.heading}>Catalog Visibility</Text>
            <Picker
              selectedValue={selectedVisibility}
              style={styles.picker}
              onValueChange={value => {
                setSelectedVisibility(value);
                updateField('catalogVisibility', value);
              }}>
              <Picker.Item label="shop" value="shop" />
              <Picker.Item label="search" value="search" />
              <Picker.Item label="hidden" value="hidden" />
            </Picker>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {productId ? 'Update Product' : 'Next'}
            </Text>
          </TouchableOpacity>
        </>
      )}
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



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
// import {
//   setProductDetails,
//   fetchProductDetails,
//   updateProduct,
// } from '../../../redux/Product/ProductSlice';
// import CategorySearch from '../../../components/ProductComponent/ProductInnerComponent/ProductAttributes/CategorySearch';

// const ProductDetails = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const { productId } = route.params || {};
//   const { productDetails, loading } = useSelector((state) => state.products);

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [title, setTitle] = useState('');
//   const [price, setPrice] = useState('');
//   const [salePrice, setSalePrice] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');

//   useEffect(() => {
//     if (productId) {
//       dispatch(fetchProductDetails(productId));
//     }
//   }, [dispatch, productId]);

//   useEffect(() => {
//     if (productId && productDetails && productDetails._id === productId) {
//       setTitle(productDetails.title || '');
//       setPrice(productDetails.price ? productDetails.price.toString() : '');
//       setSalePrice(
//         productDetails.salePrice ? productDetails.salePrice.toString() : '',
//       );
//       setShortDescription(productDetails.shortDescription || '');
//       setDescription(productDetails.description || '');
//       setTags(productDetails.tags ? productDetails.tags.join(', ') : '');

//       if (productDetails.categories && productDetails.categories.length > 0) {
//         setSelectedCategory({
//           _id: productDetails.categories[0].id,
//           name: productDetails.categories[0].name,
//         });
//       }
//     }
//   }, [productDetails, productId]);

//   const prepareData = () => ({
//     _id: productId,
//     categories: selectedCategory?._id ? [selectedCategory._id] : [],
//     title: title || 'Untitled Product',
//     price: price ? parseFloat(price) : 0,
//     salePrice: salePrice ? parseFloat(salePrice) : 0,
//     shortDescription,
//     description,
//     tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
//   });

//   const handleNext = async () => {
//     if (!selectedCategory || !selectedCategory._id) {
//       Alert.alert('Please select a valid category');
//       return;
//     }

//     const preparedData = prepareData();
//     try {
//       if (productId) {
//         await dispatch(updateProduct(preparedData)).unwrap();
//         Alert.alert('Product updated successfully!');
//       } else {
//         dispatch(setProductDetails(preparedData));
//       }
//       navigation.navigate('ProductInventoryScreen', { productId });
//     } catch (error) {
//       Alert.alert('Error saving product. Please try again.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>
//         {productId ? 'Edit Product' : 'Create Product'}
//       </Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           {/* Category Section */}
//           <View style={styles.section}>
//             <Text style={styles.heading}>Category</Text>
//             <CategorySearch
//               selectedCategory={selectedCategory}
//               setSelectedCategory={(category) => {
//                 setSelectedCategory(category); // Update the selected category
//               }}
//             />
//             <Text style={styles.categoryDisplay}>
//               {selectedCategory?.name || 'No category selected'}
//             </Text>
//           </View>

//           {/* Product Details */}
//           <View style={styles.section}>
//             <Text style={styles.heading}>Product Information</Text>
//             <TextInput
//               placeholder="Product Name"
//               style={styles.input}
//               value={title}
//               onChangeText={(text) => setTitle(text)}
//             />
//             <TextInput
//               placeholder="Regular Price"
//               style={styles.input}
//               value={price}
//               onChangeText={(text) => setPrice(text)}
//               keyboardType="numeric"
//             />
//             <TextInput
//               placeholder="Sale Price"
//               style={styles.input}
//               value={salePrice}
//               onChangeText={(text) => setSalePrice(text)}
//               keyboardType="numeric"
//             />
//             <TextInput
//               placeholder="Short Description"
//               style={styles.textArea}
//               value={shortDescription}
//               onChangeText={(text) => setShortDescription(text)}
//               multiline
//             />
//             <TextInput
//               placeholder="Description"
//               style={styles.textArea}
//               value={description}
//               onChangeText={(text) => setDescription(text)}
//               multiline
//             />
//             <TextInput
//               placeholder="Tags (comma separated)"
//               style={styles.input}
//               value={tags}
//               onChangeText={(text) => setTags(text)}
//             />
//           </View>

//           {/* Next Button */}
//           <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//             <Text style={styles.nextButtonText}>
//               {productId ? 'Update Product' : 'Next'}
//             </Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: wp(5),
//     backgroundColor: '#fff',
//   },
//   section: {
//     marginBottom: hp(2),
//     padding: wp(3),
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   heading: {
//     fontSize: FontSize(18),
//     color: '#333',
//     fontWeight: 'bold',
//     marginBottom: hp(1),
//   },
//   categoryDisplay: {
//     fontSize: FontSize(16),
//     color: '#555',
//     marginTop: hp(1),
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: wp(2.5),
//     marginBottom: hp(1.5),
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   textArea: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: wp(2.5),
//     marginBottom: hp(1.5),
//     borderRadius: 8,
//     height: hp(10),
//     backgroundColor: '#fff',
//   },
//   nextButton: {
//     backgroundColor: 'green',
//     paddingVertical: hp(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   nextButtonText: {
//     color: '#fff',
//     fontSize: FontSize(16),
//   },
// });

// export default ProductDetails;
