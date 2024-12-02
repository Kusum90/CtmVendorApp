// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateVendor } from '../../redux/StoreSetting/Setting';
// import { wp, hp, FontSize } from '../../utils/responsiveUtils';

// const PayScreen = () => {
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // Selector to access the Redux state for success and error messages
//   const { successMessage, errorMessage } = useSelector((state) => state.vendor);

//   const paymentMethods = [
//     { label: 'Choose Withdrawal Method', value: '' },
//     { label: 'Credit Card', value: 'credit_card' },
//     { label: 'Debit Card', value: 'debit_card' },
//     { label: 'PayPal', value: 'paypal' },
//     { label: 'Bank Transfer', value: 'bank_transfer' },
//     { label: 'Cash', value: 'cash' },
//   ];

//   const handlePrevious = () => {
//     navigation.goBack(); // Navigate to the previous screen
//   };

//   const handleNext = () => {
//     if (selectedMethod) {
//       // Dispatch the updateVendor action to update the payment method
//       const vendorDetails = {
//         paymentMethod: selectedMethod,
//       };
//       dispatch(updateVendor({ vendorDetails }))
//         .then((response) => {
//           if (response.meta.requestStatus === 'fulfilled') {
//             // If update is successful, navigate and show success message
//             Alert.alert('Success', 'Payment method updated successfully!');
//             navigation.navigate('PoliciesScreen'); // Navigate to PoliciesScreen
//           }
//         })
//         .catch((error) => {
//           console.error('Error updating payment method:', error);
//           Alert.alert('Error', errorMessage || 'Failed to update payment method');
//         });
//     } else {
//       Alert.alert('Error', 'Please select a payment method');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.heading}>Payment</Text>
//         <Text style={styles.label}>Preferred Payment Method</Text>

//         <Picker
//           selectedValue={selectedMethod}
//           style={styles.picker}
//           onValueChange={(itemValue) => setSelectedMethod(itemValue)}
//         >
//           {paymentMethods.map((method) => (
//             <Picker.Item key={method.value} label={method.label} value={method.value} />
//           ))}
//         </Picker>

//         {/* Display success or error message */}
//         {successMessage && (
//           <Text style={styles.successMessage}>{successMessage}</Text>
//         )}
//         {errorMessage && (
//           <Text style={styles.errorMessage}>{errorMessage}</Text>
//         )}
//       </View>

//       {/* Navigation Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
//           <Text style={styles.buttonText}>Previous</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={handleNext}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp(5),
//     backgroundColor: '#fff',
//   },
//   card: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: wp(2),
//     padding: wp(4),
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: hp(0.2) },
//     shadowOpacity: 0.1,
//     shadowRadius: wp(0.5),
//     marginBottom: hp(2.5),
//   },
//   heading: {
//     fontSize: FontSize(24),
//     fontWeight: 'bold',
//     marginBottom: hp(2.5),
//     color: '#373737',
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: FontSize(17),
//     marginBottom: hp(1),
//     color: '#373737',
//     fontWeight: 'bold',
//   },
//   picker: {
//     height: hp(6),
//     marginBottom: hp(2),
//     borderWidth: wp(0.3),
//     borderColor: '#ddd',
//     borderRadius: wp(2),
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp(2.5),
//   },
//   navButton: {
//     backgroundColor: '#4CAF50',
//     padding: hp(1.5),
//     borderRadius: wp(2),
//     flex: 1,
//     marginHorizontal: wp(1.5),
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: FontSize(16),
//   },
//   successMessage: {
//     color: 'green',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: hp(1),
//   },
//   errorMessage: {
//     color: 'red',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: hp(1),
//   },
// });

// export default PayScreen;




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, updateVendor, clearVendorMessages } from '../../redux/StoreSetting/Setting'
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

const PayScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, vendorData, successMessage, errorMessage } = useSelector((state) => state.vendor);

  const paymentMethods = [
    { label: 'Choose Withdrawal Method', value: '' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Debit Card', value: 'Debit Card' },
    { label: 'PayPal', value: 'PayPal' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Cash', value: 'Cash' },
  ];

  // Fetch vendor data when the component mounts
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  // Set initial selected method from fetched data
  useEffect(() => {
    if (vendorData?.preferredPaymentMethod) {
      setSelectedMethod(vendorData.preferredPaymentMethod);
    }
  }, [vendorData]);

  // Clear messages when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearVendorMessages());
    };
  }, [dispatch]);

  const handlePrevious = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedMethod) {
      const vendorDetails = { preferredPaymentMethod: selectedMethod };
      dispatch(updateVendor({ vendorDetails }))
        .unwrap()
        .then(() => {
          Alert.alert('Success', 'Payment method updated successfully!');
          navigation.navigate('PoliciesScreen');
        })
        .catch((error) => {
          Alert.alert('Error', error || 'Failed to update payment method');
        });
    } else {
      Alert.alert('Error', 'Please select a payment method');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Payment</Text>
        <Text style={styles.label}>Preferred Payment Method</Text>

        <Picker
          selectedValue={selectedMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMethod(itemValue)}
        >
          {paymentMethods.map((method) => (
            <Picker.Item key={method.value} label={method.label} value={method.value} />
          ))}
        </Picker>

        {/* Display success or error message */}
        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2),
    padding: wp(4),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.2) },
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5),
    marginBottom: hp(2.5),
  },
  heading: {
    fontSize: FontSize(24),
    fontWeight: 'bold',
    marginBottom: hp(2.5),
    color: '#373737',
    textAlign: 'center',
  },
  label: {
    fontSize: FontSize(17),
    marginBottom: hp(1),
    color: '#373737',
    fontWeight: 'bold',
  },
  picker: {
    height: hp(6),
    marginBottom: hp(2),
    borderWidth: wp(0.3),
    borderColor: '#ddd',
    borderRadius: wp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: hp(1.5),
    borderRadius: wp(2),
    flex: 1,
    marginHorizontal: wp(1.5),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FontSize(16),
  },
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(1),
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(1),
  },
});

export default PayScreen;
