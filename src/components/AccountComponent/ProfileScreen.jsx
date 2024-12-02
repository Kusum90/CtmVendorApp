// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Image,
// } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import {
//   GetCountries,
//   GetState,
//   GetCity,
//   GetLanguages,
// } from 'react-country-state-city';
// import CustomPicker from './CoustomPicker';
// import CustomDropdown from './CoustomDropdown';
// import {wp, hp, FontSize} from '../../utils/responsiveUtils';
// import {useNavigation} from '@react-navigation/native';

// const ProfileScreen = () => {
//   const navigation = useNavigation();

//   const [aadhaarNumber, setAadhaarNumber] = useState('');
//   const [aadhaarFrontImage, setAadhaarFrontImage] = useState(null);
//   const [aadhaarBackImage, setAadhaarBackImage] = useState(null);
//   const [businessProof, setBusinessProof] = useState('');
//   const [businessProofNumber, setBusinessProofNumber] = useState('');
//   const [udyamAadhaar, setUdyamAadhaar] = useState('');
//   const [referralCode, setReferralCode] = useState('');
//   const [checked, setChecked] = useState(false);

//   const [countryId, setCountryId] = useState('');
//   const [stateId, setStateId] = useState('');
//   const [cityId, setCityId] = useState('');
//   const [countryList, setCountryList] = useState([]);
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);

//   const businessProofOptions = [
//     {id: 'Udhyam Aadhar', name: 'Udhyam Aadhar'},
//     {id: 'Shop License', name: 'Shop License'},
//     {id: 'GST', name: 'GST'},
//     {id: 'CIN', name: 'CIN'},
//   ];

//   useEffect(() => {
//     GetCountries().then(result => setCountryList(result));
//   }, []);

//   useEffect(() => {
//     if (countryId) {
//       GetState(countryId).then(result => setStateList(result));
//     }
//   }, [countryId]);

//   useEffect(() => {
//     if (stateId) {
//       GetCity(countryId, stateId).then(result => setCityList(result));
//     }
//   }, [stateId]);

//   const getNameById = (id, list) => {
//     const item = list.find(item => item.id === id);
//     return item ? item.name : '';
//   };
//   const handleEditPress = () => {
//     navigation.navigate('EditScreen'); // Replace 'EditScreen' with the name of your target screen
//   };

//   // Function to pick Aadhaar image
//   const pickAadhaarImage = async setImage => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.images],
//       });
//       setImage(res[0].uri); // Save the selected image URI to the respective state
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker
//         Alert.alert('Cancelled', 'No image was selected');
//       } else {
//         Alert.alert('Error', 'Failed to pick image');
//       }
//     }
//   };
//   const renderBusinessProofInput = () => {
//     switch (businessProof) {
//       case 'Udhyam Aadhar':
//         return (
//           <TextInput
//             style={styles.input}
//             placeholder="Udhyam Aadhar Number"
//             value={udyamAadhaar}
//             onChangeText={setUdyamAadhaar}
//           />
//         );
//       case 'Shop License':
//         return (
//           <TextInput
//             style={styles.input}
//             placeholder="Shop License Number"
//             value={businessProofNumber}
//             onChangeText={setBusinessProofNumber}
//           />
//         );
//       case 'GST':
//         return (
//           <TextInput
//             style={styles.input}
//             placeholder="GST Number"
//             value={businessProofNumber}
//             onChangeText={setBusinessProofNumber}
//           />
//         );
//       case 'CIN':
//         return (
//           <TextInput
//             style={styles.input}
//             placeholder="CIN Number"
//             value={businessProofNumber}
//             onChangeText={setBusinessProofNumber}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>Profile</Text>
//       </View>

//       {/* User Information Fields */}
//       <Text style={styles.label}>Username *</Text>
//       <TextInput style={styles.input} placeholder="User Name" />

//       <Text style={styles.label}>Email *</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//       />

//       <Text style={styles.label}>First Name *</Text>
//       <TextInput style={styles.input} placeholder="First Name" />

//       <Text style={styles.label}>Last Name</Text>
//       <TextInput style={styles.input} placeholder="Last Name" />

