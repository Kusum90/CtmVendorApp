import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, updateVendor } from '../../redux/StoreSetting/Setting'

const ProfileEditScreen = ({ route, navigation }) => {
  // Extract user data passed from ProfileScreen (if any)
  const { userEmail } = route.params;

  const dispatch = useDispatch();
  const { vendorData, loading, errorMessage } = useSelector((state) => state.vendor); // Get vendor data from Redux store

  // State for editable fields
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [postcode, setPostcode] = useState('');

  // Fetch vendor profile when the screen loads
  useEffect(() => {
    if (!vendorData) {
      dispatch(fetchVendor());
    } else {
      // Initialize state from fetched data
      setUsername(vendorData?.username || '');
      setFirstname(vendorData?.firstname || '');
      setLastname(vendorData?.lastname || '');
      setPhone(vendorData?.phone || '');
      setStoreName(vendorData?.storename || '');
      setStoreUrl(vendorData?.storeUrl || '');  // Assuming store URL is part of the fetched data
      setAddress1(vendorData?.address1 || '');
      setAddress2(vendorData?.address2 || '');
      setPostcode(vendorData?.postcode_zip || '');
    }
  }, [vendorData, dispatch]);

  // Handle save changes
  const saveChanges = () => {
    const vendorDetails = {
      username,
      firstname,
      lastname,
      phone,
      storename: storeName,
      storeUrl,
      address1,
      address2,
      postcode_zip: postcode,
    };

    dispatch(updateVendor({ vendorDetails }))
      .then((res) => {
        if (res.type === 'vendor/updateVendor/fulfilled') {
          Alert.alert('Success', 'Profile updated successfully');
          navigation.goBack(); // Go back to the profile screen
        }
      })
      .catch((err) => {
        Alert.alert('Error', errorMessage || 'Failed to update vendor profile');
      });
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Editable Fields */}
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstname}
      />

      <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
      />


      <Text>Email (Non-editable)</Text>
      <TextInput
        style={styles.input}
        value={userEmail}
        editable={false}
      />

      <Text>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      {/* Store Details */}
      <Text>Store Name</Text>
      <TextInput
        style={styles.input}
        value={storeName}
        onChangeText={setStoreName}
      />

      <Text>Store URL</Text>
      <TextInput
        style={styles.input}
        value={storeUrl}
        onChangeText={setStoreUrl}
      />

      <Text>Address Line 1</Text>
      <TextInput
        style={styles.input}
        value={address1}
        onChangeText={setAddress1}
      />

      <Text>Address Line 2</Text>
      <TextInput
        style={styles.input}
        value={address2}
        onChangeText={setAddress2}
      />

      <Text>Postcode/Zip</Text>
      <TextInput
        style={styles.input}
        value={postcode}
        onChangeText={setPostcode}
      />

      {/* Save Button */}
      <Button title="Save Changes" onPress={saveChanges} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ProfileEditScreen;
