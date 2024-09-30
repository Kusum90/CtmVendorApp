import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';

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
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
    fontWeight:'bold'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  textarea: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlignVertical: 'top', // Ensures text starts at the top in multiline input
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  previousButton: {
    backgroundColor: '#fff',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  buttonTextAdd: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ProductAdvanceScreen;
