import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {
  GetCountries,
  GetState,
  GetCity,
} from 'react-country-state-city';
import CustomPicker from '../components/AccountComponent/CoustomPicker';
import CustomDropdown from '../components/AccountComponent/CoustomDropdown';
import { wp, hp, FontSize } from '../utils/responsiveUtils';
import { useNavigation } from '@react-navigation/native';

const RegisterDetails = () => {
  const navigation = useNavigation();

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState(null);
  const [aadhaarBackImage, setAadhaarBackImage] = useState(null);
  const [businessProof, setBusinessProof] = useState('');
  const [businessProofNumber, setBusinessProofNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const businessProofOptions = [
    { id: 'Udhyam Aadhar', name: 'Udhyam Aadhar' },
    { id: 'Shop License', name: 'Shop License' },
    { id: 'GST', name: 'GST' },
    { id: 'CIN', name: 'CIN' },
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

  const pickAadhaarImage = async setImage => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setImage(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'No image was selected');
      } else {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

//   const renderBusinessProofInput = () => {
//     const placeholderText = `${businessProof} Number`;
//     return (
//       <TextInput
//         style={styles.input}
//         placeholder={placeholderText}
//         value={businessProofNumber}
//         onChangeText={setBusinessProofNumber}
//       />
//     );
//   };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile Registration</Text>
      </View>

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
      <TextInput style={styles.input} placeholder="https:/" editable={true} />

      <Text style={styles.label}>Address 1 *</Text>
      <TextInput style={styles.input} placeholder="Address 1" />
 
      <Text style={styles.label}>Address 2</Text>
      <TextInput style={styles.input} placeholder="Address 2" />

      <Text style={styles.label}>Postcode/Zip *</Text>
      <TextInput style={styles.input} placeholder="Postcode/Zip" keyboardType="numeric" />

      <Text style={styles.label}>Store Phone *</Text>
      <TextInput style={styles.input} placeholder="Store Phone" keyboardType="phone-pad" />

      <Text style={styles.label}>Alternate Phone No.</Text>
      <TextInput style={styles.input} placeholder="Alternate Phone No" keyboardType="phone-pad" />

      <Text style={styles.label}>Country</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={countryId}
          onValueChange={(value) => {
            setCountryId(value);
            setStateId('');
            setCityId('');
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select Country" value="" />
          {countryList.map(country => (
            <Picker.Item key={country.id} label={country.name} value={country.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>State</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={stateId}
          onValueChange={(value) => {
            setStateId(value);
            setCityId('');
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select State" value="" />
          {stateList.map(state => (
            <Picker.Item key={state.id} label={state.name} value={state.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cityId}
          onValueChange={setCityId}
          style={styles.picker}
        >
          <Picker.Item label="Select City" value="" />
          {cityList.map(city => (
            <Picker.Item key={city.id} label={city.name} value={city.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Aadhaar Card No.</Text>
      <TextInput style={styles.input} placeholder="Aadhaar Card Number" value={aadhaarNumber} onChangeText={setAadhaarNumber} />

      <Text style={styles.label}>Aadhaar Image (Front)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickAadhaarImage(setAadhaarFrontImage)}>
        <Text style={styles.uploadButtonText}>{aadhaarFrontImage ? 'Change Aadhaar Front Image' : 'Upload Aadhaar Front Image'}</Text>
      </TouchableOpacity>
      {aadhaarFrontImage && <Image source={{ uri: aadhaarFrontImage }} style={styles.image} />}

      <Text style={styles.label}>Aadhaar Image (Back)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickAadhaarImage(setAadhaarBackImage)}>
        <Text style={styles.uploadButtonText}>{aadhaarBackImage ? 'Change Aadhaar Back Image' : 'Upload Aadhaar Back Image'}</Text>
      </TouchableOpacity>
      {aadhaarBackImage && <Image source={{ uri: aadhaarBackImage }} style={styles.image} />}

      <Text style={styles.label}>Business Proof</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={businessProof}
          onValueChange={(value) => setBusinessProof(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Business Proof" value="" />
          {businessProofOptions.map(option => (
            <Picker.Item key={option.id} label={option.name} value={option.id} />
          ))}
        </Picker>
      </View>

      {businessProof ? (
        <TextInput
          style={styles.input}
          placeholder={`${businessProof} Number`}
          value={businessProofNumber}
          onChangeText={setBusinessProofNumber}
        />
      ) : null}

      <TextInput style={styles.input} placeholder="Referral Code" value={referralCode} onChangeText={setReferralCode} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    backgroundColor: '#F5F5F5', // Lighter background for better contrast
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    padding: hp(3),
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: hp(3),
    elevation: 5, // Increased elevation for more depth
  },
  headerText: {
    color: '#333333',
    fontSize: FontSize(26), // Larger font size for header
    fontWeight: 'bold',
  },
  label: {
    fontSize: FontSize(16),
    color: '#444444',
    marginBottom: hp(0.5),
    fontWeight: '600',
  },
  input: {
    height: hp(6),
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 10, // Rounded corners for inputs
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    backgroundColor: '#FFFFFF',
    fontSize: FontSize(15),
    elevation: 1, // Slight shadow for inputs
  },
  uploadButton: {
    height: hp(6),
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    backgroundColor: '#E6F7FF',
  },
  uploadButtonText: {
    fontSize: FontSize(15),
    color: '#007BFF',
  },
  image: {
    width: wp(90),
    height: hp(20),
    borderRadius: 8,
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(3), // Added top margin for spacing
  },
  continueButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10, // More rounded corners for buttons
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    elevation: 3,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize(18),
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: hp(2),
  },
  picker: {
    height: hp(6),
    color: '#444444',
  },
});

export default RegisterDetails;
