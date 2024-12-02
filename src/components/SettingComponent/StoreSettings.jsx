import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // For dropdown
import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'; // Redux hooks
import {fetchVendor, updateVendor} from '../../redux/StoreSetting/Setting'; // Redux actions
import {wp, hp, FontSize} from '../../utils/responsiveUtils';
import CustomToast from '../../utils/CustomToast';

const StoreSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state
  const {vendorData, loading, errorMessage} = useSelector(
    state => state.vendor,
  );

  // Local state
  const [storeName, setStoreName] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeBannerType, setStoreBannerType] = useState('Static Image');
  const [storeListBannerType, setStoreListBannerType] =
    useState('Static Image');
  const [storeLogo, setStoreLogo] = useState(null); // Store selected image URI
  const [storeLogoFile, setStoreLogoFile] = useState(null); // File for upload
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  // Fetch vendor data on component mount
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  useEffect(() => {
    if (vendorData) {
        setStoreName(vendorData.storename || '');
        setStoreEmail(vendorData.email || '');
        setStorePhone(vendorData.phone || '');
        setStoreBannerType(vendorData.storeBannerType || 'Static Image');
        setStoreListBannerType(
          vendorData.storeListBannerType || 'Static Image',
        );
        setStoreLogo(vendorData.storeLogo || null);
      }
    }, [vendorData]);
     

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!storeName) newErrors.storeName = 'Store Name is required';
    if (!storePhone) newErrors.storePhone = 'Store Phone is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const showToast = message => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 9000);
  };

  // Save changes handler
  const handleUpdateAndNext = () =>{
    navigation.navigate('LocationScreen');

  };

  // Handle save button click
  const handleSave = async () => {
    if (validateForm()) {
      setIsSaving(true);
      const vendorDetails = {
        storeName,
        storePhone,
      };
      try {
        await dispatch(updateVendor({ vendorDetails })).unwrap();
        Alert.alert('Success', 'Store details updated successfully!');
      } catch (error) {
        console.error('Error updating vendor details:', error);
        Alert.alert('Error', 'Failed to update store details.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Image picker handler
  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setStoreLogo(result.uri);
      setStoreLogoFile(result);
      console.log('Selected Image: ', result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        Alert.alert('Error', 'An error occurred while selecting the document');
      }
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Card for Heading */}
        <View style={styles.card}>
          <Text style={styles.heading}>Store Settings</Text>
        </View>

        {/* Card for Form */}
        <View style={styles.card}>
          {/* General Settings */}
          <View style={styles.section}>
            <Text style={styles.subHeading}>General Setting</Text>

            <Text style={styles.label}>Store Name*</Text>
            <TextInput
              style={styles.input}
              value={storeName}
              onChangeText={setStoreName}
              placeholder="Enter store name"
            />
            {errors.storeName && (
              <Text style={styles.error}>{errors.storeName}</Text>
            )}

            <Text style={styles.label}>Store Email*</Text>
            <TextInput
              style={styles.input}
              value={storeEmail}
              onChangeText={setStoreEmail}
              placeholder="Enter store email"
              keyboardType="email-address"
              editable={false} // Email will not be updated
            />
            {errors.storeEmail && (
              <Text style={styles.error}>{errors.storeEmail}</Text>
            )}

            <Text style={styles.label}>Store Phone*</Text>
            <TextInput
              style={styles.input}
              value={storePhone}
              onChangeText={setStorePhone}
              placeholder="Enter store phone"
              keyboardType="phone-pad"
            />
            {errors.storePhone && (
              <Text style={styles.error}>{errors.storePhone}</Text>
            )}
          </View>

          {/* Store Brand Setup */}
          <View style={styles.section}>
            <Text style={styles.subHeading}>Store Brand Setup</Text>

            <Text style={styles.label}>Store Logo</Text>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={handlePickImage}>
              {storeLogo ? (
                <Image source={{uri: storeLogo}} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>Pick an Image</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Store Banner Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={storeBannerType}
                onValueChange={itemValue => setStoreBannerType(itemValue)}
                style={styles.picker}
                enabled={false} // Disable picker
              >
                <Picker.Item label="Static Image" value="Static Image" />
                <Picker.Item label="Dynamic Image" value="Dynamic Image" />
              </Picker>
            </View>
          </View>

          {/* Update and Next Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdateAndNext}>
            <Text style={styles.saveButtonText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, ]}
            onPress={handleSave}
            disabled={loading}>
            <Text style={styles.saveButtonText}>
              {loading ? 'Updating...' : 'Save'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton1}
            onPress={handleUpdateAndNext}>
            <Text style={styles.saveButtonText}>Update and Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2.5), // Responsive padding
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4), // Responsive padding
    marginBottom: hp(2), // Responsive marginBottom
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.25)}, // Responsive shadowOffset
    shadowOpacity: 0.1,
    shadowRadius: wp(2), // Responsive shadowRadius
    elevation: 5,
  },
  heading: {
    fontSize: FontSize(20), // Responsive font size
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#373737',
  },
  section: {
    marginBottom: hp(3), // Responsive marginBottom
  },
  subHeading: {
    fontSize: FontSize(16), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp(1), // Responsive marginBottom
    color: '#373737',
  },
  label: {
    fontSize: FontSize(14), // Responsive font size
    marginBottom: hp(0.5), // Responsive marginBottom
    color: '#373737',
  },
  input: {
    borderWidth: wp(0.25), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    padding: wp(2), // Responsive padding
    marginBottom: hp(1), // Responsive marginBottom
  },
  pickerContainer: {
    borderWidth: wp(0.25), // Responsive borderWidth
    borderColor: '#ddd',
    borderRadius: wp(2), // Responsive borderRadius
    marginBottom: hp(2), // Responsive marginBottom
  },
  picker: {
    height: hp(6), // Responsive height
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imagePicker: {
    width: wp(25), // Responsive width
    height: wp(25), // Responsive height
    borderRadius: wp(2), // Responsive borderRadius
    borderWidth: wp(0.25), // Responsive borderWidth
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive marginBottom
  },
  image: {
    width: wp(25), // Responsive width
    height: wp(25), // Responsive height
    borderRadius: wp(2), // Responsive borderRadius
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5), // Responsive padding
    borderRadius: wp(2), // Responsive borderRadius
    height: hp(6.5), // Responsive height
    width: wp(25), // Responsive width
    marginLeft: wp(60), // Responsive marginLeft
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton1: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
    padding: hp(1.5),
    borderRadius: wp(2), // Responsive borderRadius
    height: hp(7.9), // Responsive height
    width: wp(30), // Responsive width
    marginLeft: wp(60), // Responsive marginLeft
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: FontSize(16), // Responsive font size
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: hp(1), // Responsive marginBottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 80,
    color: '#373737',
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5),
    borderRadius: wp(2),
    flex: 1,
    marginHorizontal: wp(1.5),
    alignItems: 'center',
  },
});

export default StoreSettings;