//       <Text style={styles.label}>Store Name *</Text>
//       <TextInput style={styles.input} placeholder="Store Name" />

//       <Text style={styles.label}>Store URL</Text>
//       <TextInput
//         style={[styles.input, styles.disabledInput]}
//         placeholder="https:/"
//         editable={true}
//       />

//       <Text style={styles.label}>Address 1 *</Text>
//       <TextInput style={styles.input} placeholder="Address 1" />

//       <Text style={styles.label}>Address 2</Text>
//       <TextInput style={styles.input} placeholder="Address 2" />

//       <Text style={styles.label}>Postcode/Zip *</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Postcode/Zip"
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Store Phone *</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Store Phone"
//         keyboardType="phone-pad"
//       />

//       <Text style={styles.label}>Alternate phone no</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Alternate phone no"
//         keyboardType="phone-pad"
//       />

//       {/* Country, State, and City Selection */}
//       <Text style={styles.label}>Country</Text>
//       <CustomPicker
//         options={countryList}
//         selectedValue={getNameById(countryId, countryList)}
//         onValueChange={value => {
//           setCountryId(value);
//           setStateId(''); // Reset state and city on country change
//           setCityId('');
//         }}
//       />

//       <Text style={styles.label}>State</Text>
//       <CustomPicker
//         options={stateList}
//         selectedValue={getNameById(stateId, stateList)}
//         onValueChange={value => {
//           setStateId(value);
//           setCityId(''); // Reset city on state change
//         }}
//       />

//       <Text style={styles.label}>City</Text>
//       <CustomPicker
//         options={cityList}
//         selectedValue={getNameById(cityId, cityList)}
//         onValueChange={value => setCityId(value)}
//       />

//       {/* Aadhaar and Business Details */}
//       <Text style={styles.label}>Aadhaar Card no</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Aadhaar Card Number"
//         value={aadhaarNumber}
//         onChangeText={setAadhaarNumber}
//       />

//       <Text style={styles.label}>Aadhaar Image (Front)</Text>
//       <TouchableOpacity
//         style={styles.uploadButton}
//         onPress={() => pickAadhaarImage(setAadhaarFrontImage)}>
//         <Text style={styles.uploadButtonText}>
//           {aadhaarFrontImage
//             ? 'Change Aadhaar Card Front Image'
//             : 'Upload Aadhaar Card Front Image'}
//         </Text>
//       </TouchableOpacity>
//       {aadhaarFrontImage && (
//         <Image source={{uri: aadhaarFrontImage}} style={styles.image} />
//       )}

//       <Text style={styles.label}>Aadhaar Image (Back)</Text>
//       <TouchableOpacity
//         style={styles.uploadButton}
//         onPress={() => pickAadhaarImage(setAadhaarBackImage)}>
//         <Text style={styles.uploadButtonText}>
//           {aadhaarBackImage
//             ? 'Change Aadhaar Card Back Image'
//             : 'Upload Aadhaar Card Back Image'}
//         </Text>
//       </TouchableOpacity>
//       {aadhaarBackImage && (
//         <Image source={{uri: aadhaarBackImage}} style={styles.image} />
//       )}

//       {/* Business Proof Section */}
//       <Text style={styles.label}>Business Proof</Text>
//       <CustomDropdown
//         options={businessProofOptions}
//         selectedValue={businessProof}
//         onValueChange={value => setBusinessProof(value)}
//       />
//       {renderBusinessProofInput()}

