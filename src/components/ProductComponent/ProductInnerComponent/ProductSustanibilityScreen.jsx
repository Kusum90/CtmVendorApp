import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, FontSize } from '../../../utils/responsiveUtils';
import { useDispatch } from 'react-redux';
import { setProductDetails } from '../../../redux/Product/ProductSlice';

const ProductSustanibilityScreen = () => {
  const [sustainabilityRemark, setSustainabilityRemark] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNext = () => {
    dispatch(
      setProductDetails({
        sustainabilityRemark,
        carbonFootprint,
      })
    );
    navigation.navigate('ProductMOQScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sustainability Remark</Text>
          <TextInput
            style={styles.input}
            value={sustainabilityRemark}
            onChangeText={setSustainabilityRemark}
            multiline
          />

          <Text style={styles.label}>Carbon Footprint</Text>
          <TextInput
            style={styles.input}
            value={carbonFootprint}
            onChangeText={setCarbonFootprint}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonFilled}
            onPress={handleNext}
          >
            <Text style={styles.buttonText1}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
  },
  headerCard: {
    backgroundColor: '#f8f9fa',
    padding: wp(5),
    borderRadius: 10,
    marginBottom: hp(3),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: FontSize(22),
    fontWeight: 'bold',
    color: '#373737',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: wp(5),
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: hp(3),
  },
  label: {
    marginBottom: hp(1),
    color: '#373737',
    fontSize: FontSize(19),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(3),
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: FontSize(19),
    color: '#373737',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#28a745',
    padding: wp(3),
    borderRadius: 5,
    marginRight: wp(2),
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: wp(3),
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize(19),
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize(19),
  },
});

export default ProductSustanibilityScreen;
