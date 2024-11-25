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
  Modal,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {
  GetCountries,
  GetState,
  GetCity,
} from 'react-country-state-city';
import { wp, hp, FontSize } from '../utils/responsiveUtils';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerVendor, verifyVendorOtp } from '../redux/Auth/Register';

const RegisterDetails = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { email: reduxEmail, loading, successMessage, errorMessage, isEmailVerified } = useSelector(
    (state) => state.register
  );

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState(null);
  const [aadhaarBackImage, setAadhaarBackImage] = useState(null);
  const [vendorType, setVendorType] = useState('');
  const [businessProof, setBusinessProof] = useState('');
  const [businessProofNumber, setBusinessProofNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [storename, setStorename] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [postcodeZip, setPostcodeZip] = useState('');
  const [storephone, setStorePhone] = useState('');
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessProofOptions = [
    { id: 'Udhyam Aadhar', name: 'Udhyam Aadhar' },
    { id: 'Shop License', name: 'Shop License' },
    { id: 'GST', name: 'GST' },
    { id: 'CIN', name: 'CIN' },
  ];

  const vendorTypeOptions = [
    { id: 'Seller', name: 'Seller' },
    { id: 'Manufacturer', name: 'Manufacturer' },
    { id: 'Distributor', name: 'Distributor' },
    { id: 'Wholeseller', name: 'Wholeseller' },
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

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleFirstnameChange = (text) => {
    setFirstname(text);
  };

  const handleVerifyEmail = async () => {
    if (!email || !password || !firstname || !storename || !vendorType || !businessProof || !businessProofNumber) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
  
    // Map businessProof to the backend-compatible field
    const proofFieldMapping = {
      "GST": "gst",
      "Shop License": "shopLicense",
      "Udhyam Aadhar": "udhyamAadhaar",
      "CIN": "cin",
    };
  
    const mappedProofField = proofFieldMapping[businessProof];
  
    // Create vendorData with the mapped field
    const vendorData = {
      email,
      password,
      firstname,
      lastname,
      storename,
      vendorType,
      [mappedProofField]: businessProofNumber, // Dynamically set the correct field
    };
  
    console.log("Payload being sent:", vendorData); // Debug payload
  
    setIsSubmitting(true);
  
    dispatch(registerVendor(vendorData))
      .unwrap()
      .then((response) => {
        Alert.alert("Success", response.message);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("Error in registerVendor dispatch:", error); // Debug errors
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
  

  const handleSubmitOtp = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setIsSubmitting(true);

    dispatch(verifyVendorOtp({ email: reduxEmail || email, otp }))
      .unwrap()
      .then((response) => {
        Alert.alert('Success', response.message);
        setIsModalVisible(false);
        navigation.navigate('DrawerNavigation');
      })
      .catch((error) => {
        Alert.alert('Error', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile Registration</Text>
      </View>

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />

      <Text style={styles.label}>Password *</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      <Text style={styles.label}>First Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={handleFirstnameChange}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />

      <Text style={styles.label}>Store Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={storename}
        onChangeText={setStorename}
      />

      <Text style={styles.label}>Vendor Type *</Text>
      <Picker
        selectedValue={vendorType}
        onValueChange={(value) => setVendorType(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Vendor Type" value="" />
        {vendorTypeOptions.map(option => (
          <Picker.Item key={option.id} label={option.name} value={option.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Business Proof *</Text>
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

      {businessProof && (
        <TextInput
          style={styles.input}
          placeholder={`${businessProof} Number`}
          value={businessProofNumber}
          onChangeText={setBusinessProofNumber}
        />
      )}

      <Text style={styles.label}>Referral Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Referral Code"
        value={referralCode}
        onChangeText={setReferralCode}
      />

<View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleVerifyEmail}
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.continueButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
  visible={isModalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalBackdrop}>
    <View style={styles.modalContainer}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.modalTitle}>Enter OTP</Text>
      <TextInput
        style={styles.otpInput}
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitOtp}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
</Modal>

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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    flex: 1,
  },
  verifyButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  verifyButtonEnabled: {
    backgroundColor: '#007bff',
  },
  verifyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    backgroundColor:'green',
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent backdrop
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 10, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#ff4d4d",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  otpInput: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    width: "80%",
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterDetails;
