import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages,
} from 'react-country-state-city';
import CustomPicker from './CoustomPicker';
import CustomDropdown from './CoustomDropdown';
import {wp, hp, FontSize} from '../../utils/responsiveUtils';
import {useNavigation} from '@react-navigation/native';

const EditScreen = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState(null);
  const [aadhaarBackImage, setAadhaarBackImage] = useState(null);
  const [businessProof, setBusinessProof] = useState('');
  const [businessProofNumber, setBusinessProofNumber] = useState('');
  const [udyamAadhaar, setUdyamAadhaar] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [checked, setChecked] = useState(false);

  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const businessProofOptions = [
    {id: 'Udhyam Aadhar', name: 'Udhyam Aadhar'},
    {id: 'Shop License', name: 'Shop License'},
    {id: 'GST', name: 'GST'},
    {id: 'CIN', name: 'CIN'},
  ];

  useEffect(() => {
    GetCountries().then(result => setCountryList(result));
  }, []);

  useEffect(() => {
    if (countryId) {
      GetState(countryId).then(result => setStateList(result));
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      GetCity(countryId, stateId).then(result => setCityList(result));
    }
  }, [stateId]);

  const getNameById = (id, list) => {
    const item = list.find(item => item.id === id);
    return item ? item.name : '';
  };
  const handleEditPress = () => {
    navigation.navigate('EditScreen'); // Replace 'EditScreen' with the name of your target screen
  };

  // Function to pick Aadhaar image
  const pickAadhaarImage = async setImage => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setImage(res[0].uri); // Save the selected image URI to the respective state
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        Alert.alert('Cancelled', 'No image was selected');
      } else {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };
  const renderBusinessProofInput = () => {
    switch (businessProof) {
      case 'Udhyam Aadhar':
        return (
          <TextInput
            style={styles.input}
            placeholder="Udhyam Aadhar Number"
            value={udyamAadhaar}
            onChangeText={setUdyamAadhaar}
          />
        );
      case 'Shop License':
        return (
          <TextInput
            style={styles.input}
            placeholder="Shop License Number"
            value={businessProofNumber}
            onChangeText={setBusinessProofNumber}
          />
        );
      case 'GST':
        return (
          <TextInput
            style={styles.input}
            placeholder="GST Number"
            value={businessProofNumber}
            onChangeText={setBusinessProofNumber}
          />
        );
      case 'CIN':
        return (
          <TextInput
            style={styles.input}
            placeholder="CIN Number"
            value={businessProofNumber}
            onChangeText={setBusinessProofNumber}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* User Information Fields */}
      <Text style={styles.label}>Username *</Text>
      <TextInput style={styles.input} placeholder="User Name" />

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>First Name *</Text>
      <TextInput style={styles.input} placeholder="First Name" />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} placeholder="Last Name" />

      <Text style={styles.label}>Store Name *</Text>
      <TextInput style={styles.input} placeholder="Store Name" />

      <Text style={styles.label}>Store URL</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        placeholder="https:/"
        editable={true}
      />

      <Text style={styles.label}>Address 1 *</Text>
      <TextInput style={styles.input} placeholder="Address 1" />

      <Text style={styles.label}>Address 2</Text>
      <TextInput style={styles.input} placeholder="Address 2" />

      <Text style={styles.label}>Postcode/Zip *</Text>
      <TextInput
        style={styles.input}
        placeholder="Postcode/Zip"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Store Phone *</Text>
      <TextInput
        style={styles.input}
        placeholder="Store Phone"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Alternate phone no</Text>
      <TextInput
        style={styles.input}
        placeholder="Alternate phone no"
        keyboardType="phone-pad"
      />

      {/* Country, State, and City Selection */}
      <Text style={styles.label}>Country</Text>
      <CustomPicker
        options={countryList}
        selectedValue={getNameById(countryId, countryList)}
        onValueChange={value => {
          setCountryId(value);
          setStateId(''); // Reset state and city on country change
          setCityId('');
        }}
      />

      <Text style={styles.label}>State</Text>
      <CustomPicker
        options={stateList}
        selectedValue={getNameById(stateId, stateList)}
        onValueChange={value => {
          setStateId(value);
          setCityId(''); // Reset city on state change
        }}
      />

      <Text style={styles.label}>City</Text>
      <CustomPicker
        options={cityList}
        selectedValue={getNameById(cityId, cityList)}
        onValueChange={value => setCityId(value)}
      />

      {/* Aadhaar and Business Details */}
      <Text style={styles.label}>Aadhaar Card no</Text>
      <TextInput
        style={styles.input}
        placeholder="Aadhaar Card Number"
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
      />

      <Text style={styles.label}>Aadhaar Image (Front)</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => pickAadhaarImage(setAadhaarFrontImage)}>
        <Text style={styles.uploadButtonText}>
          {aadhaarFrontImage
            ? 'Change Aadhaar Card Front Image'
            : 'Upload Aadhaar Card Front Image'}
        </Text>
      </TouchableOpacity>
      {aadhaarFrontImage && (
        <Image source={{uri: aadhaarFrontImage}} style={styles.image} />
      )}

      <Text style={styles.label}>Aadhaar Image (Back)</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => pickAadhaarImage(setAadhaarBackImage)}>
        <Text style={styles.uploadButtonText}>
          {aadhaarBackImage
            ? 'Change Aadhaar Card Back Image'
            : 'Upload Aadhaar Card Back Image'}
        </Text>
      </TouchableOpacity>
      {aadhaarBackImage && (
        <Image source={{uri: aadhaarBackImage}} style={styles.image} />
      )}

      {/* Business Proof Section */}
      <Text style={styles.label}>Business Proof</Text>
      <CustomDropdown
        options={businessProofOptions}
        selectedValue={businessProof}
        onValueChange={value => setBusinessProof(value)}
      />
      {renderBusinessProofInput()}

      <TextInput
        style={styles.input}
        placeholder="Referral Code"
        value={referralCode}
        onChangeText={setReferralCode}
      />

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(3), // 20 in your original, using wp for scaling
    paddingVertical: hp(4), // 30 in your original, using hp for scaling
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    padding: hp(2),
    alignItems: 'left',
    marginBottom: hp(3),
  },
  headerText: {
    color: '#373737',
    fontSize: FontSize(22),
    fontWeight: 'bold',
  },
  label: {
    fontSize: FontSize(17),
    color: '#333333',
    marginBottom: hp(0.5), // 5 in original
  },
  input: {
    height: hp(5), // 40 in original
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: wp(1.5), // 5 in original
    paddingHorizontal: wp(2.5), // 10 in original
    marginBottom: hp(2), // 15 in original
    backgroundColor: '#FFFFFF',
    fontSize: FontSize(17),
  },
  disabledInput: {
    color: '#6C757D',
    backgroundColor: '#fff',
  },
  picker: {
    height: hp(5), // 40 in original
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: wp(1.5), // 5 in original
    paddingHorizontal: wp(2.5), // 10 in original
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedCountry: {
    fontSize: FontSize(17),
    color: '#333333',
    marginBottom: hp(2), // 15 in original
  },
  uploadButton: {
    height: hp(5), // 40 in original
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: wp(1.5), // 5 in original
    justifyContent: 'center',
    paddingHorizontal: wp(2.5), // 10 in original
    marginBottom: hp(2), // 15 in original
    backgroundColor: '#FFFFFF',
  },
  uploadButtonText: {
    color: '#6B6B6B',
    fontSize: FontSize(17),
  },
  dropdown: {
    height: hp(5), // 40 in original
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: wp(1.5), // 5 in original
    justifyContent: 'center',
    paddingHorizontal: wp(2.5), // 10 in original
    marginBottom: hp(2), // 15 in original
    backgroundColor: '#FFFFFF',
    fontSize: FontSize(17),
  },
  dropdownText: {
    color: '#6B6B6B',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.5), // 20 in original
  },
  checkbox: {
    width: wp(5), // 20 in original
    height: hp(2.5), // 20 in original
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: wp(1), // 3 in original
  },
  checkedCheckbox: {
    backgroundColor: '#28A745',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueButton: {
    backgroundColor: '#28A745',
    padding: hp(2), // 10 in original
    borderRadius: wp(1.5), // 5 in original
    flex: 1,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize(17),
  },
  image: {
    width: wp(25), // 100 in original
    height: hp(12), // 100 in original
    marginBottom: hp(2), // 15 in original
    borderRadius: wp(1.5), // 5 in original
    borderColor: '#CED4DA',
    borderWidth: 1,
  },
  label: {
    fontSize: FontSize(16),
    fontWeight: 'bold',
    marginBottom: hp(1), // 8 in original
  },
  checkboxLabel: {
    fontSize: FontSize(17),
  },
});

export default EditScreen;
