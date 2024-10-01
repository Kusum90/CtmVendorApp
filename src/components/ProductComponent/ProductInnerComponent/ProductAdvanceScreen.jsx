import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const ProductAdvanceScreen = ({ navigation }) => {
  const [enableReviews, setEnableReviews] = useState(false);
  const [purchaseNote, setPurchaseNote] = useState('');

  const handleAdd = () => {
    // Handle form submission or next action
    console.log('Add button clicked');
  };

  const handlePrevious = () => {
    // Handle previous navigation
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevious}>
        <Text style={styles.backButton}> Advance</Text>
      </TouchableOpacity>
      
      <View style={styles.checkboxContainer}>
        <Switch
          value={enableReviews}
          onValueChange={(value) => setEnableReviews(value)}
        />
        <Text style={styles.checkboxLabel}>Enable reviews</Text>
      </View>

      <TextInput
        style={styles.textarea}
        placeholder="Purchase Note"
        multiline
        value={purchaseNote}
        onChangeText={setPurchaseNote}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonTextAdd}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4), // Responsive padding
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: FontSize(23), // Responsive font size
    color: '#333',
    marginBottom: hp(2), // Responsive margin
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2), // Responsive margin
  },
  checkboxLabel: {
    marginLeft: wp(2), // Responsive margin
    fontSize: FontSize(19), // Responsive font size
    color: '#333',
  },
  textarea: {
    height: hp(10), // Responsive height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: hp(2), // Responsive margin
    paddingHorizontal: wp(2), // Responsive padding
    paddingVertical: wp(2), // Responsive padding
    textAlignVertical: 'top', // Ensures text starts at the top in multiline input
    fontSize: FontSize(19),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2), // Responsive margin
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: hp(1.5), // Responsive padding
    paddingHorizontal: wp(6), // Responsive padding
  },
  buttonText: {
    fontSize: FontSize(19), // Responsive font size
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: FontSize(19), // Responsive font size
    color: '#fff',
  },
});

export default ProductAdvanceScreen;
