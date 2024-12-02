import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';

const VendorBusinessPicker = ({
  selectedVendorType,
  selectedBusinessProof,
  onVendorTypeChange,
  onBusinessProofChange,
  businessProofNumber,
  onBusinessProofNumberChange,
  onUploadDocument,
}) => {
  const [proofDocument, setProofDocument] = useState(null); // State for storing the uploaded document URL

  const vendorTypeOptions = [
    'Seller',
    'Reseller',
    'Manufacturer',
    'Distributor',
    'Wholeseller',
  ];

  const businessProofOptions = ['Udhyam Aadhar', 'Shop License', 'GST', 'CIN'];

  const handlePickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allows selection of various file types
      });

      const formData = new FormData();
      formData.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      formData.append('upload_preset', 'cleanTechMart'); // Replace with your Cloudinary preset

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/datf6laqn/image/upload', // Cloudinary image upload URL
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const uploadedUrl = response.data.secure_url;
      setProofDocument(uploadedUrl);
      onUploadDocument(uploadedUrl);
      Alert.alert('Document uploaded successfully!');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'No document was selected.');
      } else {
        Alert.alert('Failed to upload document. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Vendor Type Picker */}
      <Text style={styles.label}>Vendor Type *</Text>
      <Picker
        selectedValue={selectedVendorType}
        onValueChange={onVendorTypeChange}
        style={styles.picker}
      >
        <Picker.Item label="Select Vendor Type" value="" />
        {vendorTypeOptions.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      {/* Business Proof Picker */}
      <Text style={styles.label}>Business Proof *</Text>
      <Picker
        selectedValue={selectedBusinessProof}
        onValueChange={onBusinessProofChange}
        style={styles.picker}
      >
        <Picker.Item label="Select Business Proof" value="" />
        {businessProofOptions.map(proof => (
          <Picker.Item key={proof} label={proof} value={proof} />
        ))}
      </Picker>

      {/* Business Proof Number Input */}
      {selectedBusinessProof ? (
        <TextInput
          style={styles.input}
          placeholder={`${selectedBusinessProof} Number`}
          value={businessProofNumber}
          onChangeText={onBusinessProofNumberChange}
        />
      ) : null}

      {/* Upload Document Button */}
      {selectedBusinessProof ? (
        <View>
          <Text style={styles.label}>Upload {selectedBusinessProof} Document *</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePickDocument}
          >
            <Text style={styles.uploadButtonText}>
              {proofDocument ? 'Change Document' : `Upload ${selectedBusinessProof} Document`}
            </Text>
          </TouchableOpacity>
          {proofDocument && <Image source={{ uri: proofDocument }} style={styles.image} />}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2),
  },
  label: {
    fontSize: FontSize(16),
    fontWeight: '600',
    color: '#444',
    marginBottom: hp(1),
  },
  picker: {
    height: hp(6),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    backgroundColor: '#fff',
  },
  input: {
    height: hp(6),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    backgroundColor: '#fff',
    fontSize: FontSize(15),
  },
  uploadButton: {
    height: hp(6),
    backgroundColor: '#E6F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: hp(2),
  },
  uploadButtonText: {
    color: '#007BFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default VendorBusinessPicker;