//       <TextInput
//         style={styles.input}
//         placeholder="Referral Code"
//         value={referralCode}
//         onChangeText={setReferralCode}
//       />

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.continueButton}
//           onPress={handleEditPress} // Add this line
//         >
//           <Text style={styles.continueButtonText}>Edit</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: wp(3), // 20 in your original, using wp for scaling
//     paddingVertical: hp(4), // 30 in your original, using hp for scaling
//     backgroundColor: '#F9FAFB',
//   },
//   headerContainer: {
//     backgroundColor: '#FFFFFF',
//     padding: hp(2),
//     alignItems: 'left',
//     marginBottom: hp(3),
//   },
//   headerText: {
//     color: '#373737',
//     fontSize: FontSize(22),
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: FontSize(17),
//     color: '#333333',
//     marginBottom: hp(0.5), // 5 in original
//   },
//   input: {
//     height: hp(5), // 40 in original
//     borderColor: '#CED4DA',
//     borderWidth: 1,
//     borderRadius: wp(1.5), // 5 in original
//     paddingHorizontal: wp(2.5), // 10 in original
//     marginBottom: hp(2), // 15 in original
//     backgroundColor: '#FFFFFF',
//     fontSize: FontSize(17),
//   },
//   disabledInput: {
//     color: '#6C757D',
//     backgroundColor: '#fff',
//   },
//   picker: {
//     height: hp(5), // 40 in original
//     borderWidth: 1,
//     borderColor: '#CED4DA',
//     borderRadius: wp(1.5), // 5 in original
//     paddingHorizontal: wp(2.5), // 10 in original
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   selectedCountry: {
//     fontSize: FontSize(17),
//     color: '#333333',
//     marginBottom: hp(2), // 15 in original
//   },
//   uploadButton: {
//     height: hp(5), // 40 in original
//     borderColor: '#CED4DA',
//     borderWidth: 1,
//     borderRadius: wp(1.5), // 5 in original
//     justifyContent: 'center',
//     paddingHorizontal: wp(2.5), // 10 in original
//     marginBottom: hp(2), // 15 in original
//     backgroundColor: '#FFFFFF',
//   },
//   uploadButtonText: {
//     color: '#6B6B6B',
//     fontSize: FontSize(17),
//   },
//   dropdown: {
//     height: hp(5), // 40 in original
//     borderColor: '#CED4DA',
//     borderWidth: 1,
//     borderRadius: wp(1.5), // 5 in original
//     justifyContent: 'center',
//     paddingHorizontal: wp(2.5), // 10 in original
//     marginBottom: hp(2), // 15 in original
//     backgroundColor: '#FFFFFF',
//     fontSize: FontSize(17),
//   },
//   dropdownText: {
//     color: '#6B6B6B',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp(2.5), // 20 in original
//   },
//   checkbox: {
//     width: wp(5), // 20 in original
//     height: hp(2.5), // 20 in original
//     borderWidth: 1,
//     borderColor: '#CED4DA',
//     borderRadius: wp(1), // 3 in original
//   },
//   checkedCheckbox: {
//     backgroundColor: '#28A745',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   continueButton: {
//     backgroundColor: '#28A745',
//     padding: hp(2), // 10 in original
//     borderRadius: wp(1.5), // 5 in original
//     flex: 1,
//     alignItems: 'center',
//   },
//   continueButtonText: {
//     color: '#FFFFFF',
//     fontSize: FontSize(17),
//   },
//   image: {
//     width: wp(25), // 100 in original
//     height: hp(12), // 100 in original
//     marginBottom: hp(2), // 15 in original
//     borderRadius: wp(1.5), // 5 in original
//     borderColor: '#CED4DA',
//     borderWidth: 1,
//   },
//   label: {
//     fontSize: FontSize(16),
//     fontWeight: 'bold',
//     marginBottom: hp(1), // 8 in original
//   },
//   checkboxLabel: {
//     fontSize: FontSize(17),
//   },
// });

// export default ProfileScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'; // Import hooks from Redux
import {fetchVendor} from '../../redux/StoreSetting/Setting';
import {changePassword} from '../../redux/Auth/Password';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {loading, vendorData, errorMessage} = useSelector(
    state => state.vendor,
  );
  const {successMessage} = useSelector(state => state.password);

  // Function to get initials from the name
  const getInitials = name => {
    if (!name) return ''; // Return an empty string if name is undefined or empty
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // State for Modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Dispatch fetchVendor action when component loads
    dispatch(fetchVendor());
  }, [dispatch]);

  // Navigate to Edit Profile Screen
  const navigateToEditProfile = () => {
    navigation.navigate('ProfileEditScreen', {
      userName: vendorData?.username,
      userEmail: vendorData?.email,
      userPhone: vendorData?.phone,
      userstore: vendorData?.storename,
      userstoreurl: vendorData?.storeslug,
      address1: vendorData?.address1,
      address2: vendorData?.address2,
      postcode: vendorData?.postcode_zip,
    });
  };

  // Function to handle logout
  const logout = () => {
    navigation.navigate('LoginScreen'); // Adjust the screen name accordingly
  };

  // Function to handle password change
