import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerVendor,
  verifyVendorOtp,
  sendVendorOtp,
  resendVendorOtp
} from '../redux/Auth/Register';
import {Picker} from '@react-native-picker/picker';
import {wp, hp, FontSize} from '../utils/responsiveUtils';
import AadhaarUpload from '../components/AuthComponent/Register/AadhaarUpload';
import LocationPicker from '../components/AuthComponent/Register/LocationPicker';
import CustomToast from '../utils/CustomToast';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const RegisterDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showResendOtp, setShowResendOtp] = useState(false);

  const {
    email: reduxEmail,
    loading,
    otpSent,
  } = useSelector(state => state.register);

  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    storename: '',
    address1: '',
    address2: '',
    country: '',
    state_country: '',
    city_town: '',
    postcode_zip: '',
    storephone: '',
    altPhone: '',
    vendorType: '',
    businessProof: '',
    businessProofNumber: '',
    aadhaar: '',
    aadhaarFrontImage: '',
    aadhaarBackImage: '',
    uploadedFrontImageUrl: '',
    uploadedBackImageUrl: '',
    gst: '',
    shopLicense: '',
    referacode: '',
    udhyamAadhaar: '',
    cin: '',
    password: '',
    confirmPassword: '',
  });

  const [otp, setOtp] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const vendorTypeOptions = [
    'Seller',
    'Reseller',
    'Manufacturer',
    'Distributor',
    'Wholeseller',
  ];
  const businessProofOptions = ['Udhyam Aadhar', 'Shop License', 'GST', 'CIN'];

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const validateForm = () => {
    const {
      email,
      password,
      confirmPassword,
      firstname,
      storename,
      vendorType,
      businessProof,
      businessProofNumber,
    } = formData;

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    if (
      !email ||
      !password ||
      !firstname ||
      !storename ||
      !vendorType ||
      !businessProof ||
      !businessProofNumber
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return false;
    }

    return true;
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      Alert.alert('Error', 'Please enter your email to verify.');
      return;
    }

    try {
      await dispatch(sendVendorOtp(formData.email)).unwrap();
      Alert.alert('Success', 'OTP sent to your email.');
      setIsModalVisible(true);
      setShowResendOtp(false); // Reset resend visibility
    setTimeout(() => {
      setShowResendOtp(true); // Show the "Resend OTP" button after 1 minute
    }, 6000);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      await dispatch(verifyVendorOtp({email: formData.email, otp})).unwrap();
      Alert.alert('Success', 'Email verified successfully.');
      setIsModalVisible(false);
      setIsEmailVerified(true);
    } catch (error) {
      Alert.alert('Error', 'OTP verification failed.');
    }
  };

  const handleRegisterVendor = async () => {
    if (!validateForm()) return;

    const proofFieldMapping = {
      'Udhyam Aadhar': 'udhyamAadhaar',
      'Shop License': 'shopLicense',
      GST: 'gst',
      CIN: 'cin',
    };

    const payload = {
      ...formData,
      [proofFieldMapping[formData.businessProof]]: formData.businessProofNumber,
      uploadaddharcardImage_front: formData.aadhaarFrontImage,
      uploadaddharcardImage_back: formData.aadhaarBackImage,
    };

    setIsSubmitting(true);

    try {
      console.log('Payload sent to registerVendor API:', payload);

      const response = await dispatch(registerVendor(payload)).unwrap();

      console.log('Response from API:', response);

      // Show success toast
      setToastMessage('Registration successful!');
      setToastVisible(true);

      // Navigate to login screen after 2 seconds
      setTimeout(() => {
        setToastVisible(false);
        navigation.navigate('LoginScreen');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
    
      let errorMessage = 'Failed to register vendor.'; // Default error message
    
      // Check if the error is from Axios and contains a response
      if (error.response) {
        const { status, data } = error.response;
    
        // Handle specific status codes or backend messages
        if (status === 400) {
          errorMessage = data.message || 'Invalid data provided.';
        } else if (status === 401) {
          errorMessage = 'Unauthorized. Please log in.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = data.message || 'An unexpected error occurred.';
        }
      } else if (error.request) {
        // Handle network errors or no response from server
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        // Handle unexpected errors (non-Axios errors)
        errorMessage = error.message || 'An error occurred.';
      }
    
      // Show error toast
      setToastMessage(errorMessage);
      setToastVisible(true);
    
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Profile Registration</Text>

      <View style={{position: 'relative'}}>
        <Text style={styles.label}>Email Verification *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={formData.email}
          onChangeText={text => {
            handleChange('email', text);
            setIsEmailVerified(false);
          }}
        />
        {isEmailVerified && <Text style={styles.tickMark}>✔️</Text>}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleSendOtp}
          disabled={otpSent}>
          <Text style={styles.uploadButtonText}>
            {otpSent ? 'OTP Sent' : 'Verify Email'}
          </Text>
        </TouchableOpacity>
      </View>

      {[
        {label: 'Username', field: 'username'},
        {label: 'First Name', field: 'firstname', required: true},
        {label: 'Last Name', field: 'lastname'},
        {label: 'Phone', field: 'phone', keyboardType: 'phone-pad'},
        {label: 'Store Name', field: 'storename', required: true},
        {label: 'Address 1', field: 'address1', required: true},
        {label: 'Address 2', field: 'address2'},
        {
          label: 'Postcode/Zip',
          field: 'postcode_zip',
          keyboardType: 'numeric',
          required: true,
        },
        {
          label: 'Store Phone',
          field: 'storephone',
          keyboardType: 'phone-pad',
          required: true,
        },
        {
          label: 'Alternate Phone No.',
          field: 'altPhone',
          keyboardType: 'phone-pad',
        },
      ].map(({label, field, required, ...inputProps}) => (
        <View key={field}>
          <Text style={styles.label}>
            {' '}
            {label} {required && ' *'}{' '}
          </Text>
          <TextInput
            style={styles.input}
            value={formData[field]}
            onChangeText={text => handleChange(field, text)}
            {...inputProps}
          />
        </View>
      ))}

      {/* Location Fields */}
      <LocationPicker
        country={formData.country}
        state={formData.state_country}
        city={formData.city_town}
        onChange={handleChange}
      />

      {/* Aadhaar Fields */}
      <AadhaarUpload
        aadhaarNumber={formData.aadhaar}
        frontImage={formData.aadhaarFrontImage}
        backImage={formData.aadhaarBackImage}
        onAadhaarChange={text => handleChange('aadhaar', text)}
        onUploadFront={url => handleChange('aadhaarFrontImage', url)}
        onUploadBack={url => handleChange('aadhaarBackImage', url)}
      />

      {/* Vendor Type */}
      <Text style={styles.label}>Vendor Type *</Text>
      <Picker
        selectedValue={formData.vendorType}
        onValueChange={value => handleChange('vendorType', value)}
        style={styles.picker}>
        <Picker.Item label="Select Vendor Type" value="" />
        {vendorTypeOptions.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      {/* Business Proof */}
      <Text style={styles.label}>Business Proof *</Text>
      <Picker
        selectedValue={formData.businessProof}
        onValueChange={value => handleChange('businessProof', value)}
        style={styles.picker}>
        <Picker.Item label="Select Business Proof" value="" />
        {businessProofOptions.map(proof => (
          <Picker.Item key={proof} label={proof} value={proof} />
        ))}
      </Picker>

      {formData.businessProof && (
        <TextInput
          style={styles.input}
          placeholder={`${formData.businessProof} Number`}
          value={formData.businessProofNumber}
          onChangeText={text => handleChange('businessProofNumber', text)}
        />
      )}

      <View style={{position: 'relative'}}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry={!showPassword} // Toggle visibility based on state
        />
        {/* Eye Emoji for toggling password visibility */}
        <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 25}}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={{fontSize: 18}}>{showPassword ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <View style={{position: 'relative', marginTop: 15}}>
        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          secureTextEntry={!showConfirmPassword} // Toggle visibility based on state
        />
        {/* Eye Emoji for toggling confirm password visibility */}
        <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 25}}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text style={{fontSize: 18}}>
            {showConfirmPassword ? '👁️' : '🙈'}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegisterVendor}
        disabled={isSubmitting || loading}>
        {isSubmitting || loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* OTP Modal */}
      {otpSent && (
  <Modal visible={isModalVisible} transparent animationType="slide">
  <View style={styles.overlay}>
    <View style={styles.modalContainer}>
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
        style={styles.button}
        onPress={handleVerifyOtp}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      {showResendOtp && (
        <TouchableOpacity
          style={styles.resendButton}
          onPress={async () => {
            try {
              await dispatch(resendVendorOtp(formData.email)).unwrap();
              Alert.alert('Success', 'New OTP sent to your email.');
              setShowResendOtp(false); // Restart timer
              setTimeout(() => {
                setShowResendOtp(true);
              }, 60000);
            } catch (error) {
              Alert.alert('Error', 'Failed to resend OTP.');
            }
          }}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
</Modal>
)}

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
  eyeEmoji: {
    position: 'absolute',
    right: 10, // Adjust based on your layout
    top: '50%',
    transform: [{translateY: -12}], // Center vertically
    padding: 5,
  },
  emojiText: {
    fontSize: 18, // Adjust size of the emoji
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
  tickMark: {
    position: 'absolute',
    right: 10,
    top: '30%',
    transform: [{translateY: -10}], // Adjust to vertically center
    color: 'green',
    fontSize: 18,
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background for the modal
  },
  modalContainer: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  otpInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  resendButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
});

export default RegisterDetails;
