import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, updateVendor, clearVendorMessages } from '../../redux/StoreSetting/Setting'
import { wp, hp, FontSize } from '../../utils/responsiveUtils';

const PoliciesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Redux state
  const { vendorData, loading, successMessage, errorMessage } = useSelector((state) => state.vendor);

  // Local state for policies
  const[policyTabLabel,setpolicyTabLabel]=useState('');
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [cancelPolicy, setCancelPolicy] = useState('');

  // Fetch vendor data on mount
  useEffect(() => {
    dispatch(fetchVendor());
  }, [dispatch]);

  // Populate fields when vendor data is fetched
  useEffect(() => {
    if (vendorData) {
      setpolicyTabLabel(vendorData.policyTabLabel|| '');
      setShippingPolicy(vendorData.shippingPolicy || '');
      setRefundPolicy(vendorData.refundPolicy || '');
      setCancelPolicy(vendorData.cancelPolicy || '');
    }
  }, [vendorData]);


  // Handle update vendor
  const handleUpdate = () => {
    const vendorDetails = {
      policyTabLabel,
      shippingPolicy,
      refundPolicy,
      cancelPolicy,
    };
    dispatch(updateVendor({ vendorDetails }));
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('CustomerSupportScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Store Policies</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>Policies Setting</Text>

        <Text style={styles.label}>Policy Tab Label</Text>
        <TextInput
          style={styles.input}
          value={policyTabLabel}
          onChangeText={setpolicyTabLabel}
          placeholder=" "
          multiline
          numberOfLines={2}
        />

        <Text style={styles.label}>Shipping Policy</Text>
        <TextInput
          style={styles.input}
          value={shippingPolicy}
          onChangeText={setShippingPolicy}
          placeholder="Enter Shipping Policy"
          multiline
          numberOfLines={4}
        />
        <Text style={styles.label}>Refund Policy</Text>
        <TextInput
          style={styles.input}
          value={refundPolicy}
          onChangeText={setRefundPolicy}
          placeholder="Enter Refund Policy"
          multiline
          numberOfLines={4}
        />
        <Text style={styles.label}>Cancel Policy</Text>
        <TextInput
          style={styles.input}
          value={cancelPolicy}
          onChangeText={setCancelPolicy}
          placeholder="Enter Cancel Policy"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#2196F3' }]}
          onPress={handleUpdate}
          disabled={loading} // Disable button while loading
        >
          <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Save'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2),
    padding: wp(2),
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
    textAlign: 'left',
  },
  subheading: {
    fontSize: FontSize(18),
    fontWeight: 'bold',
    marginBottom: hp(2.5),
    color: '#373737',
    textAlign: 'left',
  },
  label: {
    fontSize: FontSize(14),
    marginBottom: hp(1),
    color: '#373737',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: wp(0.3),
    borderColor: '#ddd',
    borderRadius: wp(2),
    padding: wp(2.5),
    marginBottom: hp(2),
    minHeight: hp(7.5),
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
});

export default PoliciesScreen;