const handleChangePassword = () => {
  console.log('Starting password change process...');

  dispatch(changePassword({ oldPassword, newPassword }))
    .unwrap()
    .then((res) => {
      console.log('Password changed successfully:', res);
      Alert.alert('Success', 'Password changed successfully');
      setIsPasswordModalVisible(false); // Close modal on success
      resetPasswordFields();
    })
    .catch((error) => {
      console.error('Password change failed:', error);
      Alert.alert('Error', error || 'Failed to change password. Please try again.');
    });
};


  // If loading, show loading text
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // If there's an error fetching vendor data, display error message
  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>My Account</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>
            {getInitials(vendorData?.username)}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.userName}>{vendorData?.username}</Text>
          <Text style={styles.userEmail}>{vendorData?.email}</Text>
          <Text style={styles.userPhone}>{vendorData?.phone}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={navigateToEditProfile}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Store Details Card */}
      <View style={styles.addressCard}>
        <Text style={styles.cardTitle}>Store Details</Text>
        <Text style={styles.addressText}>
          Store Name: {vendorData?.storename}
        </Text>
        <Text style={styles.addressText}>
          Store URL: {vendorData?.storeslug}
        </Text>

        <Text style={styles.cardTitle}>Address Information</Text>
        <Text style={styles.addressText}>
          Address 1: {vendorData?.address1}
        </Text>
        <Text style={styles.addressText}>
          Address 2: {vendorData?.address2}
        </Text>
        <Text style={styles.addressText}>
          Postcode/Zip: {vendorData?.postcode_zip}
        </Text>
      </View>

      {/* Change Password Card */}
      <TouchableOpacity
        style={styles.passwordCard}
        onPress={() => setIsPasswordModalVisible(true)}>
        <Text style={styles.cardTitle}>Change Password</Text>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Terms and Conditions */}
      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() => navigation.navigate('TermsAndConditionsScreen')}>
        <Text style={styles.termsText}>Terms & Conditions</Text>
      </TouchableOpacity>

      {/* Change Password Modal */}
      <Modal
        visible={isPasswordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPasswordModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Change Password</Text>

            {/* Password Fields */}
            <Text>Old Password</Text>
            <TextInput
              style={styles.inputField}
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
            <Text>New Password</Text>
            <TextInput
              style={styles.inputField}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            {/* <Text>Confirm Password</Text>
            <TextInput
              style={styles.inputField}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            /> */}

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleChangePassword} />
              <Button
                title="Cancel"
                color="red"
                onPress={() => setIsPasswordModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D6EFD8',
    padding: 16,
    marginBottom: 16,
  },
  initialsContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initialsText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  userPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#54B435',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressCard: {
    backgroundColor: '#D6EFD8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  // Update the passwordCard style to adjust the positioning of the arrow
  passwordCard: {
    backgroundColor: '#D6EFD8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row', // Added to arrange items in a row
    justifyContent: 'space-between', // Added to push content to edges
    alignItems: 'center',
  },

  arrowText: {
    fontSize: 20,
    color: '#007BFF',
    marginLeft: 10,
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Rounded corners
    height: 50, // Fixed height
    width: '100%', // Full width
    marginTop: 20, // Spacing from elements above
    borderWidth: 1,
    borderColor: '#D1D5DB', // Slightly darker gray border
  },
  logoutButtonText: {
    color: '#000', // Black text
    fontSize: 16, // Slightly larger font
    fontWeight: '500', // Medium weight for text
  },
  termsContainer: {
    alignItems: 'center',
    padding: 10,
  },
  termsText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
  },
  modalButtons: {
    marginTop: 20,
  },
});

export default ProfileScreen;
