import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, updateVendor, clearVendorMessages } from '../../redux/StoreSetting/Setting'
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

const SocialScreen = () => {
  const dispatch = useDispatch();
  const { loading, vendorData, successMessage, errorMessage } = useSelector((state) => state.vendor);

  const [formData, setFormData] = useState({
    twitterHandler: '',
    facebookHandler: '',
    instagramUsername: '',
    youtubeChannelName: '',
    linkedinUsername: '',
    googlePlusProfileId: '',
    snapchatId: '',
    pinterestUsername: '',
  });

  // Fetch vendor data on component mount
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  // Update local state when vendor data is fetched
  useEffect(() => {
    if (vendorData) {
      setFormData({
        twitterHandler: vendorData.twitterHandler || '',
        facebookHandler: vendorData.facebookHandler || '',
        instagramUsername: vendorData.instagramUsername || '',
        youtubeChannelName: vendorData.youtubeChannelName || '',
        linkedinUsername: vendorData.linkedinUsername || '',
        googlePlusProfileId: vendorData.googlePlusProfileId || '',
        snapchatId: vendorData.snapchatId || '',
        pinterestUsername: vendorData.pinterestUsername || '',
      });
    }
  }, [vendorData]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle save button click
  const handleSave = () => {
    dispatch(updateVendor({ vendorDetails: formData }));
  };

  // Clear messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearVendorMessages());
    };
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Loading Spinner */}
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {/* Error Message */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Success Message */}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

      {/* Card for Heading */}
      <View style={styles.card}>
        <Text style={styles.heading}>Social</Text>
      </View>

      {/* Card for Form */}
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          {Object.entries(formData).map(([key, value]) => (
            <View key={key}>
              <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1')}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                value={value}
                onChangeText={(text) => handleInputChange(key, text)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp(4),
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4),
    borderRadius: wp(2.5),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.25,
    shadowRadius: wp(1),
    marginBottom: hp(2.5),
  },
  heading: {
    fontSize: FontSize(18),
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: FontSize(14),
    color: '#000',
    marginBottom: hp(0.6),
  },
  input: {
    borderWidth: wp(0.3),
    borderColor: '#ddd',
    borderRadius: wp(2),
    padding: wp(2.5),
    marginBottom: hp(2),
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSize(16),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: hp(1),
  },
});

export default SocialScreen;
