import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const AadhaarUpload = ({
  aadhaarNumber,
  frontImage,
  backImage,
  onUploadFront,
  onUploadBack,
  onAadhaarChange,
}) => {
  const handlePickImage = async (setter) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const formData = new FormData();
      formData.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      formData.append('upload_preset', 'cleanTechMart');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/datf6laqn/image/upload',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        }
      );

      const uploadedUrl = response.data.secure_url;
      setter(uploadedUrl);
      Alert.alert('Image uploaded successfully!');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'No image was selected.');
      } else {
        Alert.alert('Failed to upload image. Please try again.');
      }
    }
  };

  return (
    <View>
      {/* Aadhaar Card Number */}
      <Text style={styles.label}>Aadhaar Card No.</Text>
      <TextInput
        style={styles.input}
        placeholder="1234-5678-9012"
        keyboardType="numeric"
        value={aadhaarNumber}
        maxLength={14} // 12 digits + 2 hyphens
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, '');

          const formattedText =
            numericText
              .match(/.{1,4}/g) // Match groups of up to 4 digits
              ?.join('-') // Join the groups with a hyphen
              .slice(0, 14) || ''; // Limit to 14 characters (12 digits + 2 hyphens)

          onAadhaarChange(formattedText); // Update the Aadhaar number
        }}
      />

      {/* Aadhaar Front Image */}
      <Text style={styles.label}>Aadhaar Image (Front)</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handlePickImage(onUploadFront)}>
        <Text style={styles.uploadButtonText}>
          {frontImage ? 'Change Aadhaar Front Image' : 'Upload Aadhaar Front Image'}
        </Text>
      </TouchableOpacity>
      {frontImage && <Image source={{uri: frontImage}} style={styles.image} />}

      {/* Aadhaar Back Image */}
      <Text style={styles.label}>Aadhaar Image (Back)</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handlePickImage(onUploadBack)}>
        <Text style={styles.uploadButtonText}>
          {backImage ? 'Change Aadhaar Back Image' : 'Upload Aadhaar Back Image'}
        </Text>
      </TouchableOpacity>
      {backImage && <Image source={{uri: backImage}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {fontSize: 16, fontWeight: '600', marginBottom: 5},
  input: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  uploadButton: {
    height: 40,
    backgroundColor: '#E6F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {color: '#007BFF'},
  image: {width: '100%', height: 200, borderRadius: 5, marginBottom: 10},
});

export default AadhaarUpload;
