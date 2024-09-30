import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const AttributeDropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <Text style={styles.dropdownLabel}>
          {selectedOption ? selectedOption : label}
        </Text>
        <Text style={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableOpacity key={option} onPress={() => selectOption(option)}>
              <Text
                style={[
                  styles.dropdownOption,
                  selectedOption === option && styles.selectedOption,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ProductAttributeScreen = () => {
  const attributeOptions = [
    ['Brand', ['Nike', 'Adidas', 'Puma']],
    ['Color', ['Red', 'Blue', 'Green']],
    ['Shape', ['Circle', 'Square', 'Triangle']],
    ['Size', ['Small', 'Medium', 'Large']],
    ['Watts', ['10W', '20W', '30W']],
    ['Weight', ['1kg', '2kg', '3kg']],
    ['Power', ['Low', 'Medium', 'High']],
    ['Material', ['Plastic', 'Metal', 'Wood']],
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation(); // Initialize navigation hook

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Attributes</Text>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        {attributeOptions.map(([label, options]) => (
          <AttributeDropdown key={label} label={label} options={options} />
        ))}

        {/* Button at the Right Side */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.buttonText}>Add Attributes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigation}>
          {/* Previous Button */}
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={() => navigation.goBack()} // Go back to the previous screen
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={() => navigation.navigate('ProductLinkedScreen')} // Navigate to ProductLinkedScreen
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Adding Attributes */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Attribute</Text>
            {/* You can add form elements here to add a new attribute */}
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Light background for contrast
  },
  headerCard: {
    backgroundColor: '#f0f0f0', // Light gray background for header
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  contentCard: {
    borderRadius: 8,
    backgroundColor: 'white', // White background for content
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 1.5, // For iOS shadow
    paddingBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f9f9f9', // Light gray for dropdown
  },
  dropdownLabel: {
    fontSize: 16,
  },
  dropdownIcon: {
    fontSize: 16,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: -1, // Adjust for overlapping border
    backgroundColor: 'white', // White background for options
  },
  dropdownOption: {
    padding: 12,
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#d1e7dd', // Highlight color for selected option
  },
  buttonContainer: {
    paddingVertical: 16,
    alignItems: 'flex-end', // Align the button to the right
  },
  button: {
    backgroundColor: '#4CAF50', // Green for the button
    padding: 12,
    borderRadius: 4,
    width: '40%', // Adjust button width
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  navButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  previousButton: {
    backgroundColor: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProductAttributeScreen;
